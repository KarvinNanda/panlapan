import { test, expect, waitIntro } from './helpers.mjs'

const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)']

test('touch laptop keeps a cursor', async ({ browser }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop hardware only')
  // Touchscreen laptop: touch events exist ('ontouchstart' in window), but the primary
  // pointer is a mouse. Playwright's hasTouch flips (pointer) to coarse, so define the
  // touch handler property directly instead.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, baseURL: test.info().project.use.baseURL })
  await ctx.addInitScript(() => { window.ontouchstart = null })
  const page = await ctx.newPage()
  await page.route(/posthog\.com/, r => r.abort())
  await page.goto('/')
  await waitIntro(page)
  expect(await page.evaluate(() => 'ontouchstart' in window && matchMedia('(hover: hover) and (pointer: fine)').matches)).toBe(true)
  await page.mouse.move(400, 400)
  await page.waitForTimeout(300)
  expect(await page.evaluate(() => document.documentElement.classList.contains('has-custom-cursor'))).toBe(true)
  await expect(page.locator('.cursor-dot')).toBeVisible()
  await ctx.close()
})

test('phone has native cursor rules', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'phone only')
  await page.goto('/')
  await waitIntro(page)
  expect(await page.evaluate(() => getComputedStyle(document.body).cursor)).not.toBe('none')
  // No leftover cursor ring parked in the top-left corner
  expect(await page.locator('.cursor-ring, .cursor-dot, .cursor-trail').count()).toBe(0)
})

test('no trail on desktop', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only')
  await page.goto('/')
  await waitIntro(page)
  await page.mouse.move(300, 300)
  await page.mouse.move(600, 500, { steps: 10 })
  expect(await page.locator('.cursor-trail').count()).toBe(0)
})

test('magnetic works after navigation', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only')
  await page.goto('/')
  await waitIntro(page)
  await page.locator('.works__card').first().click()
  await page.waitForSelector('.work-detail__back')
  await page.waitForTimeout(1200)
  const box = await page.locator('.work-detail__back').boundingBox()
  await page.mouse.move(box.x + box.width / 2 - 30, box.y + box.height / 2)
  await page.mouse.move(box.x + box.width / 2 + 10, box.y + box.height / 2, { steps: 5 })
  await page.waitForTimeout(500)
  expect(IDENTITY).not.toContain(await page.evaluate(() => getComputedStyle(document.querySelector('.work-detail__back')).transform))
})

// Review finding #4: releasing the magnet must not leave an inline transform that blocks CSS :hover / :active.
test('magnet release clears inline transform', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only')
  await page.goto('/')
  await waitIntro(page)
  const btn = page.locator('.works__header-cta')
  await btn.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const box = await btn.boundingBox()
  await page.mouse.move(box.x + box.width / 2 - 10, box.y + box.height / 2, { steps: 5 })
  await page.waitForTimeout(400)
  await page.mouse.move(box.x + box.width / 2, box.y + 300, { steps: 5 })
  await page.waitForTimeout(1200)
  expect(await btn.evaluate(el => el.style.transform)).toBe('')
})

// Review finding #5: pressing while hovering a button shrinks the ring only slightly.
test('hover press keeps ring near hover size', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only')
  await page.goto('/')
  await waitIntro(page)
  const btn = page.locator('.works__header-cta')
  await btn.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const box = await btn.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 })
  await page.waitForTimeout(300)
  await page.mouse.down()
  await page.waitForTimeout(700)
  const scale = await page.locator('.cursor-ring__circle').evaluate(el => Number(getComputedStyle(el).transform.match(/matrix\(([^,]+)/)[1]))
  await page.mouse.up()
  expect(scale).toBeGreaterThan(0.55)
  expect(scale).toBeLessThan(0.72)
})
