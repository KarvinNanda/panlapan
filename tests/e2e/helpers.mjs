import { test as base, expect } from '@playwright/test'

// Must match NAV_OFFSET in src/motion/tokens.js
export const NAV_OFFSET = 0

// Every test gets PostHog blocked: a local .env may hold the real project key and the
// footer shows live pageview counts, so test traffic must never reach it.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/posthog\.com/, r => r.abort())
    await use(page)
  },
})
export { expect }

export async function waitIntro(page) {
  // The curtain only exists after Vue mounts, so wait for the app first.
  await page.waitForSelector('#app-wrapper', { timeout: 10_000 })
  await page.waitForFunction(() => !document.querySelector('.intro-curtain'), null, { timeout: 10_000 })
}
