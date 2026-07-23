<template>
  <section class="hero" ref="heroRef">
    <div class="hero__bg">
      <div class="hero__bg-blob blob-1"></div>
      <div class="hero__bg-blob blob-2"></div>
      <div class="hero__bg-blob blob-3"></div>
      <div class="hero__bg-overlay"></div>
    </div>

    <div class="hero__inner">
      <!-- Ghost wordmark — barely visible, sama nuansa merah -->
      <div class="hero__wordmark" ref="wordmarkRef">panlapan</div>
       <h1 class="hero__headline" ref="headlineRef">
          <div class="text-reveal-wrapper">
            <span class="hero__line">Turning ideas</span>
          </div>
          <div class="text-reveal-wrapper">
            <span class="hero__line">into impactful</span>
          </div>
          <div class="text-reveal-wrapper">
            <span class="hero__line">creations.</span>
          </div>
        </h1>

      <!-- Konten bawah: eyebrow + headline + sub + cta -->
      <div class="hero__content">
        <!-- <div class="hero__eyebrow" ref="eyebrowRef">
          <span class="eyebrow">Panlapan Creative Lab</span>
          <span class="hero__eyebrow-dot" />
          <span class="eyebrow">Est. 2024</span>
        </div> -->

       

        <!-- <p class="hero__sub" ref="subRef">
          We help businesses build brands, create demand,
          and grow through strategy, creativity, and digital experiences.
        </p> -->

        <!-- <div class="hero__cta" ref="ctaRef">
          <a href="#work" class="btn-primary" data-cursor-hover
             @click.prevent="scrollTo('work')">
            See Our Work
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#connect" class="btn-outline" data-cursor-hover
             @click.prevent="scrollTo('connect')">
            Start a Project
          </a>
        </div> -->
      </div>
    </div>

    <!-- <div class="hero__scroll" ref="scrollIndRef">
      <div class="hero__scroll-line" />
      <span class="eyebrow">Scroll</span>
    </div> -->
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef     = ref(null)
const wordmarkRef = ref(null)
const headlineRef = ref(null)

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    const lines = headlineRef.value?.querySelectorAll('.hero__line')
    const tl = gsap.timeline({ delay: 0.2 })

    if (wordmarkRef.value) {
      gsap.set(wordmarkRef.value, { opacity: 0 })
      tl.to(wordmarkRef.value, { opacity: 1, duration: 2, ease: 'power2.out' }, 0)
    }

    if (lines?.length) {
      // Charlie Osborne signature dramatic reveal: deeply offset, rotated, slow expo curve
      gsap.set(lines, { y: '150%', rotationZ: 5, transformOrigin: '0% 50%' })
      tl.to(lines, { 
        y: '0%', 
        rotationZ: 0, 
        duration: 2, 
        stagger: 0.15, 
        ease: 'expo.out' 
      }, 0.2)
    }

    // Scroll parallax — wordmark drifts up as you scroll away from hero
    if (heroRef.value && wordmarkRef.value) {
      gsap.to(wordmarkRef.value, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      })
    }

    // Headline lines also drift slightly on scroll
    if (heroRef.value && lines?.length) {
      gsap.to(lines, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        }
      })
    }
  })
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
}

/* Lava lamp base */
.hero__bg {
  position: absolute;
  inset: 0;
  background-color: #E73121; /* Base Red */
  overflow: hidden;
  z-index: 0;
}

/* Organic moving blobs */
/* .hero__bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px); 
  opacity: 0.95;
  will-change: transform;
} */

/* .blob-1 {
  width: 50vw;
  height: 50vw;
  background: #FF5B22; 
  bottom: 5%;
  left: 20%;
  animation: lavaFloat1 18s infinite ease-in-out;
}

.blob-2 {
  width: 45vw;
  height: 45vw;
  background: #7A0A00; 
  bottom: 0%;
  left: 45%;
  animation: lavaFloat2 22s infinite ease-in-out;
}

.blob-3 {
  width: 55vw;
  height: 40vw;
  background: #FF9B50; 
  bottom: 15%;
  left: 35%;
  animation: lavaFloat3 26s infinite ease-in-out;
} */

/* Overlay to ensure the bottom smoothly fades into the black section below */
.hero__bg-overlay {
  position: absolute;
  inset: 0;
  /* Reduced opacity of the gradient so the lava is clearly visible */
  background: linear-gradient(
    to bottom,
    rgba(231, 49, 33, 0) 0%,
    rgba(231, 49, 33, 0) 35%,
    rgba(155, 26, 14, 0.4) 44%,
    #000000 100%
  );
  pointer-events: none;
}

/* @keyframes lavaFloat1 {
  0%   { transform: translate(-10%, 10%) scale(1); }
  50%  { transform: translate(25%, -15%) scale(1.1); }
  100% { transform: translate(-10%, 10%) scale(1); }
}
@keyframes lavaFloat2 {
  0%   { transform: translate(20%, 0%) scale(1.1); }
  50%  { transform: translate(-20%, 15%) scale(0.9); }
  100% { transform: translate(20%, 0%) scale(1.1); }
}
@keyframes lavaFloat3 {
  0%   { transform: translate(0%, -15%) scale(0.9); }
  50%  { transform: translate(15%, 10%) scale(1.15); }
  100% { transform: translate(0%, -15%) scale(0.9); }
} */

/* Inner — flex column, space-between: wordmark di atas, konten di bawah */
.hero__inner {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 5.5rem;
  padding-bottom: 4rem;
}

/* Ghost wordmark — warna hampir sama dengan bg merah, barely visible */
.hero__wordmark {
  font-size: clamp(12rem, 13vw, 14rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: rgb(163 10 10 / 76%);
  text-transform: lowercase;
  line-height: 0.9;
  user-select: none;
  text-align: center;
  width: 100%;
}

/* Content block di bagian bawah inner */
.hero__content {
  display: flex;
  flex-direction: column;
}

/* Eyebrow */
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.hero__eyebrow-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}

/* Headline */
.hero__headline {
  font-size: clamp(2.8rem, 10vw, 6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
  overflow: hidden;
  /* text-transform: lowercase; */
}

.hero__line { display: block; }

/* Give descenders (g, y, j) room inside the overflow-hidden reveal mask
   without shifting line spacing — pad the box, then pull it back with margin. */
.hero__headline .text-reveal-wrapper {
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

/* Sub */
.hero__sub {
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  max-width: 500px;
  margin-bottom: 2.5rem;
}

/* CTA */
.hero__cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__cta .btn-primary {
  background: var(--color-white);
  color: #E73121;
}

.hero__cta .btn-primary:hover { background: rgba(255,255,255,0.90); }

.hero__cta .btn-outline {
  color: var(--color-white);
  border-color: rgba(255,255,255,0.50);
}

.hero__cta .btn-outline:hover {
  border-color: var(--color-white);
  background: rgba(255,255,255,0.10);
}

/* Scroll indicator */
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
  background: rgba(255, 255, 255, 0.25);
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

/* Mobile */
@media (max-width: 768px) {
  .hero__inner    { padding-top: 5rem; padding-bottom: 3rem; }
  .hero__wordmark { font-size: clamp(4.5rem, 18vw, 8rem); }

  /* Make blobs much larger on mobile portrait so they cover the area */
  .blob-1 { width: 140vw; height: 140vw; bottom: 0%; left: -20%; }
  .blob-2 { width: 120vw; height: 120vw; bottom: -5%; left: 10%; }
  .blob-3 { width: 150vw; height: 100vw; bottom: 10%; left: -10%; }
}
</style>
