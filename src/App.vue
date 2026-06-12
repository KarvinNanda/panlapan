<template>
  <div id="app-wrapper">
    <!-- Custom cursor (desktop only) -->
    <CustomCursor />

    <!-- Navigation -->
    <TheNavbar />

    <!-- Page transition wrapper -->
    <RouterView v-slot="{ Component, route }">
      <Transition
        :name="route.meta.transition || 'wipe'"
        mode="out-in"
        @enter="onEnter"
        @leave="onLeave"
      >
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/ui/CustomCursor.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useLenis } from '@/composables/useLenis.js'

useLenis()

const route = useRoute()

// On every route change: scroll to top + refresh stale ScrollTriggers
watch(() => route.path, () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)
})

const onLeave = (el, done) => {
  gsap.to(el, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 0.6,
    ease: 'power4.inOut',
    onComplete: done
  })
}

const onEnter = (el, done) => {
  gsap.fromTo(el,
    { clipPath: 'inset(100% 0 0% 0)', opacity: 1 },
    {
      clipPath: 'inset(0% 0 0% 0)',
      duration: 0.7,
      ease: 'power4.out',
      onComplete: done
    }
  )
}
</script>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* Cinematic wipe transition */
.wipe-enter-active,
.wipe-leave-active {
  transition: none; /* GSAP handles it */
  will-change: clip-path;
}
</style>
