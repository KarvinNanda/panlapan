// ================================================
// GET /api/analytics
// Server-side only — Personal API Key TIDAK PERNAH sampai ke browser
//
// Query 2 metric ke PostHog via HogQL Query API:
//   - pageviews : total $pageview 30 hari terakhir
//   - ctaClicks : total klik CTA "Start Your Journey" (WhatsApp) 30 hari terakhir
// ================================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { POSTHOG_PERSONAL_API_KEY, VITE_POSTHOG_PROJECT_ID, VITE_POSTHOG_HOST } = process.env
  const projectId = VITE_POSTHOG_PROJECT_ID

  if (!POSTHOG_PERSONAL_API_KEY || !projectId) {
    return res.status(500).json({ error: 'PostHog server env vars belum di-set' })
  }

  // Query API (HogQL) ada di APP host (us.posthog.com), BUKAN ingestion host
  // (us.i.posthog.com) yang dipakai posthog-js buat kirim event dari browser.
  // Derive app host dari VITE_POSTHOG_HOST kalau formatnya ingestion PostHog Cloud,
  // fallback ke host apa adanya kalau self-hosted (biasanya satu domain buat semua).
  const ingestHost = VITE_POSTHOG_HOST || 'https://us.i.posthog.com'
  const appHost = ingestHost.includes('.i.posthog.com')
    ? ingestHost.replace('.i.posthog.com', '.posthog.com')
    : ingestHost

  async function getCount(eventName) {
    const url = `${appHost}/api/projects/${projectId}/query/`
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `SELECT count() FROM events WHERE event = '${eventName}' AND timestamp >= now() - INTERVAL 30 DAY`,
        },
      }),
    })
    const data = await r.json()
    if (!r.ok) console.error('PostHog API error:', JSON.stringify(data))
    return data.results?.[0]?.[0] ?? 0
  }

  try {
    const [pageviews, ctaClicks] = await Promise.all([
      getCount('$pageview'),
      getCount('cta_whatsapp_clicked'),
    ])

    // Cache 60 detik — supaya gak query PostHog tiap kali orang buka web
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.status(200).json({ pageviews, ctaClicks })
  } catch (err) {
    console.error('PostHog query failed:', err)
    return res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}
