<template>
  <section id="about" class="why section" ref="sectionRef">
    <div class="why__inner">
      <!-- Eyebrow -->
      <span class="eyebrow" ref="eyebrowRef">Why Panlapan</span>

      <!-- Big statement -->
      <div class="why__statement" ref="statementRef">
        <h2 class="why__headline">
          Strategy First.<br>
          <span class="why__headline--italic">Creativity Second.</span>
        </h2>
      </div>

      <!-- Content split -->
      <div class="why__content" ref="contentRef">
        <div class="why__col why__col--left">
          <div class="why__question">
            <span class="eyebrow why__q-label">Most agencies ask:</span>
            <p class="why__q-text">"What do you want us to create?"</p>
          </div>
          <div class="why__question why__question--ours">
            <span class="eyebrow why__q-label">We ask:</span>
            <p class="why__q-text why__q-text--accent">"What business outcome are you trying to achieve?"</p>
          </div>
        </div>

        <div class="why__col why__col--right">
          <p class="why__manifesto">
            Because great creative work is not measured by how it looks.
            <em>It's measured by what it accomplishes.</em>
          </p>
          <RouterLink to="/#connect" class="btn-primary why__cta" data-cursor-hover>
            Work With Us
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const eyebrowRef = ref(null)
const statementRef = ref(null)
const contentRef = ref(null)

onMounted(() => {
  // Eyebrow
  gsap.fromTo(eyebrowRef.value,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: eyebrowRef.value, start: 'top 85%' }
    }
  )

  // Headline
  const lines = statementRef.value?.querySelectorAll('h2 > *')
  gsap.fromTo(statementRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: statementRef.value, start: 'top 80%' }
    }
  )

  // Content columns
  const cols = contentRef.value?.querySelectorAll('.why__col')
  gsap.fromTo(cols,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: contentRef.value, start: 'top 80%' }
    }
  )
})
</script>

<style scoped>
.why {
  padding: 7rem 2rem;
  overflow: hidden;
}

.why__inner {
  max-width: 1400px;
  margin: 0 auto;
}

.why__statement {
  margin: 1.5rem 0 5rem;
}

.why__headline {
  font-size: clamp(2.8rem, 6vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.why__headline--italic {
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
}

/* Content split */
.why__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 3rem;
}

/* Questions */
.why__col--left {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.why__q-label {
  display: block;
  margin-bottom: 0.5rem;
}

.why__q-text {
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  font-style: italic;
  line-height: 1.4;
}

.why__question--ours .why__q-label {
  color: rgba(255, 255, 255, 0.8);
}

.why__q-text--accent {
  color: var(--color-white);
  font-weight: 700;
  font-style: normal;
}

/* Right col */
.why__col--right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.why__manifesto {
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 2.5rem;
}

.why__manifesto em {
  font-style: italic;
  color: var(--color-white);
}

@media (max-width: 768px) {
  .why {
    padding: 5rem 1.5rem;
  }

  .why__content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
