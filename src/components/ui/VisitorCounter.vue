<template>
  <div v-if="!hasError && (isLoading || pageviews !== null)" class="visitor-counter">
    <span class="visitor-counter__dot" />
    <span v-if="isLoading" class="visitor-counter__text">Loading stats…</span>
    <span v-else class="visitor-counter__text">
      {{ formattedPageviews }} visits · {{ formattedCtaClicks }} inquiries
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVisitorCounter } from '@/composables/useVisitorCounter.js'

const { pageviews, ctaClicks, isLoading, hasError } = useVisitorCounter()

const formattedPageviews = computed(() => (pageviews.value ?? 0).toLocaleString('en-US'))
const formattedCtaClicks = computed(() => (ctaClicks.value ?? 0).toLocaleString('en-US'))
</script>

<style scoped>
.visitor-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.4);
}

.visitor-counter__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
  animation: visitorPulse 2s ease-in-out infinite;
}

@keyframes visitorPulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}

.visitor-counter__text {
  white-space: nowrap;
}
</style>
