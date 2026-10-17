// ================================================
// useCustomCursor — dot + ring cursor (desktop mouse only)
//
// - Aktif hanya kalau pointer utama mouse: (hover: hover) and (pointer: fine).
//   'ontouchstart' tidak dipakai lagi — laptop layar sentuh juga punya itu,
//   padahal user-nya pakai mouse.
// - Event di-delegasikan ke document, jadi elemen di halaman yang dibuka
//   belakangan (setelah pindah route) otomatis ikut. Tidak perlu attach ulang.
// - State ring cukup class (is-hover / is-view / is-down); ukurannya diatur
//   CSS lewat scale, bukan width/height, supaya halus.
// ================================================
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { EASE, DUR, MQ } from '@/motion/tokens.js'

const VIEW_SEL   = '.project-card, [data-cursor-text]'
const MAGNET_SEL = '.btn-navy, .btn-primary, .btn-outline, .cta__btn, .navbar__cta, .navbar__link, .footer__social-btn, .work-detail__back'
const HOVER_SEL  = 'a, button, [data-cursor-hover], .service-item'

const MAGNETIC_STRENGTH = 0.32
const RING_LERP = 0.16

export function useCustomCursor() {
  const enabled = ref(false)
  const dotRef  = ref(null)
  const ringRef = ref(null)
  const textRef = ref(null)

  let mouseX = 0, mouseY = 0
  let ringX  = 0, ringY  = 0
  let rafId  = null
  let magnetEl = null
  let viewing  = false
  let setDotX = null, setDotY = null, setRingX = null, setRingY = null

  const lerp = (a, b, t) => a + (b - a) * t

  const releaseMagnet = () => {
    if (!magnetEl) return
    gsap.to(magnetEl, { x: 0, y: 0, duration: DUR.base, ease: EASE.out, overwrite: 'auto' })
    magnetEl = null
  }

  const setView = (el) => {
    const on = !!el
    if (on === viewing) return
    viewing = on
    ringRef.value?.classList.toggle('is-view', on)
    if (textRef.value) textRef.value.textContent = on ? (el.getAttribute('data-cursor-text') || 'View') : ''
    if (dotRef.value) gsap.to(dotRef.value, { scale: on ? 0 : 1, duration: 0.35, ease: EASE.out, overwrite: 'auto' })
  }

  const onPointerOver = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    const target = e.target instanceof Element ? e.target : null
    const view   = target?.closest(VIEW_SEL)
    const magnet = view ? null : target?.closest(MAGNET_SEL)
    const hover  = !view && (magnet || target?.closest(HOVER_SEL))

    setView(view)
    ringRef.value?.classList.toggle('is-hover', !!hover)
    if (magnet !== magnetEl) {
      releaseMagnet()
      magnetEl = magnet
    }
  }

  const onPointerMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    mouseX = e.clientX
    mouseY = e.clientY
    setDotX?.(mouseX)
    setDotY?.(mouseY)

    // Elemen magnet bisa hilang dari DOM saat pindah halaman
    if (magnetEl && !magnetEl.isConnected) magnetEl = null
    if (magnetEl) {
      const r = magnetEl.getBoundingClientRect()
      gsap.to(magnetEl, {
        x: (mouseX - (r.left + r.width  / 2)) * MAGNETIC_STRENGTH,
        y: (mouseY - (r.top  + r.height / 2)) * MAGNETIC_STRENGTH,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const tick = () => {
    ringX = lerp(ringX, mouseX, RING_LERP)
    ringY = lerp(ringY, mouseY, RING_LERP)
    setRingX?.(ringX)
    setRingY?.(ringY)
    rafId = requestAnimationFrame(tick)
  }

  const setVisible = (on) => {
    gsap.to([dotRef.value, ringRef.value], { opacity: on ? 1 : 0, duration: DUR.fast, overwrite: 'auto' })
  }
  const onMouseLeave = () => { setVisible(false); releaseMagnet() }
  const onMouseEnter = () => setVisible(true)
  const onMouseDown  = () => ringRef.value?.classList.add('is-down')
  const onMouseUp    = () => ringRef.value?.classList.remove('is-down')

  onMounted(async () => {
    if (!window.matchMedia(MQ.finePointer).matches || window.matchMedia(MQ.reduce).matches) return

    enabled.value = true
    document.documentElement.classList.add('has-custom-cursor')
    await nextTick()

    gsap.set([dotRef.value, ringRef.value], { xPercent: -50, yPercent: -50 })
    setDotX  = gsap.quickSetter(dotRef.value,  'x', 'px')
    setDotY  = gsap.quickSetter(dotRef.value,  'y', 'px')
    setRingX = gsap.quickSetter(ringRef.value, 'x', 'px')
    setRingY = gsap.quickSetter(ringRef.value, 'y', 'px')
    rafId = requestAnimationFrame(tick)

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('mouseleave',  onMouseLeave)
    document.addEventListener('mouseenter',  onMouseEnter)
    document.addEventListener('mousedown',   onMouseDown)
    document.addEventListener('mouseup',     onMouseUp)
  })

  onUnmounted(() => {
    if (!enabled.value) return
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerover', onPointerOver)
    document.removeEventListener('mouseleave',  onMouseLeave)
    document.removeEventListener('mouseenter',  onMouseEnter)
    document.removeEventListener('mousedown',   onMouseDown)
    document.removeEventListener('mouseup',     onMouseUp)
    if (rafId) cancelAnimationFrame(rafId)
    releaseMagnet()
    document.documentElement.classList.remove('has-custom-cursor')
  })

  return { enabled, dotRef, ringRef, textRef }
}
