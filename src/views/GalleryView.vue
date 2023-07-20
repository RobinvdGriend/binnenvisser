<script setup lang="ts">
import type { InstagramFeedItem } from '@/types'
import { getInstagramFeed } from '@/api/getInstagramFeed'
import { ref } from 'vue'

const feed = ref<InstagramFeedItem[]>([])

getInstagramFeed().then((result) => {
  feed.value = result
})
</script>

<template>
  <main class="col-span-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:col-span-3">
    <article v-for="item in feed" :key="item.id"><img :src="item.mediaUrl" /></article>
  </main>
</template>
