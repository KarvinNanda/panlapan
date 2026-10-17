import { test, expect, waitIntro } from './helpers.mjs'

// Last card that actually has a slideshow (more than one slide)
const activeIndex = page => page.evaluate(() => {
  const cards = [...document.querySelectorAll('.works__card')].filter(c => c.querySelectorAll('.works__card-slide').length > 1)
  const card = cards[cards.length - 1]
  return [...card.querySelectorAll('.works__card-slide')].findIndex(s => s.classList.contains('is-active'))
})

test('offscreen slideshow is paused', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  // Stay at the top: the last card is far below the fold.
  await page.waitForTimeout(5500)
  expect(await activeIndex(page)).toBe(0)

  await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.works__card')].filter(c => c.querySelectorAll('.works__card-slide').length > 1)
    cards[cards.length - 1].scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(5000)
  expect(await activeIndex(page)).toBeGreaterThan(0)
})

// Review finding #3: whatever GSAP moves during the card reveal must not also have a CSS
// transform transition, or the transition smooths every GSAP frame ("rubbery" rise).
test('card reveal does not fight a css transform transition', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  const card = page.locator('.works__card').nth(4)
  await card.evaluate(el => el.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(150) // mid-reveal
  const moving = await card.evaluate(root => [root, ...root.querySelectorAll('*')]
    .filter(el => el.style.transform)
    .map(el => {
      // transition-property defaults to "all" with 0s duration — only count ones that actually run
      const cs = getComputedStyle(el)
      const props = cs.transitionProperty.split(',').map(p => p.trim())
      const durs = cs.transitionDuration.split(',').map(d => parseFloat(d))
      const active = props.filter((p, i) => (durs[i % durs.length] > 0) && (p === 'all' || p === 'transform'))
      return { cls: String(el.className).split(' ')[0], active: active.join(',') }
    }))
  expect(moving.length, 'something is being revealed').toBeGreaterThan(0)
  for (const m of moving) expect(m.active, m.cls).toBe('')
})
