import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views for performance
const HomeView = () => import('@/views/HomeView.vue')
const WorkDetailView = () => import('@/views/WorkDetailView.vue')

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

// Update page title on route change
router.beforeEach((to) => {
  document.title = to.meta.title || 'Panlapan Creative Lab'
})

export default router
