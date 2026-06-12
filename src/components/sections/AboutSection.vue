<!--
  PAGE 6 — ABOUT
  Status: HIDDEN — foto & bio belum tersedia

  Cara aktifkan di HomeView.vue:
    1. Tambah foto: public/assets/images/about-photo.jpg  (600×800px portrait)
    2. Update bio copy di bio{} object di bawah
    3. Uncomment <img> tag di template (dan hapus placeholder div)
    4. Uncomment di HomeView.vue:
         <AboutSection />
         import AboutSection from '@/components/sections/AboutSection.vue'
-->
<template>
  <section id="about-us" class="about section" ref="sectionRef">
    <div class="about__inner">
      <div class="about__text" ref="textRef">
        <span class="eyebrow">About Panlapan</span>
        <h2 class="about__headline">
          From Marketing<br>to Design
          <span class="about__headline--italic">Freedom</span>
        </h2>
        <p class="about__bio about__bio--lead">{{ bio.lead }}</p>
        <p class="about__bio">{{ bio.body }}</p>
        <p class="about__bio">{{ bio.closing }}</p>
        <div class="about__cta">
          <a href="#connect" class="btn-primary" @click.prevent="scrollToConnect">
            Let's Work Together
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="about__photo-wrap" ref="photoRef">
        <!--
          ABOUT PHOTO PLACEHOLDER
          Once photo is ready:
            1. Add file: public/assets/images/about-photo.jpg  (600×800px)
            2. Remove the placeholder div below
            3. Uncomment the <img> tag
        -->
        <div class="about__photo-placeholder">
          <span class="eyebrow">Photo coming soon</span>
        </div>
        <!--
        <img
          src="/assets/images/about-photo.jpg"
          alt="Panlapan Creative Lab"
          class="about__photo"
          loading="lazy"
        />
        -->
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
const textRef    = ref(null)
const photoRef   = ref(null)

// BIO COPY PLACEHOLDER — update with real text
const bio = {
  lead:    'I started in marketing but found my passion in design — solving problems creatively.',
  body:    'After cutting my teeth at a branding agency in London I built my one-person design business, gaining the freedom to travel and work globally.',
  closing: 'Today, I help startups and tech companies create brands and websites that stand out and scale.',
}

const scrollToConnect = () => {
  document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  gsap.fromTo(textRef.value?.querySelectorAll('.eyebrow, h2, p, div'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: textRef.value, start: 'top 80%' } }
  )
  gsap.fromTo(photoRef.value,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: photoRef.value, start: 'top 80%' } }
  )
})
</script>

<style scoped>
.about { padding: 7rem 2rem; }
.about__inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 6rem; align-items: center; }
.about__text  { display: flex; flex-direction: column; gap: 1.5rem; }
.about__headline { font-size: clamp(2.5rem,5vw,5rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
.about__headline--italic { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.45); }
.about__bio      { font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.8; }
.about__bio--lead { font-size: 1.1rem; color: rgba(255,255,255,0.8); }
.about__cta      { margin-top: 1rem; }
.about__photo-wrap { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 3/4; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
.about__photo    { width: 100%; height: 100%; object-fit: cover; display: block; }
.about__photo-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); }
@media (max-width:1024px) { .about__inner { grid-template-columns: 1fr; gap: 3rem; } .about__photo-wrap { max-width: 400px; } }
@media (max-width:768px)  { .about { padding: 5rem 1.5rem; } }
</style>
