import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { defineAsyncComponent } from 'vue'
import Loading from '@/components/molecule/Loading.vue'

const SearchPage = defineAsyncComponent({
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return import('@/pages/SearchPage.vue')
  },
  loadingComponent: Loading,
  delay: 0,
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE__URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
    },
  ],
})

export default router
