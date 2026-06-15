import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTextReveal() {
  /**
   * Animates elements with a mask-reveal effect.
   * Elements should be wrapped in an overflow:hidden container.
   * 
   * @param {NodeList|Array|String} targets - The elements to animate (e.g. '.hero__line')
   * @param {Element|String} triggerEl - The ScrollTrigger element (optional)
   * @param {Number} delay - Initial delay
   */
  const revealText = (targets, triggerEl = null, delay = 0) => {
    if (!targets) return

    gsap.fromTo(targets,
      { y: '110%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration: 1.1, 
        stagger: 0.08, 
        ease: 'power4.out',
        delay: delay,
        scrollTrigger: triggerEl ? {
          trigger: triggerEl,
          start: 'top 88%'
        } : null
      }
    )
  }

  return { revealText }
}
