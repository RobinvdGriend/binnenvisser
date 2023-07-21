<script setup lang="ts">
import { ref } from 'vue'

import type { InstagramFeedItem } from '@/types'
import { getInstagramFeed } from '@/api/instagramFeed'
import BaseImage from '@/components/BaseImage.vue'

const feed = ref<InstagramFeedItem[]>([])

getInstagramFeed().then((result) => {
  feed.value = result
})
</script>

<template>
  <main class="grid h-min grid-cols-2 gap-2 md:grid-cols-3">
    <article v-for="item in feed" :key="item.id">
      <a target="_blank" :href="item.permalink">
        <BaseImage class="aspect-square w-full object-cover" :src="item.mediaUrl" />
      </a>
    </article>
  </main>
</template>
