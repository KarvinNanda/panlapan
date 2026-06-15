// ================================================
// useCustomCursor — Magnetic cursor + particle trail
// ================================================
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

export function useCustomCursor() {
  const dotRef  = ref(null)
  const ringRef = ref(null)

  let mouseX = 0, mouseY = 0
  let ringX  = 0, ringY  = 0
  let rafId  = null
  const trails = []
  const TRAIL_COUNT = 8

  const lerp = (a, b, t) => a + (b - a) * t

  const createTrails = () => {
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = 'cursor-trail'
      const size  = 6 - i * 0.5
      const alpha = 0.35 - i * 0.04
      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,${alpha});
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
        transition: none;
      `
      document.body.appendChild(el)
      trails.push({ el, x: 0, y: 0 })
    }
  }

  const removeTrails = () => {
    trails.forEach(t => t.el.remove())
    trails.length = 0
  }

  const textRef = ref(null)
  
  const MAGNETIC_STRENGTH = 0.35
  const magneticEls = []

  const attachMagnetic = () => {
    const targets = document.querySelectorAll(
      'a, button, [data-cursor-hover], .project-card, .service-item, .nav-link, .btn-primary, .btn-outline'
    )

    targets.forEach(el => {
      const isProjectCard = el.classList.contains('project-card') || el.hasAttribute('data-cursor-text')
      const cursorText = el.getAttribute('data-cursor-text') || 'View'

      const onMove = (e) => {
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width  / 2
        const cy   = rect.top  + rect.height / 2
        const dx   = e.clientX - cx
        const dy   = e.clientY - cy

        // Only apply magnetic pull to smaller elements, not large project cards
        if (!isProjectCard) {
          gsap.to(el, {
            x: dx * MAGNETIC_STRENGTH,
            y: dy * MAGNETIC_STRENGTH,
            duration: 0.4,
            ease: 'power2.out'
          })
          ringRef.value?.classList.add('is-hovering')
        } else {
          ringRef.value?.classList.add('is-viewing')
          if (textRef.value) textRef.value.innerText = cursorText
          // Fade out the dot when viewing
          if (dotRef.value) gsap.to(dotRef.value, { opacity: 0, duration: 0.2 })
        }
      }

      const onLeave = () => {
        if (!isProjectCard) {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
          ringRef.value?.classList.remove('is-hovering')
        } else {
          ringRef.value?.classList.remove('is-viewing')
          if (textRef.value) textRef.value.innerText = ''
          if (dotRef.value) gsap.to(dotRef.value, { opacity: 1, duration: 0.2 })
        }
      }

      el.addEventListener('mousemove',  onMove)
      el.addEventListener('mouseleave', onLeave)
      magneticEls.push({ el, onMove, onLeave })
    })
  }

  const detachMagnetic = () => {
    magneticEls.forEach(({ el, onMove, onLeave }) => {
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    })
    magneticEls.length = 0
  }

  const tick = () => {
    // Ring follows with lag
    ringX = lerp(ringX, mouseX, 0.1)
    ringY = lerp(ringY, mouseY, 0.1)
    if (ringRef.value) gsap.set(ringRef.value, { x: ringX, y: ringY })

    // Trail — each follows previous with increasing lag
    trails.forEach((t, i) => {
      const target = i === 0
        ? { x: mouseX, y: mouseY }
        : { x: trails[i - 1].x, y: trails[i - 1].y }
      t.x = lerp(t.x, target.x, 0.35 - i * 0.025)
      t.y = lerp(t.y, target.y, 0.35 - i * 0.025)
      gsap.set(t.el, { x: t.x, y: t.y })
    })

    rafId = requestAnimationFrame(tick)
  }

  const onMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (dotRef.value) gsap.set(dotRef.value, { x: mouseX, y: mouseY })
  }

  const onMouseLeave = () => {
    gsap.to([dotRef.value, ringRef.value], { opacity: 0, duration: 0.3 })
    trails.forEach(t => gsap.to(t.el, { opacity: 0, duration: 0.3 }))
  }

  const onMouseEnter = () => {
    gsap.to([dotRef.value, ringRef.value], { opacity: 1, duration: 0.3 })
    trails.forEach(t => gsap.to(t.el, { opacity: 1, duration: 0.3 }))
  }

  const onMouseDown = () => {
    gsap.to(ringRef.value, { scale: 0.7, duration: 0.15, ease: 'power2.out' })
  }

  const onMouseUp = () => {
    gsap.to(ringRef.value, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
  }

  onMounted(() => {
    if ('ontouchstart' in window) return

    createTrails()
    rafId = requestAnimationFrame(tick)

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseup',    onMouseUp)

    // Delay magnetic attach so DOM is fully rendered
    setTimeout(attachMagnetic, 600)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove',  onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
    document.removeEventListener('mousedown',  onMouseDown)
    document.removeEventListener('mouseup',    onMouseUp)
    if (rafId) cancelAnimationFrame(rafId)
    removeTrails()
    detachMagnetic()
  })

  return { dotRef, ringRef, textRef }
}
