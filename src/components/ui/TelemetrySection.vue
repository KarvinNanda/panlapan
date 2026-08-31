<template>
  <div v-if="!hasError" class="telemetry">
    <span class="telemetry__eyebrow">Live analytics</span>
    <h3 class="telemetry__title">Telemetry</h3>

    <div class="telemetry__grid">
      <div class="telemetry__card">
        <span class="telemetry__number">{{ isLoading ? '—' : formattedPageviews }}</span>
        <span class="telemetry__label">Page views · last 30 days</span>
      </div>
      <div class="telemetry__card">
        <span class="telemetry__number">{{ isLoading ? '—' : formattedCtaClicks }}</span>
        <span class="telemetry__label">Inquiries · last 30 days</span>
      </div>
    </div>

    <p class="telemetry__note">Via PostHog — page loads, not unique visitors</p>
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
.telemetry {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  width: 100%;
  padding-top: 1rem;
}

.telemetry__eyebrow {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: #4ade80;
}

.telemetry__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.telemetry__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 480px;
}

.telemetry__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}

.telemetry__number {
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 800;
  color: #4ade80;
  line-height: 1;
}

.telemetry__label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.01em;
}

.telemetry__note {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.75rem;
}

@media (max-width: 480px) {
  .telemetry__grid { gap: 0.75rem; }
  .telemetry__card { padding: 1.25rem 0.75rem; }
}
</style>
