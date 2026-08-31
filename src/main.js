import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'
import posthog from 'posthog-js'

// Register GSAP plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── PostHog init — hanya capture pageview & basic events ───────────
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: false, // manual capture — kontrol lewat router (lihat App.vue)
    autocapture: true,       // klik, form submit, dll otomatis ke-track
    persistence: 'localStorage+cookie',
  })
} else {
  console.warn('PostHog key belum di-set — tracking nonaktif. Isi VITE_POSTHOG_KEY di .env')
}

// Force scroll to top on every hard refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

const app = createApp(App)

app.use(router)
app.mount('#app')

export { posthog }
