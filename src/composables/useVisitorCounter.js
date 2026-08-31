// ================================================
// useVisitorCounter — Live visit counter via PostHog (lewat serverless proxy)
// ================================================
import { ref, onMounted } from 'vue'

export function useVisitorCounter() {
  const count     = ref(null)
  const isLoading = ref(true)
  const hasError  = ref(false)

  const fetchCount = async () => {
    try {
      const res  = await fetch('/api/pageviews')
      const data = await res.json()

      if (data.error) throw new Error(data.error)

      count.value = data.total ?? 0
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

  return { count, isLoading, hasError }
}
