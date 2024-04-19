import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import { authGuard } from "@/shared/guard";

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { authRequired: false, scrollToTop: true },
      component: HomePage
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: { authRequired: true },
      component: () => import('@/pages/AdminPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      meta: { authRequired: false },
      component: () => import('@/pages/NotFoundPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash }
    }
    if (to.name === 'Home') {
      return { top: 0, left: 0 }
    }
  }
})

Router.beforeEach(authGuard)

export default Router