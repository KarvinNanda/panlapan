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
      <Transition name="page" mode="out-in">
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
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/ui/CustomCursor.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useLenis } from '@/composables/useLenis.js'

useLenis()

const route = useRoute()

const showIntro = ref(true)
const introRef  = ref(null)

onMounted(() => {
  const panels = introRef.value?.querySelectorAll('.intro-curtain__panel')
  if (!panels?.length) return
  gsap.to(panels, {
    yPercent: -100,
    duration: 1.0,
    stagger: { amount: 0.3, from: 'center' },
    ease: 'power4.inOut',
    delay: 0.15,
    onComplete: () => { showIntro.value = false }
  })
})

// On every route change: kill stale triggers → scroll to top → refresh after new page mounts
watch(() => route.path, (newPath, oldPath) => {
  if (!oldPath) return
  // Kill synchronously BEFORE Vue updates DOM (before new page components mount)
  ScrollTrigger.getAll().forEach(t => t.kill())
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  // Wait for leave transition (500ms) + component mount before refresh
  setTimeout(() => ScrollTrigger.refresh(), 600)
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

/* Page transition — Premium Native App Feel */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s cubic-bezier(0.76, 0, 0.24, 1), 
              transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
