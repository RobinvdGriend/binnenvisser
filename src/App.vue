<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { breakpointsTailwind, useBreakpoints, useElementSize } from '@vueuse/core'
import { RouterView, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'

import TheHeader from './components/TheHeader.vue'
import TheMenu from './components/TheMenu.vue'
import TheInfo from './components/TheInfo.vue'
import TheLogo from './components/TheLogo.vue'
import MenuButton from './components/MenuButton.vue'

const hideLogo = ref<boolean>(false)

const lgBreakpoint = useBreakpoints(breakpointsTailwind).greater('lg')

const [mobileMenuShown, toggleMobileMenu] = useToggle(false)

const overlay = ref<HTMLElement | null>(null)
const overlayHeight = useElementSize(overlay, undefined, { box: 'border-box' }).height

useRouter().beforeEach((to) => {
  if (to.meta.hideLogo) {
    hideLogo.value = true
  } else {
    hideLogo.value = false
  }

  mobileMenuShown.value = false
})
</script>

<template>
  <div
    :style="{ 'margin-bottom': overlayHeight + 'px' }"
    class="mx-4 grid-cols-[1fr_3fr] grid-rows-[min-content_1fr] gap-x-4 leading-tight text-dark-green lg:grid lg:h-screen lg:grid-cols-4"
  >
    <MenuButton
      class="ml-auto mt-2 w-10 lg:hidden"
      @click="toggleMobileMenu()"
      :show-cross="mobileMenuShown"
    />
    <TheHeader class="col-span-full lg:mb-3" />
    <TheMenu v-show="mobileMenuShown || lgBreakpoint" class="mt-3 flex lg:mt-0" />
    <RouterView class="col-span-2 mb-4 mt-10 lg:mt-0" v-show="!mobileMenuShown || lgBreakpoint" />
    <div class="relative hidden lg:block">
      <div class="absolute bottom-0 mb-20 flex items-end">
        <TheInfo />
        <TheLogo class="ml-3 h-48" />
      </div>
    </div>
  </div>

  <div ref="overlay" class="fixed bottom-0 flex w-full flex-auto items-end lg:hidden">
    <RouterLink v-if="!hideLogo" to="/" class="m-4 block h-32">
      <TheLogo class="h-full" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
