import { test, expect, waitIntro, NAV_OFFSET } from './helpers.mjs'

const SLUG = 'prana-holistic-care'

async function gotoCard(page, index) {
  await page.goto('/')
  await waitIntro(page)
  await page.locator('.works__card').nth(index).scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  // A full reload wipes window globals — this marker proves Back stayed in the SPA.
  await page.evaluate(() => { window.__noReload = true })
  return page.evaluate(() => window.scrollY)
}

async function curtainSeenWithin(page, ms) {
  let seen = false
  for (let t = 0; t < ms; t += 100) {
    if (await page.locator('.intro-curtain').count()) seen = true
    await page.waitForTimeout(100)
  }
  return seen
}

test('back restores card position', async ({ page }) => {
  const y0 = await gotoCard(page, 2)
  await page.locator('.works__card').nth(2).click()
  await page.waitForSelector('.work-detail__title')
  await page.waitForTimeout(800)
  await page.locator('.work-detail__back').click()

  expect(await curtainSeenWithin(page, 1500)).toBe(false)
  expect(await page.evaluate(() => window.__noReload === true)).toBe(true)
  expect(new URL(page.url()).pathname).toBe('/')
  expect(Math.abs(await page.evaluate(() => window.scrollY) - y0)).toBeLessThanOrEqual(4)
})

test('no scroll jump during leave', async ({ page }) => {
  const y0 = await gotoCard(page, 2)
  await page.evaluate(() => {
    window.__ys = []
    const t = () => {
      window.__ys.push([window.scrollY, !!document.querySelector('.works')])
      if (window.__ys.length < 120) requestAnimationFrame(t)
    }
    t()
  })
  await page.locator('.works__card').nth(2).click()
  await page.waitForSelector('.work-detail')
  await page.waitForTimeout(600)
  const whileHomeVisible = (await page.evaluate(() => window.__ys)).filter(([, home]) => home).map(([y]) => y)
  expect(whileHomeVisible.length).toBeGreaterThan(0)
  for (const y of whileHomeVisible) expect(Math.abs(y - y0)).toBeLessThanOrEqual(1)
})

test('deep link back lands on work', async ({ page }) => {
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  await page.evaluate(() => { window.__noReload = true })
  await page.locator('.work-detail__back').click()
  await page.waitForTimeout(1500)

  expect(await page.evaluate(() => window.__noReload === true)).toBe(true)
  expect(new URL(page.url()).pathname).toBe('/')
  const top = await page.evaluate(() => document.getElementById('work').getBoundingClientRect().top)
  expect(Math.abs(top - NAV_OFFSET)).toBeLessThanOrEqual(4)
})

test('rapid back during enter', async ({ page }) => {
  await gotoCard(page, 1)
  await page.locator('.works__card').nth(1).click()
  await page.waitForSelector('.work-detail')
  await page.waitForTimeout(150)
  await page.locator('.work-detail__back').click()
  await page.waitForTimeout(1500)

  expect(await page.evaluate(() => getComputedStyle(document.querySelector('main')).opacity)).toBe('1')
  await expect(page.locator('.works')).toBeVisible()
  expect(await page.locator('main').count()).toBe(1)
})

test('no trigger leak', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  await page.waitForTimeout(1000)
  const n = await page.evaluate(() => window.__ST.getAll().length)
  for (let i = 0; i < 3; i++) {
    await page.locator('.works__card').first().click()
    await page.waitForSelector('.work-detail__title')
    await page.waitForTimeout(900)
    await page.goBack()
    await page.waitForSelector('.works')
    await page.waitForTimeout(1200)
  }
  expect(await page.evaluate(() => window.__ST.getAll().length)).toBe(n)
})

// Review finding #1: a running Lenis smooth scroll must not override the router's scroll.
test('wheel then click opens detail at the top', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'wheel smoothing is desktop-only')
  await page.goto('/')
  await waitIntro(page)
  await page.locator('.works__card').nth(2).scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const box = await page.locator('.works__card').nth(2).boundingBox()
  await page.mouse.move(box.x + box.width / 2, Math.min(box.y + 60, 850))
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(30) }
  await page.waitForTimeout(150)
  await page.mouse.click(box.x + box.width / 2, Math.min(box.y + 60, 850))
  await page.waitForSelector('.work-detail__title')
  await page.waitForTimeout(1500)
  expect(await page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(4)
})

test('wheel then back restores card position', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'wheel smoothing is desktop-only')
  const y0 = await gotoCard(page, 2)
  await page.locator('.works__card').nth(2).click()
  await page.waitForSelector('.work-detail__title')
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 1500))
  await page.waitForTimeout(1000)
  // Wheel up (Lenis starts a 1.2s smooth scroll), then browser Back right away
  await page.mouse.move(700, 600)
  for (let i = 0; i < 3; i++) { await page.mouse.wheel(0, -150); await page.waitForTimeout(30) }
  await page.waitForTimeout(100)
  await page.goBack()
  await page.waitForTimeout(1800)
  expect(Math.abs(await page.evaluate(() => window.scrollY) - y0)).toBeLessThanOrEqual(4)
})

// Review finding #6: Cmd/Ctrl-click on Back must still open a new tab.
test('modifier click on back opens a new tab', async ({ page, context }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only')
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  const popup = context.waitForEvent('page', { timeout: 5000 })
  await page.locator('.work-detail__back').click({ modifiers: ['ControlOrMeta'] })
  expect(await popup).toBeTruthy()
  await page.waitForTimeout(500)
  expect(new URL(page.url()).pathname).toBe(`/work/${SLUG}`)
})

// Cards above the restored position must not delay the reveal of the cards in view.
test('cards in view after back appear promptly', async ({ page }) => {
  await gotoCard(page, 12)
  // Click from inside the page: Playwright's click re-scrolls when the fixed navbar
  // covers the card's centre, which would change the position the router saves.
  // Compare where the card sits on screen, not scrollY: Chrome's scroll anchoring may
  // shift scrollY to keep visible content still when something above changes height.
  const top0 = await page.evaluate(() => {
    const c = document.querySelectorAll('.works__card')[12]
    const top = c.getBoundingClientRect().top
    c.click()
    return top
  })
  await page.waitForSelector('.work-detail__title')
  await page.waitForTimeout(900)
  await page.goBack()
  await page.waitForSelector('.works')
  await page.waitForTimeout(1200)
  const card = page.locator('.works__card').nth(12)
  expect(Math.abs(await card.evaluate(el => el.getBoundingClientRect().top) - top0)).toBeLessThanOrEqual(4)
  // Effective opacity (card × media) so the check holds whichever element the reveal animates
  expect(await card.evaluate(el => Number(getComputedStyle(el).opacity) * Number(getComputedStyle(el.querySelector('.works__card-media')).opacity))).toBe(1)
})

// Follow-up: after a deep link + Back the Work headline must not sit tight under the navbar.
test('deep link back keeps breathing room under navbar', async ({ page }) => {
  await page.goto(`/work/${SLUG}`)
  await waitIntro(page)
  await page.locator('.work-detail__back').click()
  await page.waitForSelector('.works__headline')
  await page.waitForTimeout(1600)
  const { navBottom, headlineTop } = await page.evaluate(() => ({
    navBottom: Math.max(0, document.querySelector('.navbar').getBoundingClientRect().bottom),
    headlineTop: document.querySelector('.works__headline').getBoundingClientRect().top,
  }))
  expect(headlineTop - navBottom).toBeGreaterThanOrEqual(40)
})

// Small scroll jitter (iOS bounce, scroll anchoring) must not flash the navbar back in.
test('navbar ignores tiny upward scroll', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  await page.evaluate(() => window.scrollTo(0, 2000))
  await page.waitForTimeout(500)
  expect(await page.locator('.navbar').evaluate(n => n.classList.contains('navbar--hidden'))).toBe(true)
  await page.evaluate(() => window.scrollTo(0, 1997))
  await page.waitForTimeout(300)
  expect(await page.locator('.navbar').evaluate(n => n.classList.contains('navbar--hidden'))).toBe(true)
  await page.evaluate(() => window.scrollTo(0, 1900))
  await page.waitForTimeout(300)
  expect(await page.locator('.navbar').evaluate(n => n.classList.contains('navbar--hidden'))).toBe(false)
})
