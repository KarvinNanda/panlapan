import { test, expect, waitIntro } from './helpers.mjs'

const scaleOf = t => (t === 'none' ? 1 : Number(t.match(/matrix\(([^,]+)/)?.[1] ?? 1))

test('menu links stagger in', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'hamburger menu is mobile-only')
  await page.goto('/')
  await waitIntro(page)
  await page.waitForTimeout(800)
  await page.locator('.navbar__hamburger').click()
  await page.waitForTimeout(200)
  const [first, last] = await page.$$eval('.mobile-menu__link', ls =>
    [ls[0], ls[ls.length - 1]].map(l => Number(getComputedStyle(l).opacity)))
  expect(first).toBeGreaterThan(last)
})

test('card press feedback', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'touch feedback')
  await page.goto('/')
  await waitIntro(page)
  const card = page.locator('.works__card').first()
  await card.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const box = await card.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + 40)
  await page.mouse.down()
  await page.waitForTimeout(200)
  const t = await card.evaluate(el => getComputedStyle(el).transform)
  await page.mouse.up()
  expect(scaleOf(t)).toBeLessThan(1)
})

test('button press feedback', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'touch feedback')
  await page.goto('/')
  await waitIntro(page)
  const btn = page.locator('.cta__btn')
  await btn.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const box = await btn.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.waitForTimeout(200)
  const t = await btn.evaluate(el => getComputedStyle(el).transform)
  await page.mouse.up()
  expect(scaleOf(t)).toBeLessThan(1)
})
