import { createRouter, createWebHistory } from 'vue-router'

import GalleryView from '@/views/GalleryView.vue'
import HomeView from '@/views/HomeView.vue'
import FlatPageView from '@/views/FlatPageView.vue'
import EventsView from '@/views/EventsView.vue'
import MenuView from '@/views/MenuView.vue'
import WinesView from '@/views/WinesView.vue'
import InfoView from '@/views/InfoView.vue'

import { useFormitable } from '@/composables/formitable'

const { widgetShown } = useFormitable()

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
      meta: { hideLogo: true }
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/wines',
      name: 'wines',
      component: WinesView
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView
    },
    {
      path: '/:slug',
      component: FlatPageView
    }
  ]
})

router.beforeEach((to) => {
  console.log(to.path)
  if (['/group-reservations', '/events'].includes(to.path)) {
    widgetShown.value = true
  } else {
    widgetShown.value = false
  }
})

export default router
