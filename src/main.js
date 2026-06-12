import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

// Register GSAP plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Force scroll to top on every hard refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

const app = createApp(App)

app.use(router)
app.mount('#app')
