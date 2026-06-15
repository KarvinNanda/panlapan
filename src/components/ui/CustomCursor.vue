<template>
  <div>
    <div ref="dotRef" class="cursor-dot" />
    <div ref="ringRef" class="cursor-ring">
      <span ref="textRef" class="cursor-text"></span>
    </div>
  </div>
</template>

<script setup>
import { useCustomCursor } from '@/composables/useCustomCursor'

const { dotRef, ringRef, textRef } = useCustomCursor()
</script>
