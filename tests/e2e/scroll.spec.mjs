import { test, expect, waitIntro, NAV_OFFSET } from './helpers.mjs'

test('nav link scrolls through lenis', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'navbar links are desktop-only')
  await page.goto('/')
  await waitIntro(page)
  await page.waitForTimeout(800)

  // Sample during the scroll: Lenis adds .lenis-smooth only while IT drives the scroll (native scrolls get just .lenis-scrolling).
  const sawLenis = page.evaluate(() => new Promise(resolve => {
    const t0 = performance.now()
    const tick = () => {
      if (document.documentElement.classList.contains('lenis-smooth')) return resolve(true)
      if (performance.now() - t0 > 2000) return resolve(false)
      requestAnimationFrame(tick)
    }
    tick()
  }))
  await page.locator('.navbar__link', { hasText: 'Services' }).click()
  expect(await sawLenis).toBe(true)

  await page.waitForTimeout(2500)
  const top = await page.evaluate(() => document.getElementById('services').getBoundingClientRect().top)
  expect(top).toBeGreaterThanOrEqual(NAV_OFFSET - 2)
  expect(top).toBeLessThanOrEqual(NAV_OFFSET + 2)
})
