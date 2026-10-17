// ================================================
// Routes — di-export sebagai ARRAY (bukan instance router).
// vite-ssg yang bikin instance router-nya sendiri dari array ini,
// baik saat build (memory history) maupun di browser (web history).
// ================================================

import { waitForLeave } from '@/motion/pageTransition.js'
import { NAV_OFFSET } from '@/motion/tokens.js'
import { getLenis } from '@/composables/useLenis.js'

// Lazy-loaded views for performance
const HomeView = () => import('@/views/HomeView.vue')
const WorkDetailView = () => import('@/views/WorkDetailView.vue')

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Panlapan Creative Lab — Turning Ideas into Impactful Creations' }
  },
  {
    path: '/work/:slug',
    name: 'work-detail',
    component: WorkDetailView,
    meta: { title: 'Work — Panlapan Creative Lab' }
  },
  // Catch-all redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Dipisah supaya bisa dioper apa adanya ke ViteSSG di main.js
// Scroll baru dipasang setelah halaman lama selesai fade out (page transition),
// supaya user tidak melihat halaman lama lompat ke atas.
export async function scrollBehavior(to, from, savedPosition) {
  await waitForLeave()
  // Hentikan smooth scroll Lenis yang mungkin masih jalan (wheel/trackpad sebelum klik),
  // kalau tidak Lenis menimpa posisi scroll yang dipasang router di bawah ini.
  getLenis()?.scrollTo(window.scrollY, { immediate: true, force: true })
  if (savedPosition) return { ...savedPosition, behavior: 'instant' }
  const el = to.hash && document.querySelector(to.hash)
  if (el) return { top: layoutTop(el) - NAV_OFFSET, behavior: 'instant' }
  return { top: 0, left: 0, behavior: 'instant' }
}

// Posisi dari layout (offsetTop), bukan getBoundingClientRect: halaman baru
// sedang di-transform oleh animasi enter, jadi rect-nya masih bergeser.
function layoutTop(el) {
  let top = 0
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop
  return top
}

export default routes
