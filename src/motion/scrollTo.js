// ================================================
// scrollToTarget — semua anchor scroll lewat Lenis,
// supaya rasanya sama dengan scroll biasa.
// target: id section (tanpa '#'), Element, atau posisi Y
// ================================================
import { getLenis } from '@/composables/useLenis.js'
import { NAV_OFFSET } from './tokens.js'

export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (el == null) return

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate })
    return
  }

  const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}
