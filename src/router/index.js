import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/Explore.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    component: () => import('../views/Enterprise.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/Pricing.vue')
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('../views/Download.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
