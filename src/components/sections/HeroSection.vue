<template>
  <section class="hero" ref="heroRef">
    <div class="hero__orb" ref="orbRef" />

    <div class="hero__inner">
      <div class="hero__eyebrow" ref="eyebrowRef">
        <span class="eyebrow">Panlapan Creative Lab</span>
        <span class="hero__eyebrow-dot" />
        <span class="eyebrow">Est. 2024</span>
      </div>

      <h1 class="hero__headline" ref="headlineRef">
        <div class="text-reveal-wrapper">
          <span class="hero__line">Turning</span>
        </div>
        <div class="text-reveal-wrapper">
          <span class="hero__line hero__line--italic">Ideas</span>
        </div>
        <div class="text-reveal-wrapper">
          <span class="hero__line">into</span>
        </div>
        <div class="text-reveal-wrapper">
          <span class="hero__line hero__line--outlined">Impactful</span>
        </div>
        <div class="text-reveal-wrapper">
          <span class="hero__line">Creations.</span>
        </div>
      </h1>

      <p class="hero__sub" ref="subRef">
        We help businesses build brands, create demand,<br class="hero__br">
        and grow through strategy, creativity, and digital experiences.
      </p>

      <div class="hero__cta" ref="ctaRef">
        <a href="#work" class="btn-primary" data-cursor-hover @click.prevent="scrollTo('work')">
          See Our Work
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="#connect" class="btn-outline" data-cursor-hover @click.prevent="scrollTo('connect')">
          Start a Project
        </a>
      </div>
    </div>

    <div class="hero__scroll" ref="scrollIndRef">
      <div class="hero__scroll-line" />
      <span class="eyebrow">Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useParallax } from '@/composables/useParallax.js'

const heroRef     = ref(null)
const orbRef      = ref(null)
const eyebrowRef  = ref(null)
const headlineRef = ref(null)
const subRef      = ref(null)
const ctaRef      = ref(null)
const scrollIndRef = ref(null)

const { parallax, parallaxFade } = useParallax()

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const lines = headlineRef.value?.querySelectorAll('.hero__line')

  gsap.set([eyebrowRef.value, subRef.value, ctaRef.value, scrollIndRef.value], { opacity: 0, y: 20 })
  gsap.set(lines, { y: '110%', opacity: 0 })
  gsap.set(orbRef.value, { scale: 0.6, opacity: 0 })

  const tl = gsap.timeline({ delay: 0.2 })
  tl.to(orbRef.value,      { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, 0)
  tl.to(eyebrowRef.value,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
  tl.to(lines,             { y: '0%', opacity: 1, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.3)
  tl.to(subRef.value,      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9)
  tl.to(ctaRef.value,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.05)
  tl.to(scrollIndRef.value,{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.2)

  gsap.to(orbRef.value, { y: -30, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })

  // Parallax orb — moves up slower than scroll
  parallax(orbRef.value, 0.3)

  // Headline fades + drifts up as you scroll past
  parallaxFade(headlineRef.value, { trigger: heroRef.value })

  // Sub text slight parallax
  parallax(subRef.value, 0.15, { trigger: heroRef.value })
})
</script>

<style scoped>
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 2rem 5rem;
  position: relative;
  overflow: hidden;
}

.hero__inner {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero__orb {
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 60vw;
  max-width: 900px;
  max-height: 500px;
  border-radius: 50%;
  /* background: radial-gradient(
    ellipse at 50% 0%,
    rgba(80,  60, 180, 0.55) 0%,
    rgba(40,  20, 120, 0.35) 35%,
    rgba(180, 60,  80, 0.20) 60%,
    transparent 0%
  ); */
  filter: blur(70px);
  pointer-events: none;
  z-index: 0;
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.hero__eyebrow-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

/* Desktop fix: was clamp(3.5rem, 9vw, 10rem) — too big on 1400px+ */
.hero__headline {
  font-size: clamp(2.8rem, 4.7vw, 7rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 2.5rem;
  overflow: hidden;
}

.hero__line           { display: block; }
.hero__line--italic   { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.7); }
.hero__line--outlined { -webkit-text-stroke: 1px rgba(255,255,255,0.5); color: transparent; }

.hero__sub {
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.8;
  max-width: 500px;
  margin-bottom: 3rem;
  font-weight: 400;
}

.hero__cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.hero__scroll-line {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-white);
  animation: scrollLine 1.8s ease-in-out infinite;
}

@keyframes scrollLine {
  0%   { top: -100%; }
  50%  { top: 0%;    }
  100% { top: 100%;  }
}

@media (max-width: 768px) {
  .hero           { padding: 8rem 1.5rem 4rem; }
  .hero__headline { font-size: clamp(3rem, 13vw, 5rem); }
  .hero__br       { display: none; }
  .hero__orb      { top: 0; right: -20%; width: 80vw; height: 80vw; }
}
</style>
