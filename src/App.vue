<template>
  <div id="app-wrapper">
    <!-- Page-load intro curtain -->
    <div class="intro-curtain" ref="introRef" v-if="showIntro">
      <div v-for="n in 5" :key="n" class="intro-curtain__panel" />
    </div>

    <!-- Custom cursor (desktop only) -->
    <CustomCursor />

    <!-- Navigation -->
    <TheNavbar />

    <!-- Page transition wrapper -->
    <RouterView v-slot="{ Component, route }">
      <Transition
        :css="false"
        mode="out-in"
        @leave="onLeave"
        @after-leave="onAfterLeave"
        @enter="onEnter"
        @after-enter="onAfterEnter"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import CustomCursor from '@/components/ui/CustomCursor.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useLenis } from '@/composables/useLenis.js'
import { posthog } from '@/main.js'
import { onLeave, onAfterLeave, onEnter, onAfterEnter } from '@/motion/pageTransition.js'

useLenis()

const route = useRoute()

const showIntro = ref(true)
const introRef  = ref(null)

onMounted(() => {
  const panels = introRef.value?.querySelectorAll('.intro-curtain__panel')
  if (panels?.length) {
    gsap.to(panels, {
      yPercent: -100,
      duration: 1.0,
      stagger: { amount: 0.3, from: 'center' },
      ease: 'power4.inOut',
      delay: 0.15,
      onComplete: () => { showIntro.value = false }
    })
  }

  // Capture pageview untuk initial load — route watch di bawah cuma
  // nangkep perpindahan halaman berikutnya (SPA), bukan load pertama
  if (posthog.__loaded) {
    posthog.capture('$pageview', { $current_url: window.location.href })
  }
})

// Scroll, kill trigger lama & refresh trigger baru diatur oleh page transition
// (src/motion/pageTransition.js) + router scrollBehavior, bukan di sini.
watch(() => route.path, (newPath, oldPath) => {
  if (!oldPath) return

  // Capture pageview ke PostHog setiap pindah halaman (SPA)
  if (posthog.__loaded) {
    posthog.capture('$pageview', { $current_url: window.location.href })
  }
})
</script>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* ── Intro curtain ── */
.intro-curtain {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  pointer-events: none;
}

.intro-curtain__panel {
  flex: 1;
  height: 100%;
  background: #111111;
  will-change: transform;
  transform-origin: top center;
}

/* Page transition: GSAP hooks di src/motion/pageTransition.js */
</style>
