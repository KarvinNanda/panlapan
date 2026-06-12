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
</script>
