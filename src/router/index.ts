import { createRouter, createWebHistory } from 'vue-router'

import GalleryView from '@/views/GalleryView.vue'
import HomeView from '@/views/HomeView.vue'
import FlatPageView from '@/views/FlatPageView.vue'
import EventsView from '@/views/EventsView.vue'
import MenuView from '@/views/MenuView.vue'
import WinesView from '@/views/WinesView.vue'

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
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/wines',
      name: 'wines',
      component: WinesView,
    },
    {
      path: '/:slug',
      component: FlatPageView,
    }
  ]
})

export default router
