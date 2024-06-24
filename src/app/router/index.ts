import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
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
    let position = {}
    if (from === START_LOCATION && to.hash) {
      position = {
        el: to.hash,
        top: 90
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(position)
        }, 500)
      })
    } else if (to.hash) {
      position = {
        el: to.hash,
        top: 0
      }
    } else {
      position = { top: 0 }
    }
    return new Promise(resolve => {
      resolve(position)
    })

    // return new Promise((resolve) => {
    //   if (to.hash) {
    //     position = {
    //       el: to.hash,
    //       // offset: { top: 300 }
    //     }
    //     resolve(position)
    //   } else {
    //     position = { top: 0 }
    //     resolve(position)
    //   }
    // })
  }
})

Router.beforeEach(authGuard)

export default Router