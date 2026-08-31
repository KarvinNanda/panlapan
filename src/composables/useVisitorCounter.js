// ================================================
// useVisitorCounter — Live pageviews + CTA click count via PostHog
// (lewat serverless proxy /api/analytics)
// ================================================
import { ref, onMounted } from 'vue'

export function useVisitorCounter() {
  const pageviews = ref(null)
  const ctaClicks = ref(null)
  const isLoading = ref(true)
  const hasError  = ref(false)

  const fetchCount = async () => {
    try {
      const res  = await fetch('/api/analytics')
      const data = await res.json()

      if (data.error) throw new Error(data.error)

      pageviews.value = data.pageviews ?? 0
      ctaClicks.value = data.ctaClicks ?? 0
    } catch (err) {
      hasError.value = true
      console.warn('Visitor counter unavailable:', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchCount()
  })

  return { pageviews, ctaClicks, isLoading, hasError }
}
