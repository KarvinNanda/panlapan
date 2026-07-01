<template>
  <section id="about" class="why section" ref="sectionRef">
    <div class="why__inner">

      <!-- Header -->
      <div class="why__header" ref="headerRef">
        <h2 class="why__title">Why panlapan</h2>
        <p class="why__subtitle">
          Strategy First.<br>
          Creativity Second.
        </p>
      </div>

      <!-- Zig-zag Q&A -->
      <div class="why__zigzag" ref="zigzagRef">
        <div class="why__qa why__qa--left">
          <span class="why__qa-label">Most agencies ask:</span>
          <p class="why__qa-text">"What do you want us to create?"</p>
        </div>
        <div class="why__qa why__qa--right">
          <span class="why__qa-label">We ask:</span>
          <p class="why__qa-text">"What business outcome are you trying to achieve?"</p>
        </div>
      </div>

    </div>

    <!-- Full-width gradient manifesto band -->
    <div class="why__band" ref="bandRef">
      <div class="why__band-inner">
        <p class="why__manifesto">
          Because great creative work<br>
          is not measured by how it looks.<br>
          It's measured<br>
          by what it accomplishes.
        </p>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef  = ref(null)
const zigzagRef  = ref(null)
const bandRef    = ref(null)

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      headerRef.value?.querySelectorAll('.why__title, .why__subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
    )

    // Q&A: left block slides from left, right block from right
    const leftQ  = zigzagRef.value?.querySelector('.why__qa--left')
    const rightQ = zigzagRef.value?.querySelector('.why__qa--right')
    if (leftQ) {
      gsap.fromTo(leftQ,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: zigzagRef.value, start: 'top 82%' } }
      )
    }
    if (rightQ) {
      gsap.fromTo(rightQ,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.18,
          scrollTrigger: { trigger: zigzagRef.value, start: 'top 82%' } }
      )
    }

    // Manifesto: word-by-word stagger
    const manifesto = bandRef.value?.querySelector('.why__manifesto')
    if (manifesto) {
      gsap.fromTo(manifesto,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: bandRef.value, start: 'top 75%' } }
      )
    }
  })
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
/* ── BASE ── */
.why {
  background: var(--color-black);
  overflow: hidden;
  padding: 0;
}

.why__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7rem 2rem 5rem;
}

/* ── Header ── */
.why__header {
  margin-bottom: 5rem;
}

.why__title {
  font-size: clamp(1.6rem, 10vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: 1.25rem;
}

.why__subtitle {
  font-size: clamp(2.4rem, 3.5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-white);
}

/* ── Zig-zag Q&A ── */
.why__zigzag {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.why__qa {
  display: flex;
  flex-direction: column;
  /* gap: 0.4rem; */
  max-width: 60%;
}

.why__qa--right {
  align-self: flex-end;
  text-align: right;
}

.why__qa-label {
  font-size: clamp(1.1rem, 2vw, 1.75rem);
  font-weight: 400;
  color: var(--color-white);
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin-bottom: 0;
}

.why__qa-text {
  font-size: clamp(1.1rem, 2vw, 1.75rem);
  font-weight: 400;
  color: var(--color-white);
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.why__qa-text--ours {
  color: #E73121;
}

/* ── Gradient band ── */
.why__band {
  width: 100%;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #E73121 50%,
    #E73121 50%,
    #000000 100%
  );
  padding: 7rem 2rem;
  margin-top: -5rem;
}

.why__band-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.why__manifesto {
  font-size: clamp(1.5rem, 3.2vw, 3rem);
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-white);
  letter-spacing: -0.02em;
}

/* ── TABLET ── */
@media (max-width: 1024px) {
  .why__qa { max-width: 65%; }
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .why__inner {
    padding: 5rem 1.5rem 4rem;
  }

  .why__header {
    margin-bottom: 3.5rem;
  }

  .why__title {
    font-size: clamp(1.3rem, 10vw, 3rem);
    margin-bottom: 1rem;
  }

  .why__subtitle {
    font-size: clamp(2rem, 5vw, 3rem);
  }

  .why__zigzag {
    gap: 2.5rem;
  }

  .why__qa { max-width: 85%; }
  .why__qa-label { font-size: clamp(1rem, 4.5vw, 1.4rem); }
  .why__qa-text  { font-size: clamp(1rem, 4.5vw, 1.4rem); }

  .why__band {
    padding: 5rem 1.5rem;
    margin-top: -3.5rem;
  }

  .why__manifesto {
    font-size: clamp(1.2rem, 5.5vw, 1.8rem);
  }
}
</style>
