// ================================================
// Routes — di-export sebagai ARRAY (bukan instance router).
// vite-ssg yang bikin instance router-nya sendiri dari array ini,
// baik saat build (memory history) maupun di browser (web history).
// ================================================

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
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  return { top: 0, left: 0, behavior: 'instant' }
}

export default routes
