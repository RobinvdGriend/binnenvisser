<script setup lang="ts">
import { useHome } from '@/api/home'

const { data } = useHome()
</script>

<template>
  <main class="lg:contents">
    <section class="rich-text" v-if="data" v-html="data.content"></section>
    <section class="text-center">
      <p>upcoming events:</p>
      <article class="mt-4">
        <p class="font-bold">sun. 26–mon. 27 march, 10:00 - 18:00</p>
        <p>the dusty knuckle bakery, london, popup at binnenvisser and loof</p>
      </article>
      <article class="mt-4">
        <p class="font-bold">sun. 26–mon. 27 march, 10:00 - 18:00</p>
        <p>the dusty knuckle bakery, london, popup at binnenvisser and loof</p>
      </article>
    </section>
  </main>
</template>
