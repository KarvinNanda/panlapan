// ================================================
// useMagnet — Magnetic button effect (desktop only)
// Buttons subtly attract toward the cursor on hover.
// ================================================
import { gsap } from 'gsap'

export function useMagnet(strength = 0.32) {
  const isTouch = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  const attach = (el) => {
    if (!el || isTouch()) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width  / 2)) * strength
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }

  return { attach }
}
