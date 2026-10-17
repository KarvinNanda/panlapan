import { test, expect } from './helpers.mjs'

test.use({ reducedMotion: 'reduce' })

const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)']

test('reduced motion shows everything', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('#app-wrapper')
  await page.waitForTimeout(500)
  const curtain = await page.evaluate(() => {
    const c = document.querySelector('.intro-curtain')
    return c ? Number(getComputedStyle(c).opacity) : 0
  })
  expect(curtain).toBe(0)

  // Jump through the page with no waiting for animations.
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 400) {
    await page.evaluate(v => window.scrollTo(0, v), y)
    await page.waitForTimeout(30)
  }
  const states = await page.$$eval(
    '.text-reveal-wrapper > *, .service-item, .approach__step, .works__card, .why__qa, .cta__btn',
    els => els.map(e => ({ cls: e.className, opacity: getComputedStyle(e).opacity, transform: getComputedStyle(e).transform })))
  expect(states.length).toBeGreaterThan(20)
  for (const s of states) {
    expect(s.opacity, s.cls).toBe('1')
    expect(IDENTITY, s.cls).toContain(s.transform)
  }
})

test('reduced motion page change is instant', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('#app-wrapper')
  await page.waitForTimeout(500)
  const card = page.locator('.works__card').first()
  await card.scrollIntoViewIfNeeded()
  const ms = await page.evaluate(() => new Promise(resolve => {
    const t0 = performance.now()
    document.querySelector('.works__card').click()
    const check = () => document.querySelector('.work-detail') && !document.querySelector('.works')
      ? resolve(performance.now() - t0) : requestAnimationFrame(check)
    check()
  }))
  expect(ms).toBeLessThan(150)
})

test('reduced motion anchor scroll jumps', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'navbar links are desktop-only')
  await page.goto('/')
  await page.waitForSelector('#app-wrapper')
  await page.waitForTimeout(500)
  await page.locator('.navbar__link', { hasText: 'Services' }).click()
  await page.waitForTimeout(100)
  const top = await page.evaluate(() => document.getElementById('services').getBoundingClientRect().top)
  expect(Math.abs(top)).toBeLessThanOrEqual(2)
})
