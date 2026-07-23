<template>
  <section id="connect" class="cta section" ref="sectionRef">
    <div class="cta__inner">

      <!-- Main text block -->
      <div class="cta__text" ref="textRef">
        <h2 class="cta__headline">
          Let's Build Something<br>
          That Works.
        </h2>
        <p class="cta__body">
          Not just something that looks good.<br>
          Not just something that gets attention.
        </p>
        <p class="cta__impact">
          Something that creates<br>real business impact.
        </p>
      </div>

    </div>

    <!-- Full-width gradient band with CTA button -->
    <div class="cta__band" ref="bandRef">
      <a href="https://wa.me/6281234521089" target="_blank" rel="noopener" class="cta__btn" ref="ctaBtnRef" data-cursor-hover>
        Start Your Journey
      </a>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnet } from '@/composables/useMagnet.js'

gsap.registerPlugin(ScrollTrigger)

const { attach: magnet } = useMagnet(0.28)

const sectionRef = ref(null)
const textRef    = ref(null)
const bandRef    = ref(null)
const ctaBtnRef  = ref(null)

let ctx = null

onMounted(() => {
  magnet(ctaBtnRef.value)

  ctx = gsap.context(() => {
    gsap.fromTo(
      textRef.value?.querySelectorAll('.cta__headline, .cta__body, .cta__impact'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.value, start: 'top 80%' } }
    )
    gsap.fromTo(
      ctaBtnRef.value,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bandRef.value, start: 'top 85%' } }
    )
  })
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
/* ── BASE ── */
.cta {
  background: var(--color-black);
  padding: 0;
  overflow: hidden;
}

.cta__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7rem 2rem 5rem;
}

/* ── Text block ── */
.cta__headline {
  font-size: clamp(2.8rem, 7vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-white);
  margin-bottom: 2rem;
}

.cta__body {
  font-size: clamp(0.88rem, 1.6vw, 1rem);
  color: rgba(255, 255, 255, 0.52);
  line-height: 1.85;
  margin-bottom: 1.25rem;
  font-weight: 400;
}

.cta__impact {
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.5;
}

/* ── Gradient band ── */
.cta__band {
  width: 100%;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #E73121 50%,
    #E73121 50%,
    #000000 100%
  );
  padding: 7rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ── Liquid glass button ── */
.cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.75rem;
  background: rgba(217, 217, 217, 0.20);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.30);
  border-radius: 100px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(0, 0, 0, 0.12);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: all 0.35s ease;
  cursor: none;
}

.cta__btn:hover {
  background: rgba(217, 217, 217, 0.30);
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-2px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.30),
    inset 0 -1px 0 rgba(0, 0, 0, 0.12);
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .cta__inner {
    padding: 5rem 1.5rem 4rem;
  }

  .cta__headline {
    font-size: clamp(2.4rem, 9vw, 3.5rem);
    margin-bottom: 1.5rem;
  }

  .cta__band {
    padding: 5rem 1.5rem;
  }
}
</style>
