import { createRouter, createWebHistory } from 'vue-router'

import GalleryView from '@/views/GalleryView.vue'
import HomeView from '@/views/HomeView.vue'
import FlatPageView from '@/views/FlatPageView.vue'
import EventsView from '@/views/EventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: { hideLogo: true },
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/:slug',
      component: FlatPageView,
    }
  ]
})

export default router
