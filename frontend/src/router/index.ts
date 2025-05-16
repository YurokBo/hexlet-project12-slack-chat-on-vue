import { createRouter, createWebHistory, RouteComponent, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const BASE_URL = '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: async (): Promise<RouteComponent> => await import('@/views/login/LoginPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: async (): Promise<RouteComponent> => await import('@/views/not-found/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

export default router
