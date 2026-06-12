// ================================================
// useScrollAnimations — Reusable GSAP scroll reveals
// ================================================
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {

  // Fade up reveal — basic elements
  const fadeUp = (targets, options = {}) => {
    const els = typeof targets === 'string' ? document.querySelectorAll(targets) : targets

    gsap.fromTo(els, {
      opacity: 0,
      y: options.y ?? 50,
    }, {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.9,
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: options.trigger ?? els[0],
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger
      }
    })
  }

  // Text reveal — char by char
  const textReveal = (container, options = {}) => {
    if (!container) return

    const chars = container.querySelectorAll('.char')
    if (!chars.length) return

    gsap.fromTo(chars, {
      y: '110%',
      opacity: 0,
    }, {
      y: '0%',
      opacity: 1,
      duration: options.duration ?? 1,
      ease: 'power4.out',
      stagger: options.stagger ?? 0.03,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger
      }
    })
  }

  // Horizontal line reveal
  const lineReveal = (target, options = {}) => {
    gsap.fromTo(target, {
      scaleX: 0,
      transformOrigin: 'left center'
    }, {
      scaleX: 1,
      duration: options.duration ?? 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: target,
        start: 'top 90%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger
      }
    })
  }

  // Image reveal with clip
  const imageReveal = (target, options = {}) => {
    gsap.fromTo(target, {
      clipPath: 'inset(100% 0 0 0)',
    }, {
      clipPath: 'inset(0% 0 0 0)',
      duration: options.duration ?? 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: options.trigger ?? target,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger
      }
    })
  }

  // Stagger fade in for list items
  const staggerFadeIn = (targets, options = {}) => {
    gsap.fromTo(targets, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.7,
      stagger: options.stagger ?? 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: options.trigger ?? targets[0],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  }

  // Counter animation
  const animateCounter = (element, target, options = {}) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: options.duration ?? 2,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = options.format
          ? options.format(Math.round(obj.val))
          : Math.round(obj.val)
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }

  return {
    fadeUp,
    textReveal,
    lineReveal,
    imageReveal,
    staggerFadeIn,
    animateCounter
  }
}
