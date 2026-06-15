<template>
  <section class="hero" ref="heroRef">
    <div class="hero__bg" />

    <div class="hero__inner">
      <!-- Ghost wordmark — barely visible, sama nuansa merah -->
      <div class="hero__wordmark" ref="wordmarkRef">panlapan</div>
       <h1 class="hero__headline" ref="headlineRef">
          <div class="text-reveal-wrapper">
            <span class="hero__line">turning ideas</span>
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
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const wordmarkRef = ref(null)
const headlineRef = ref(null)

onMounted(() => {
  const lines = headlineRef.value?.querySelectorAll('.hero__line')

  const tl = gsap.timeline({ delay: 0.1 })

  if (wordmarkRef.value) {
    gsap.set(wordmarkRef.value, { opacity: 0 })
    tl.to(wordmarkRef.value, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
  }

  if (lines?.length) {
    gsap.set(lines, { y: '110%', opacity: 0 })
    tl.to(lines, { y: '0%', opacity: 1, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.3)
  }
})
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

/* Red → hitam gradient */
.hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    #E73121 0%,
    #E73121 40%,
    #9B1A0E 65%,
    #3D0A05 82%,
    #000000 100%
  );
  z-index: 0;
}

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
  text-transform: lowercase;
}

.hero__line { display: block; }

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
}
</style>
