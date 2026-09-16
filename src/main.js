import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router/index.js'
import './assets/main.css'
import posthog from 'posthog-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ isClient }) => {
    // Semua di bawah ini butuh browser API (window/document/history),
    // jadi hanya jalan di client — saat build SSG, blok ini dilewati.
    if (!isClient) return

    // Register GSAP plugins — satu kali, di sini saja.
    // Composable & komponen tidak lagi register sendiri di level modul.
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
  },
)

export { posthog }
