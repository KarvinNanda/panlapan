// ================================================
// GET /api/analytics
// Server-side only — Personal API Key TIDAK PERNAH sampai ke browser
//
// Query 2 metric ke PostHog via HogQL Query API:
//   - pageviews : total $pageview 30 hari terakhir
//   - ctaClicks : total klik semua CTA yang ngarah ke #connect (30 hari terakhir)
//                 gabungan 2 event:
//                 - cta_whatsapp_clicked : klik "Start Your Journey" (CtaSection, langsung buka WA)
//                 - cta_scroll_clicked   : klik "Start a Project"/"panlapan" (navbar, WorksSection,
//                                          ServicesSection — cuma scroll ke #connect)
// ================================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID, VITE_POSTHOG_HOST } = process.env
  const projectId = POSTHOG_PROJECT_ID

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

  async function getCount(eventNames) {
    const names = Array.isArray(eventNames) ? eventNames : [eventNames]
    const inList = names.map(n => `'${n}'`).join(', ')
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
          query: `SELECT count() FROM events WHERE event IN (${inList}) AND timestamp >= now() - INTERVAL 30 DAY`,
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
      getCount(['cta_whatsapp_clicked', 'cta_scroll_clicked']),
    ])

    // Cache 15 detik — cukup responsif tapi tetap nyegah spam query ke PostHog
    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate')
    return res.status(200).json({ pageviews, ctaClicks })
  } catch (err) {
    console.error('PostHog query failed:', err)
    return res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}
