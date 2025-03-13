<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { breakpointsTailwind, useBreakpoints, useElementSize } from '@vueuse/core'
import { RouterView, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'

import TheHeader from './components/TheHeader.vue'
import TheMenu from './components/TheMenu.vue'
import TheInfo from './components/TheInfo.vue'
import TheLogo from './components/TheLogo.vue'
import MenuButton from './components/MenuButton.vue'
import { useFormitable } from '@/composables/formitable'

const { widgetShown } = useFormitable()

const hideLogo = ref<boolean>(false)

const lgBreakpoint = useBreakpoints(breakpointsTailwind).greater('lg')

const [mobileMenuShown, toggleMobileMenu] = useToggle(false)

const overlay = ref<HTMLElement | null>(null)
const overlayHeight = useElementSize(overlay, undefined, { box: 'border-box' }).height

function formitableListener(eventName: string) {
  return function listener(e: any) {
    // @ts-ignore
    umami.trackEvent(eventName, e.detail)
  }
}

const widgetOrderedListener = formitableListener('formitable-widget-ordered')
const widgetNavigtedListener = formitableListener('formitable-widget-navigated')

// Register Formitabe events to Umami and cleanup after unmount
onMounted(() => window.addEventListener('ft-widget-ordered', widgetOrderedListener))
onBeforeUnmount(() => window.removeEventListener('ft-widget-ordered', widgetOrderedListener))

onMounted(() => window.addEventListener('ft-widget-ordered', widgetNavigtedListener))
onBeforeUnmount(() => window.removeEventListener('ft-widget-ordered', widgetNavigtedListener))

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
    class="grid-cols-[1fr_3fr] grid-rows-[min-content_1fr] gap-x-4 p-4 pt-2 leading-tight text-dark-green lg:grid lg:max-h-screen lg:grid-cols-4 lg:p-6 lg:pb-0"
  >
    <MenuButton
      class="ml-auto w-8 lg:hidden"
      @click="toggleMobileMenu()"
      :show-cross="mobileMenuShown"
    />
    <TheHeader class="col-span-full lg:mb-6" />
    <TheMenu v-show="mobileMenuShown || lgBreakpoint" class="mt-10 flex lg:mt-0" />
    <RouterView
      class="lg:scroll-stable col-span-2 mb-4 mt-10 lg:my-0 lg:overflow-y-auto lg:pb-4"
      v-show="!mobileMenuShown || lgBreakpoint"
    />
    <RouterLink to="/" v-show="!mobileMenuShown" class="lg:hidden">
      <TheLogo class="mt-10 h-32" />
    </RouterLink>

    <div
      class="fixed bottom-0 right-0 hidden w-1/4 items-end justify-end pr-6 lg:flex"
      :class="widgetShown ? 'mb-20' : 'mb-6'"
    >
      <TheInfo />
      <RouterLink class="shrink-0" to="/">
        <TheLogo class="ml-3 h-48" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
