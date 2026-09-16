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
// Kartu social 1200×630 belum ada di repo — lihat daftar placeholder.
const OG_IMAGE = '<<<ISI: URL absolut gambar Open Graph 1200×630 px untuk homepage, mis. https://panlapan.com/assets/images/og-home.jpg — filenya belum ada di public/assets/images/>>>'

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
</script>
