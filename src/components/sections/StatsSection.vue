<!--
  PAGE 5 — CLIENT OUTCOMES (STATS)
  Status: HIDDEN — data belum tersedia

  Cara aktifkan di HomeView.vue:
    1. Isi array stats[] di bawah dengan angka nyata
    2. Uncomment di HomeView.vue:
         <StatsSection />
         import StatsSection from '@/components/sections/StatsSection.vue'
-->
<template>
  <section id="outcomes" class="stats section" ref="sectionRef">
    <div class="stats__inner">
      <div class="stats__header" ref="headerRef">
        <span class="eyebrow">Client Outcomes</span>
        <h2 class="stats__headline">Results That Speak.</h2>
      </div>
      <div class="divider" />
      <div class="stats__grid" ref="gridRef">
        <div v-for="stat in stats" :key="stat.label" class="stats__item">
          <div class="stats__value">{{ stat.value }}</div>
          <p class="stats__label">{{ stat.label }}</p>
          <p class="stats__sublabel eyebrow">{{ stat.sublabel }}</p>
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
const gridRef    = ref(null)

// DATA PLACEHOLDER — replace with real numbers
const stats = [
  { value: '$73M+', label: 'Total seed funding raised',  sublabel: 'Across client portfolio' },
  { value: '10x',   label: 'Increased revenue',          sublabel: 'Average client growth'   },
  { value: '784%',  label: 'Increased website traffic',  sublabel: 'Year-over-year'           },
]

onMounted(() => {
  gsap.fromTo(headerRef.value?.querySelectorAll('.eyebrow, h2'),
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
  )
  const items = gridRef.value?.querySelectorAll('.stats__item')
  if (items?.length) {
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.value, start: 'top 80%' } }
    )
  }
})
</script>

<style scoped>
.stats { padding: 7rem 2rem; }
.stats__inner    { max-width: 1400px; margin: 0 auto; }
.stats__header   { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2rem; }
.stats__headline { font-size: clamp(2rem, 4vw, 4rem); font-weight: 700; letter-spacing: -0.03em; }
.stats__grid     { margin-top: 4rem; display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 3rem; }
.stats__item     { padding: 2rem 0; border-right: 1px solid rgba(255,255,255,0.06); }
.stats__item:last-child { border-right: none; }
.stats__value    { font-size: clamp(3rem,6vw,6rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.75rem; }
.stats__label    { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 0.4rem; line-height: 1.5; }
.stats__sublabel { color: rgba(255,255,255,0.3); }
@media (max-width:768px) {
  .stats         { padding: 5rem 1.5rem; }
  .stats__grid   { grid-template-columns: 1fr; }
  .stats__item   { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1.5rem 0; }
  .stats__header { flex-direction: column; gap: 1rem; }
}
</style>
