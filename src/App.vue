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
  <div class="hyphens-auto lowercase leading-tight text-dark-red">
    <TheHeader class="m-4" />
    <RouterView class="m-4" v-show="!mobileMenuShown" />
    <div class="fixed bottom-0 flex w-full flex-auto items-end justify-end">
      <TheMenu v-show="mobileMenuShown" class="mr-4 mb-3" />
      <img
        @click="toggleMobileMenu()"
        class="h-32 mb-4 mr-4"
        src="@/assets/logo.svg"
        alt="The logo of binnenvisser. A coiled spiral drawn with an ink pencil."
      />
    </div>
  </div>
</template>

<style scoped></style>
