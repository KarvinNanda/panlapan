<template>
  <main>
    <!-- ══════════════════════════════════════════════════════
         ACTIVE SECTIONS
    ══════════════════════════════════════════════════════ -->
    <HeroSection />
    <WorksSection />
    <ServicesSection />
    <ApproachSection />
    <WhySection />

    <!-- ══════════════════════════════════════════════════════
         HIDDEN SECTIONS — uncomment when data is ready

         Cara aktifkan:
           1. Uncomment <ComponentName /> di bawah
           2. Uncomment baris import-nya di <script setup>
           3. Pastikan data placeholder sudah diisi
    ══════════════════════════════════════════════════════ -->

    <!--
      PAGE 5 — Client Outcomes / Stats
      File: src/components/sections/StatsSection.vue
      Data: isi stats[] di file komponen tsb
    -->
    <!-- <StatsSection /> -->

    <!--
      PAGE 6 — About
      File: src/components/sections/AboutSection.vue
      Data: tambah foto → public/assets/images/about-photo.jpg (600×800px)
            update bio{} di file komponen tsb
    -->
    <!-- <AboutSection /> -->

    <!--
      PAGE 8 — Testimonials
      File: src/components/sections/TestimonialsSection.vue
      Data: isi testimonials[] di file komponen tsb
            tambah foto → public/assets/images/testimonials/*.jpg (200×200px)
    -->
    <!-- <TestimonialsSection /> -->

    <!-- ══════════════════════════════════════════════════════
         ACTIVE SECTIONS (continued)
    ══════════════════════════════════════════════════════ -->
    <CtaSection />
  </main>
</template>

<script setup>
import { useHead } from '@unhead/vue'

// ── Active ────────────────────────────────────────────────────
import HeroSection     from '@/components/sections/HeroSection.vue'
import WorksSection    from '@/components/sections/WorksSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ApproachSection from '@/components/sections/ApproachSection.vue'
import WhySection      from '@/components/sections/WhySection.vue'
import CtaSection      from '@/components/sections/CtaSection.vue'

// ── Hidden — uncomment when data is ready ─────────────────────
// import StatsSection        from '@/components/sections/StatsSection.vue'
// import AboutSection        from '@/components/sections/AboutSection.vue'
// import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'

// ── SEO ───────────────────────────────────────────────────────
const SITE  = 'https://panlapan.com'
const TITLE = 'Panlapan Creative Lab — Branding, Packaging & Photography'
const DESC  = 'Panlapan Creative Lab helps businesses build brands, create demand, and grow — through brand identity, packaging, interior, photography, and art direction.'
// sementara — ganti kalau kartu OG resmi dari designer sudah ada
// (di-generate oleh scripts/generate-og-image.js, 1200×630)
const OG_IMAGE = `${SITE}${encodeURI('/assets/images/og-home.jpg')}`

useHead({
  title: TITLE,
  meta: [
    { name: 'description', content: DESC },

    { property: 'og:type',        content: 'website' },
    { property: 'og:site_name',   content: 'Panlapan Creative Lab' },
    { property: 'og:title',       content: TITLE },
    { property: 'og:description', content: DESC },
    { property: 'og:url',         content: `${SITE}/` },
    { property: 'og:image',       content: OG_IMAGE },

    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:title',       content: TITLE },
    { name: 'twitter:description', content: DESC },
    { name: 'twitter:image',       content: OG_IMAGE },
  ],
  link: [
    { rel: 'canonical', href: `${SITE}/` },
  ],
})

// ── JSON-LD ───────────────────────────────────────────────────
// Semua nilai di bawah ini diambil dari yang MEMANG ada di repo:
//   email    → mailto: di TheFooter.vue
//   sameAs   → link sosmed di TheFooter.vue
//   logo     → Icon Logo Full Orange (Google menampilkan logo di atas putih,
//              jadi versi putih tidak terbaca; primary logo cuma ada versi putih)
//   knowsAbout → category + tags di src/data/projects.js
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Panlapan Creative Lab',
  url: SITE,
  logo: `${SITE}${encodeURI('/assets/images/6-9-2026 - Icon Logo Panlapan - Full Orange.png')}`,
  image: OG_IMAGE,
  description: DESC,
  slogan: 'Turning Ideas into Impactful Creations.',
  email: 'hello@panlapan.com',
  sameAs: [
    'https://www.instagram.com/panlapancreative/',
    'https://linkedin.com/company/panlapan',
  ],
  knowsAbout: [
    'Brand Strategy & Identity',
    'Packaging Design',
    'Interior Design',
    'Art Direction',
    'Photography',
    'Visual System',
    'Environmental Branding',
    'Product Photography',
    'Video Production',
  ],
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) },
  ],
})
</script>
