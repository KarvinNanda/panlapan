import { test, expect, waitIntro } from './helpers.mjs'

const SLUG = 'prana-holistic-care'

// Lazy images grow the page while we scroll, so "at the bottom" only counts
// once the page height has stopped changing for a few steps.
async function scrollToBottom(page) {
  let stable = 0, lastHeight = 0
  for (let i = 0; i < 300 && stable < 4; i++) {
    const { atBottom, height } = await page.evaluate(() => {
      window.scrollBy(0, 300)
      const height = document.documentElement.scrollHeight
      return { atBottom: window.scrollY + innerHeight >= height - 2, height }
    })
    await page.waitForTimeout(150)
    stable = atBottom && height === lastHeight ? stable + 1 : 0
    lastHeight = height
  }
}

const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)']

test('gallery images settle uncropped', async ({ page }) => {
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  await scrollToBottom(page)
  await page.waitForTimeout(2000)

  const wraps = await page.$$eval('.work-detail__img-wrap', els => els.map(w => {
    const ws = getComputedStyle(w), is = getComputedStyle(w.querySelector('img'))
    return { opacity: ws.opacity, clip: ws.clipPath, wrapTransform: ws.transform, imgTransform: is.transform }
  }))
  expect(wraps.length).toBeGreaterThan(0)
  for (const w of wraps) {
    expect(w.opacity).toBe('1')
    expect(w.clip).toMatch(/^(none|inset\(0(%|px)?\))$/)
    expect(IDENTITY).toContain(w.wrapTransform)
    expect(IDENTITY).toContain(w.imgTransform)
  }
})

test('gallery triggers after lazy load', async ({ page }) => {
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  await scrollToBottom(page)
  await page.waitForFunction(() => [...document.querySelectorAll('.work-detail__image')].every(i => i.complete && i.naturalHeight > 0))
  await page.waitForTimeout(500)

  // Each wrap's trigger start must sit at the same offset from where the wrap really is
  // now that images have height. Stale triggers (computed while heights were 0) drift
  // further off for every later image, so the offsets stop being equal.
  const rows = await page.evaluate(() => window.__ST.getAll()
    .filter(st => st.trigger?.classList?.contains('work-detail__img-wrap') && typeof st.vars.start === 'string')
    .map(st => {
      const word = st.vars.start.split(' ')[1]
      const pct = ({ top: 0, center: 0.5, bottom: 1 })[word] ?? parseFloat(word) / 100
      const absTop = st.trigger.getBoundingClientRect().top + window.scrollY
      return { start: st.start, expected: absTop - innerHeight * pct }
    }))
  expect(rows.length).toBeGreaterThan(1)
  const offsets = rows.map(r => r.start - r.expected)
  for (const o of offsets) expect(Math.abs(o - offsets[0])).toBeLessThanOrEqual(2)
})

test('image peeking at the bottom edge is revealed', async ({ page }) => {
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  // Layout position (offsetTop) — the wrap is still translated by its reveal "from" state.
  const scrollFor = () => page.evaluate(() => {
    const w = document.querySelectorAll('.work-detail__img-wrap')[2]
    let top = 0
    for (let n = w; n; n = n.offsetParent) top += n.offsetTop
    window.scrollTo(0, top - innerHeight * 0.94)
  })
  await scrollFor()
  await page.waitForFunction(() => document.querySelectorAll('.work-detail__image')[2].complete)
  await page.waitForTimeout(400)
  await scrollFor() // page grew as earlier images loaded
  await page.waitForTimeout(1500)
  const opacity = await page.evaluate(() => Number(getComputedStyle(document.querySelectorAll('.work-detail__img-wrap')[2]).opacity))
  expect(opacity).toBeGreaterThan(0.9)
})
