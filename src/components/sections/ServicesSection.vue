<template>
  <section id="services" class="services section" ref="sectionRef">
    <div class="services__inner">

      <div class="services__header" ref="headerRef">
        <span class="eyebrow">What We Do</span>
        <h2 class="services__headline">Services</h2>
      </div>

      <div class="divider" ref="dividerRef" />

      <div class="services__grid" ref="gridRef">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="service-item"
        >
          <div class="service-item__header">
            <span class="service-item__index eyebrow">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="service-item__title">{{ service.title }}</h3>
          </div>

          <p class="service-item__desc">{{ service.description }}</p>

          <ul class="service-item__list">
            <li v-for="item in service.items" :key="item" class="service-item__list-item">
              {{ item }}
            </li>
          </ul>
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
const headerRef  = ref(null)
const dividerRef = ref(null)
const gridRef    = ref(null)

const services = [
  {
    title: 'Brand Strategy & Identity',
    description: 'Build a brand people recognize, trust, and choose.',
    items: ['Brand Strategy', 'Brand Positioning', 'Brand Identity', 'Rebranding', 'Brand Guidelines', 'Packaging Design']
  },
  {
    title: 'Creative & Content',
    description: 'Create stories that attract attention and drive action.',
    items: ['Social Media Management', 'Content Strategy', 'Copywriting', 'Campaign Development', 'Video Production', 'KOL & Influencer Management']
  },
  {
    title: 'Digital Experiences',
    description: 'Build digital platforms that convert.',
    items: ['Website Design & Development', 'Landing Pages', 'Booking Systems', 'UI/UX Design', 'Marketing Automation', 'CRM Integration']
  },
  {
    title: 'Events & Activations',
    description: 'Turn audiences into communities.',
    items: ['Event Management', 'Brand Activations', 'Sponsorship Strategy', 'Community Programs', 'Experiential Marketing']
  },
  {
    title: 'Creative Production',
    description: 'Bring ideas into the real world.',
    items: ['Graphic Design', 'Motion Graphics', 'Illustration', 'Merchandise Design', 'Environmental Branding', 'Presentation Deck Design']
  }
]

onMounted(() => {
  gsap.fromTo(
    headerRef.value?.querySelectorAll('.eyebrow, h2'),
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
  )
  gsap.fromTo(dividerRef.value,
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 1.2, ease: 'power4.inOut',
      scrollTrigger: { trigger: dividerRef.value, start: 'top 85%' } }
  )
  const items = gridRef.value?.querySelectorAll('.service-item')
  if (items?.length) {
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.value, start: 'top 80%' } }
    )
  }
})
</script>

<style scoped>
.services { padding: 7rem 2rem; }
.services__inner { max-width: 1400px; margin: 0 auto; }
.services__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.services__headline {
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}
.services__grid { margin-top: 2rem; display: flex; flex-direction: column; }
.service-item {
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: padding-left 0.4s ease;
}
.service-item:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
.service-item:hover        { padding-left: 0.5rem; }
.service-item__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
}
.service-item__index { flex-shrink: 0; min-width: 2rem; }
.service-item__title {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  flex: 1;
  transition: color 0.3s ease;
}
.service-item:hover .service-item__title { color: rgba(255,255,255,0.7); }
.service-item__desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-left: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.7;
}
.service-item__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-left: 3.5rem;
}
.service-item__list-item {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px;
  transition: all 0.3s ease;
}
.service-item:hover .service-item__list-item {
  color: rgba(255,255,255,0.5);
  border-color: rgba(255,255,255,0.2);
}
@media (max-width: 768px) {
  .services { padding: 5rem 1.5rem; }
  .services__header { flex-direction: column; gap: 1rem; }
  .service-item__desc,
  .service-item__list { margin-left: 0; }
}
</style>
