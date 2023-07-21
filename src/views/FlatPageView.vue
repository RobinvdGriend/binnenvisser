<script setup lang="ts">
import type { Ref } from 'vue'
import { useRouteParams } from '@vueuse/router'

import { useFlatPage } from '@/api/flatPages'

const slug = useRouteParams('slug')
const { data } = useFlatPage(slug as Ref<string | null>)
</script>

<template>
  <main class="col-span-2 grid-cols-2 gap-4 lg:grid">
    <div class="rich-text" v-html="data?.content" />
  </main>
</template>
