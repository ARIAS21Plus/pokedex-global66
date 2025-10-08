import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
// import { defineAsyncComponent } from 'vue'

// const SearchView = defineAsyncComponent({
//   loader: () => import('../pages/SearchView.vue'),
//   loadingComponent: () => import('../components/molecule/Loading.vue'),
//   delay: 1000, // opcional: espera 200ms antes de mostrar el loader
//   timeout: 10000, // opcional: error si tarda más de 10s
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/SearchPage.vue'),
    },
  ],
})

export default router
