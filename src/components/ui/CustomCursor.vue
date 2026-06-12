<template>
  <div>
    <div ref="dotRef" class="cursor-dot" />
    <div ref="ringRef" class="cursor-ring" />
  </div>
</template>

<script setup>
import { useCustomCursor } from '@/composables/useCustomCursor'

const { dotRef, ringRef } = useCustomCursor()
</script>
