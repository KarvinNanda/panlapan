<template>
  <section id="connect" class="cta section" ref="sectionRef">
    <div class="cta__inner">
      <!-- Marquee ticker -->
      <div class="cta__marquee" ref="marqueeRef" aria-hidden="true">
        <div class="cta__marquee-track" ref="trackRef">
          <span v-for="n in 8" :key="n" class="cta__marquee-item">
            Let's Chat <span class="cta__marquee-dot">·</span>
          </span>
        </div>
      </div>

      <!-- Main CTA block -->
      <div class="cta__block" ref="blockRef">
        <!-- Gradient orb -->
        <div class="cta__orb" />

        <div class="cta__text">
          <span class="eyebrow" ref="eyebrowRef">Get in Touch</span>
          <h2 class="cta__headline" ref="headlineRef">
            Let's Build Something<br>
            <span class="cta__headline--italic">That Works.</span>
          </h2>
          <p class="cta__sub" ref="subRef">
            Not just something that looks good.<br>
            Not just something that gets attention.<br>
            <em>Something that creates real business impact.</em>
          </p>
        </div>

        <!-- Big connect button -->
        <a
          href="mailto:hello@panlapan.com"
          class="cta__connect-btn"
          ref="btnRef"
          data-cursor-hover
        >
          <div class="cta__connect-btn-inner">
            <span>Start Your Journey</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 18L18 2M18 2H6M18 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const blockRef = ref(null)
const eyebrowRef = ref(null)
const headlineRef = ref(null)
const subRef = ref(null)
const btnRef = ref(null)
const marqueeRef = ref(null)
const trackRef = ref(null)

onMounted(() => {
  // Marquee animation
  if (trackRef.value) {
    const trackWidth = trackRef.value.scrollWidth / 2
    gsap.to(trackRef.value, {
      x: -trackWidth,
      duration: 20,
      ease: 'none',
      repeat: -1
    })
  }

  // Block entrance
  gsap.fromTo(
    [eyebrowRef.value, headlineRef.value, subRef.value, btnRef.value],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: blockRef.value, start: 'top 75%' }
    }
  )
})
</script>

<style scoped>
.cta {
  padding: 7rem 2rem;
  overflow: hidden;
  position: relative;
}

/* Full section background gradient — merah oranye di atas, fade ke hitam */
.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(200, 60, 20, 0.18) 0%,
    rgba(160, 40, 10, 0.10) 40%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 0;
}

.cta__inner {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Marquee */
.cta__marquee {
  overflow: hidden;
  margin-bottom: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.75rem 0;
}

.cta__marquee-track {
  display: flex;
  gap: 2rem;
  white-space: nowrap;
}

.cta__marquee-item {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;
}

.cta__marquee-dot {
  color: rgba(255, 255, 255, 0.15);
}

/* Main block */
.cta__block {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
}

/* Gradient orb */
.cta__orb {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  padding-bottom: 40%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(220, 80,  30, 0.50) 0%,
    rgba(180, 50,  10, 0.30) 40%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
}

/* Text */
.cta__text {
  position: relative;
  z-index: 2;
}

.cta__headline {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 1rem 0 1.5rem;
  line-height: 1.05;
}

.cta__headline--italic {
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.55);
}

.cta__sub {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.9;
}

.cta__sub em {
  font-style: italic;
  color: rgba(255, 255, 255, 0.75);
}

/* Connect button */
.cta__connect-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  position: relative;
  z-index: 2;
  justify-self: center;
}

.cta__connect-btn-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--color-white);
  color: var(--color-black);
  font-family: var(--font-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.4s ease;
  justify-content: center;
}

.cta__connect-btn:hover .cta__connect-btn-inner {
  transform: scale(1.06);
  box-shadow: 0 20px 60px rgba(255, 255, 255, 0.15);
}

@media (max-width: 900px) {
  .cta__block {
    grid-template-columns: 1fr;
    padding: 2.5rem;
  }

  .cta__connect-btn {
    justify-self: flex-start;
  }
}

@media (max-width: 768px) {
  .cta {
    padding: 5rem 1.5rem;
  }
}
</style>
