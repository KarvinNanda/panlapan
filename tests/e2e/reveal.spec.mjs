import { test, expect, waitIntro } from './helpers.mjs'

const HEADLINES = ['#services h2', '#approach h2', '.why__title', '.why__subtitle', '.why__manifesto', '.cta__headline', '.works__headline']
const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)']

test('headlines use line masks', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  for (const sel of HEADLINES) {
    const el = page.locator(sel).first()
    expect(await el.locator('.text-reveal-wrapper').count(), `${sel} has line masks`).toBeGreaterThan(0)
    // Center it: "IfNeeded" leaves an element that only peeks at the bottom edge untouched,
    // which is above its reveal trigger (~85%) by design.
    await el.evaluate(n => n.scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(2000)
    const lines = await el.locator('.text-reveal-wrapper > *').evaluateAll(ns => ns.map(n => {
      const cs = getComputedStyle(n)
      return { display: cs.display, transform: cs.transform, opacity: cs.opacity }
    }))
    for (const l of lines) {
      // Transforms do nothing on inline boxes, so a masked line must be a block to actually rise.
      expect(l.display, `${sel} line is a block`).toBe('block')
      expect(IDENTITY, `${sel} line settled`).toContain(l.transform)
      expect(l.opacity).toBe('1')
    }
  }
})

// Review finding #2: splitting <br> lines into spans must keep the words apart for SEO / screen readers.
test('split headlines keep spaces between lines', async ({ page }) => {
  await page.goto('/')
  await waitIntro(page)
  const text = sel => page.locator(sel).evaluate(n => n.textContent.replace(/\s+/g, ' ').trim())
  expect(await text('.cta__headline')).toBe("Let's Build Something That Works.")
  expect(await text('.why__subtitle')).toBe('Strategy First. Creativity Second.')
  expect(await text('.why__manifesto')).toBe("Because great creative work is not measured by how it looks. It's measured by what it accomplishes.")
})
