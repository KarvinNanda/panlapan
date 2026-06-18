<template>
  <section id="approach" class="approach section" ref="sectionRef">
    <div class="approach__inner">

      <!-- Header -->
      <div class="approach__header" ref="headerRef">
        <h2 class="approach__headline">Our Approach</h2>
      </div>

      <!-- Steps -->
      <div class="approach__steps" ref="stepsRef">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="approach__step"
        >
          <!-- Kiri: nomor format (01) -->
          <span class="approach__step-num">
            ({{ String(index + 1).padStart(2, '0') }})
          </span>

          <!-- Kanan: icon + title, lalu desc di bawah -->
          <div class="approach__step-body">
            <div class="approach__step-heading">
              <component :is="step.icon" :size="22" class="approach__step-icon" stroke-width="1.5" />
              <h3 class="approach__step-title">{{ step.title }}</h3>
            </div>
            <p class="approach__step-desc">{{ step.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Lightbulb,
  Hourglass,
  Rocket,
  BadgeCheck,
  Package2
} from '@lucide/vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef  = ref(null)
const stepsRef   = ref(null)

const steps = [
  {
    title: 'Understand',
    description: 'Your business, market, audience, and goals.',
    icon: Lightbulb
  },
  {
    title: 'Strategize',
    description: 'Define opportunities and create a clear direction.',
    icon: Hourglass
  },
  {
    title: 'Create',
    description: 'Transform strategy into compelling creative solutions.',
    icon: Rocket
  },
  {
    title: 'Execute',
    description: 'Deliver consistently across every touchpoint.',
    icon: BadgeCheck
  },
  {
    title: 'Scale',
    description: 'Measure, optimize, and grow.',
    icon: Package2
  }
]

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      headerRef.value?.querySelector('h2'),
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
    )

    const stepEls = stepsRef.value?.querySelectorAll('.approach__step')
    if (stepEls?.length) {
      gsap.fromTo(stepEls,
        { opacity: 0, x: -40, y: 8 },
        { opacity: 1, x: 0, y: 0, stagger: 0.13, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.value, start: 'top 78%' } }
      )
    }
  })
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
/* ── DESKTOP ── */
.approach {
  padding: 7rem 2rem;
  background: var(--color-black);
}

.approach__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: start;
}

.approach__header { position: sticky; top: 8rem; }

.approach__headline {
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-white);
}

/* Steps list */
.approach__steps { display: flex; flex-direction: column; }

.approach__step {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.approach__step:first-child { border-top: 1px solid rgba(255, 255, 255, 0.08); }

/* Number — kiri */
.approach__step-num {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.05em;
  flex-shrink: 0;
  min-width: 3rem;
  padding-top: 0.15rem;
}

/* Body — kanan */
.approach__step-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Icon + Title inline */
.approach__step-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.approach__step-icon {
  color: var(--color-white);
  flex-shrink: 0;
}

.approach__step-title {
  font-size: clamp(1rem, 1.8vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-white);
}

.approach__step-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.50);
  line-height: 1.75;
  max-width: 480px;
}

/* ── TABLET ── */
@media (max-width: 1024px) {
  .approach__inner      { grid-template-columns: 1fr; gap: 3rem; }
  .approach__header     { position: static; }
  .approach__step-desc  { max-width: 100%; }
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .approach { padding: 5rem 1.5rem; }

  /* OUR APPROACH centered, besar */
  .approach__header { text-align: center; }
  .approach__headline {
    font-size: clamp(2.2rem, 11vw, 3.5rem);
    letter-spacing: -0.02em;
  }

  /* Step: jarak lebih rapat */
  .approach__step { gap: 1.5rem; padding: 2rem 0; }

  /* Number lebih kecil */
  .approach__step-num {
    font-size: 0.65rem;
    min-width: 2.5rem;
  }

  /* Desc lebih readable */
  .approach__step-desc {
    font-size: 0.80rem;
    max-width: 100%;
  }
}
</style>
