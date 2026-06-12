<template>
  <section id="approach" class="approach section" ref="sectionRef">
    <div class="approach__inner">
      <!-- Header -->
      <div class="approach__header" ref="headerRef">
        <span class="eyebrow">Our Approach</span>
        <h2 class="approach__headline">How We<br><span class="approach__headline--italic">Work</span></h2>
      </div>

      <!-- Process steps -->
      <div class="approach__steps" ref="stepsRef">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="approach__step"
          :ref="el => stepRefs[index] = el"
        >
          <!-- Step marker -->
          <div class="approach__step-marker">
            <div class="approach__step-dot" :class="{ 'is-active': activeStep === index }" />
            <div v-if="index < steps.length - 1" class="approach__step-connector" />
          </div>

          <!-- Step content -->
          <div class="approach__step-content">
            <div class="approach__step-header">
              <span class="approach__step-num eyebrow">{{ String(index + 1).padStart(2, '0') }}</span>
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
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef = ref(null)
const stepsRef = ref(null)
const stepRefs = ref([])
const activeStep = ref(0)

const steps = [
  {
    title: 'Understand',
    description: 'Your business, market, audience, and goals. We start with a deep brand discovery to define your mission, brand keywords, and market positioning.'
  },
  {
    title: 'Strategize',
    description: 'Define opportunities and create a clear direction. We map out the site structure and product user flow to create a solid foundation.'
  },
  {
    title: 'Create',
    description: 'Transform strategy into compelling creative solutions. We design your visual identity and roll it out across every touchpoint.'
  },
  {
    title: 'Execute',
    description: 'Deliver consistently across every touchpoint. We launch your website in Framer or Webflow, ensuring everything is cohesive.'
  },
  {
    title: 'Scale',
    description: 'Measure, optimize, and grow. We continue to work with you to ensure your brand evolves with your business.'
  }
]

onMounted(() => {
  // Header
  gsap.fromTo(
    headerRef.value?.querySelectorAll('.eyebrow, h2'),
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' }
    }
  )

  // Animate each step
  const stepEls = stepsRef.value?.querySelectorAll('.approach__step')
  if (stepEls?.length) {
    gsap.fromTo(stepEls,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.value, start: 'top 75%' }
      }
    )
  }

  // Connector line draws
  const connectors = stepsRef.value?.querySelectorAll('.approach__step-connector')
  connectors?.forEach((el, i) => {
    gsap.fromTo(el,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 0.6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%' },
        delay: i * 0.1
      }
    )
  })

  // Active step tracking on scroll
  ScrollTrigger.create({
    trigger: stepsRef.value,
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      const newStep = Math.floor(self.progress * steps.length)
      activeStep.value = Math.min(newStep, steps.length - 1)
    }
  })
})
</script>

<style scoped>
.approach {
  padding: 7rem 2rem;
  background: rgba(255, 255, 255, 0.02);
}

.approach__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: start;
}

/* Header */
.approach__header {
  position: sticky;
  top: 8rem;
}

.approach__headline {
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-top: 1rem;
  line-height: 1;
}

.approach__headline--italic {
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
}

/* Steps */
.approach__steps {
  display: flex;
  flex-direction: column;
}

.approach__step {
  display: flex;
  gap: 2rem;
  position: relative;
}

/* Marker */
.approach__step-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.25rem;
}

.approach__step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  transition: all 0.5s ease;
  flex-shrink: 0;
}

.approach__step-dot.is-active {
  background: var(--color-white);
  border-color: var(--color-white);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.approach__step-connector {
  width: 1px;
  flex: 1;
  min-height: 3rem;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
}

/* Content */
.approach__step-content {
  padding-bottom: 3rem;
}

.approach__step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.approach__step-num {
  font-size: 0.6rem;
}

.approach__step-title {
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.approach__step-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.8;
  max-width: 500px;
}

@media (max-width: 1024px) {
  .approach__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .approach__header {
    position: static;
  }
}

@media (max-width: 768px) {
  .approach {
    padding: 5rem 1.5rem;
  }

  .approach__step {
    gap: 1.2rem;
  }
}
</style>
