<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useElementSize } from '@vueuse/core'
import { RouterView, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'

import TheHeader from './components/TheHeader.vue'
import TheMenu from './components/TheMenu.vue'
import MenuButton from './components/MenuButton.vue'

const hideLogo = ref<boolean>(false)

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
    class="mx-4 grid-cols-[1fr_3fr] gap-x-4 leading-tight text-dark-green lg:grid lg:grid-cols-4"
  >
    <MenuButton
      class="ml-auto mt-2 w-10"
      @click="toggleMobileMenu()"
      :show-cross="mobileMenuShown"
    />
    <TheHeader class="col-span-full md:mb-3" />
    <TheMenu v-show="mobileMenuShown" class="mt-3 flex" />
    <RouterView class="mb-4 mt-10" v-show="!mobileMenuShown" />
  </div>

  <div ref="overlay" class="fixed bottom-0 flex w-full flex-auto items-end">
    <RouterLink v-if="!hideLogo" to="/" class="m-4 block h-32">
      <img
        class="h-full"
        src="@/assets/logo.svg"
        alt="The logo of binnenvisser. A coiled spiral drawn with an ink pencil."
      />
    </RouterLink>
  </div>
</template>

<style scoped></style>
