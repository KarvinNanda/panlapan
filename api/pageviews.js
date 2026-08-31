// ================================================
// GET /api/pageviews
// Server-side only — Personal API Key TIDAK PERNAH sampai ke browser
// ================================================
export default async function handler(req, res) {
  const { POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID, VITE_POSTHOG_HOST } = process.env
  const host = VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
    return res.status(500).json({ error: 'PostHog server env vars belum di-set' })
  }

  try {
    const response = await fetch(
      `${host}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        },
        body: JSON.stringify({
          query: {
            kind: 'HogQLQuery',
            query: "SELECT count() FROM events WHERE event = '$pageview'",
          },
        }),
      }
    )

    const data = await response.json()
    const total = data?.results?.[0]?.[0] ?? 0

    // Cache 60 detik — supaya gak query PostHog tiap kali orang buka web
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.status(200).json({ total })
  } catch (err) {
    console.error('PostHog query failed:', err)
    return res.status(500).json({ error: 'Failed to fetch pageview count' })
  }
}
