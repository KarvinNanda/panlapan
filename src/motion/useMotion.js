// ================================================
// useMotion — gsap.matchMedia wrapper per komponen
// setup() hanya jalan kalau user TIDAK minta reduced motion,
// dan semua tween/ScrollTrigger di dalamnya otomatis di-revert saat unmount.
// ================================================
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { MQ } from './tokens.js'

export function useMotion(scopeRef, setup) {
  let mm = null

  onMounted(() => {
    mm = gsap.matchMedia()
    mm.add({ motionOk: MQ.motionOk, reduce: MQ.reduce }, (ctx) => {
      if (ctx.conditions.motionOk) setup(ctx.conditions)
    }, scopeRef?.value)
  })

  onUnmounted(() => mm?.revert())
}
