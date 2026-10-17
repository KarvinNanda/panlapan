// ================================================
// Page transition — JS hooks untuk <Transition mode="out-in"> di App.vue
// Halaman lama fade out cepat, halaman baru naik pelan.
// Scroll baru diubah SETELAH halaman lama hilang (lihat waitForLeave
// di router scrollBehavior), jadi tidak ada lompatan scroll yang kelihatan.
// ================================================
import { nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, DUR, MQ } from './tokens.js'

let leaving = null // { promise, resolve } selama halaman lama sedang fade out

const reduced = () => window.matchMedia(MQ.reduce).matches

export function onLeave(el, done) {
  // Navigasi baru saat leave sebelumnya belum selesai → lepaskan yang lama
  leaving?.resolve()
  let resolve
  const promise = new Promise(r => { resolve = r })
  leaving = { promise, resolve }

  // done() jangan dipanggil sinkron di dalam hook leave: Vue sedang patch,
  // update out-in yang dipicu di tengahnya hilang dan halaman baru tidak pernah mount.
  if (reduced()) return requestAnimationFrame(() => done())
  gsap.to(el, { opacity: 0, y: -12, duration: 0.26, ease: EASE.in, overwrite: true, onComplete: done })
}

export function onAfterLeave() {
  ScrollTrigger.getAll().forEach(t => t.kill())
  // Saat hook ini jalan, mount halaman baru baru di-queue oleh Vue.
  // Tunggu flush itu dulu supaya scrollBehavior menemukan konten halaman baru.
  const current = leaving
  nextTick(() => {
    current?.resolve()
    if (leaving === current) leaving = null
  })
}

export function waitForLeave() {
  return leaving ? leaving.promise : Promise.resolve()
}

export function onEnter(el, done) {
  if (reduced()) return done()
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    // clearProps wajib: <main> yang masih punya transform merusak position:fixed (progress bar detail)
    { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out, clearProps: 'transform,opacity', onComplete: done }
  )
}

export function onAfterEnter() {
  ScrollTrigger.refresh()
}
