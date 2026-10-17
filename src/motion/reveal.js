// ================================================
// Reveal helpers — dipanggil di dalam useMotion(setup)
// ================================================
import { gsap } from 'gsap'
import { EASE, DUR, STAGGER } from './tokens.js'

const scrollTriggerFor = (trigger, start) => (trigger ? { trigger, start } : undefined)

// Headline: teks naik dari balik mask. Target harus di dalam .text-reveal-wrapper
export function revealLines(targets, { trigger = null, delay = 0, start = 'top 88%' } = {}) {
  if (!targets || targets.length === 0) return
  gsap.fromTo(targets,
    { y: '110%', opacity: 0 },
    { y: '0%', opacity: 1, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.base, delay,
      scrollTrigger: scrollTriggerFor(trigger, start) }
  )
}

// Body text / elemen kecil / list: fade sambil naik sedikit
export function fadeUp(targets, { trigger = null, x = 0, y = 16, stagger = STAGGER.base, delay = 0, start = 'top 85%' } = {}) {
  if (!targets || targets.length === 0) return
  gsap.fromTo(targets,
    { opacity: 0, x, y },
    { opacity: 1, x: 0, y: 0, duration: DUR.base, ease: EASE.out, stagger, delay,
      scrollTrigger: scrollTriggerFor(trigger, start) }
  )
}
