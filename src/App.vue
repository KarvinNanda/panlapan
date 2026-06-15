<template>
  <div id="app-wrapper">
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
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/ui/CustomCursor.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useLenis } from '@/composables/useLenis.js'

useLenis()

const route = useRoute()

// On every route change: kill stale triggers → scroll to top → refresh after new page mounts
watch(() => route.path, (newPath, oldPath) => {
  if (!oldPath) return
  // Kill synchronously BEFORE Vue updates DOM (before new page components mount)
  ScrollTrigger.getAll().forEach(t => t.kill())
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  // Wait for leave transition (280ms) + component mount before refresh
  setTimeout(() => ScrollTrigger.refresh(), 500)
})
</script>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* Page transition — CSS-based, reliable across all browsers */
.page-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.page-enter-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>
