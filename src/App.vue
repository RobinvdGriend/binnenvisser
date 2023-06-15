<script setup lang="ts">
import { RouterView } from 'vue-router'
import { breakpointsTailwind, useBreakpoints, useToggle } from '@vueuse/core'

import TheHeader from './components/TheHeader.vue'
import { computed } from 'vue'
import TheMenu from './components/TheMenu.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const [mobileMenu, toggleMobileMenu] = useToggle(false)

const mobileMenuShown = computed(() => breakpoints.smallerOrEqual('md') && mobileMenu.value)
</script>

<template>
  <div
    class="mx-4 grid-cols-[1fr_3fr] gap-x-4 hyphens-auto lowercase leading-tight text-dark-red md:grid lg:grid-cols-4"
  >
    <TheHeader class="col-span-full my-3 mb-10 md:mb-3" />
    <TheMenu class="mb-3 mr-4 hidden md:flex" />
    <RouterView class="lg:contents" v-show="!mobileMenuShown" />
    <TheContactInfo />
  </div>
  <div class="fixed bottom-0 flex w-full flex-auto items-end justify-end">
    <TheMenu v-show="mobileMenuShown" class="mb-3 mr-4" />
    <img
      @click="toggleMobileMenu()"
      class="mb-4 mr-4 h-32"
      src="@/assets/logo.svg"
      alt="The logo of binnenvisser. A coiled spiral drawn with an ink pencil."
    />
  </div>
</template>

<style scoped></style>
