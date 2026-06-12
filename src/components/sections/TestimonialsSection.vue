<!--
  PAGE 8 — TESTIMONIALS
  Status: HIDDEN — data belum tersedia

  Cara aktifkan di HomeView.vue:
    1. Isi array testimonials[] di bawah dengan data nyata
    2. Tambah foto client: public/assets/images/testimonials/filename.jpg (200×200px)
    3. Uncomment <img> tag di template untuk setiap card
    4. Uncomment di HomeView.vue:
         <TestimonialsSection />
         import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
-->
<template>
  <section id="testimonials" class="testimonials section" ref="sectionRef">
    <div class="testimonials__inner">
      <div class="testimonials__header" ref="headerRef">
        <span class="eyebrow">Kind Words</span>
        <h2 class="testimonials__headline">Happy Customers</h2>
      </div>
      <div class="divider" />
      <div class="testimonials__grid" ref="gridRef">
        <div v-for="(item, i) in testimonials" :key="i" class="testimonials__card">
          <p class="testimonials__quote">"{{ item.quote }}"</p>
          <div class="testimonials__author">
            <div class="testimonials__avatar">
              <!--
                CLIENT PHOTO — file: public/assets/images/testimonials/{{ item.photo }}
                Size: 200×200px. Uncomment once photos are ready, remove placeholder <span>
              -->
              <span>{{ item.name.charAt(0) }}</span>
              <!--
              <img :src="`/assets/images/testimonials/${item.photo}`" :alt="item.name" />
              -->
            </div>
            <div>
              <p class="testimonials__name">{{ item.name }}</p>
              <p class="testimonials__role eyebrow">{{ item.role }}, {{ item.company }}</p>
            </div>
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
const headerRef  = ref(null)
const gridRef    = ref(null)

// TESTIMONIALS DATA PLACEHOLDER — replace with real data
// photo: filename only, place at: public/assets/images/testimonials/
const testimonials = [
  {
    quote:   'This partnership has effectively redefined our identity and product. Aligning them with our core values of scientific innovation and trustworthiness in the healthcare space.',
    name:    'Will Bruhn',
    role:    'Co-Founder',
    company: 'GAM',
    photo:   'will-bruhn.jpg',
  },
]

onMounted(() => {
  gsap.fromTo(headerRef.value?.querySelectorAll('.eyebrow, h2'),
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
  )
  const cards = gridRef.value?.querySelectorAll('.testimonials__card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.value, start: 'top 80%' } }
    )
  }
})
</script>

<style scoped>
.testimonials { padding: 7rem 2rem; }
.testimonials__inner  { max-width: 1400px; margin: 0 auto; }
.testimonials__header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2rem; }
.testimonials__headline { font-size: clamp(2.5rem,5vw,5rem); font-weight: 700; letter-spacing: -0.03em; }
.testimonials__grid   { margin-top: 3rem; display: grid; grid-template-columns: repeat(auto-fill,minmax(360px,1fr)); gap: 1.5rem; }
.testimonials__card   { padding: 2.5rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; background: rgba(255,255,255,0.02); display: flex; flex-direction: column; justify-content: space-between; gap: 2rem; transition: border-color 0.3s ease; }
.testimonials__card:hover { border-color: rgba(255,255,255,0.16); }
.testimonials__quote  { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.7); font-style: italic; }
.testimonials__author { display: flex; align-items: center; gap: 1rem; }
.testimonials__avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.5); flex-shrink: 0; overflow: hidden; }
.testimonials__avatar img { width: 100%; height: 100%; object-fit: cover; }
.testimonials__name   { font-size: 0.85rem; font-weight: 700; margin-bottom: 0.2rem; }
.testimonials__role   { color: rgba(255,255,255,0.35); }
@media (max-width:768px) {
  .testimonials       { padding: 5rem 1.5rem; }
  .testimonials__grid { grid-template-columns: 1fr; }
  .testimonials__header { flex-direction: column; gap: 1rem; }
}
</style>
