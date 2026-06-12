// ================================================
// useParallax — scroll-based parallax utility
// ================================================
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useParallax() {

  // Parallax any element on scroll
  // speed: 0.1 (subtle) → 0.5 (dramatic)
  const parallax = (target, speed = 0.2, options = {}) => {
    gsap.to(target, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger || target,
        start:   'top bottom',
        end:     'bottom top',
        scrub:   options.scrub ?? 1.5,
      }
    })
  }

  // Parallax + fade out as element scrolls past
  const parallaxFade = (target, options = {}) => {
    gsap.to(target, {
      yPercent: -20,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger || target,
        start:   'top top',
        end:     'bottom top',
        scrub:   true,
      }
    })
  }

  // Horizontal parallax
  const parallaxX = (target, speed = 0.15) => {
    gsap.to(target, {
      xPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end:   'bottom top',
        scrub: 2,
      }
    })
  }

  return { parallax, parallaxFade, parallaxX }
}
