// ================================================
// useLenis — Smooth scroll setup with Lenis
// ================================================
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export function useLenis() {
  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
    gsap.ticker.remove(() => {})
    ScrollTrigger.killAll()
  })

  return { lenis: () => lenis }
}

export { lenis }
