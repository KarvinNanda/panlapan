// ================================================
// useLenis — Smooth scroll setup with Lenis
// Desktop: wheel di-smooth oleh Lenis. Touch: scroll native
// (default Lenis 1.x, syncTouch: false).
// ================================================
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MQ } from '@/motion/tokens.js'

let lenis = null

// Named supaya gsap.ticker.remove() benar-benar melepasnya saat unmount
const onTick = (time) => {
  lenis?.raf(time * 1000)
}

export function useLenis() {
  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Reduced motion: wheel tidak di-smooth
      smoothWheel: !window.matchMedia(MQ.reduce).matches,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    gsap.ticker.remove(onTick)
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
    ScrollTrigger.killAll()
  })

  return { lenis: () => lenis }
}

export const getLenis = () => lenis

export { lenis }
