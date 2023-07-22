<script setup lang="ts">
import { useHome } from '@/api/home'

const { data } = useHome()
</script>

<template>
  <main class="lg:grid lg:grid-cols-2 lg:gap-4">
    <section class="rich-text mb-4" v-if="data" v-html="data.content"></section>
  </main>
</template>
