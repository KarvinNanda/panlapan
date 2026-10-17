<template>
  <!-- Hanya di-render untuk mouse (desktop). HP & tablet pakai behavior native. -->
  <div v-if="enabled" aria-hidden="true">
    <div ref="dotRef" class="cursor-dot" />
    <div ref="ringRef" class="cursor-ring">
      <div class="cursor-ring__circle">
        <span ref="textRef" class="cursor-text"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCustomCursor } from '@/composables/useCustomCursor'

const { enabled, dotRef, ringRef, textRef } = useCustomCursor()
</script>
