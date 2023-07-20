<script setup lang="ts">
import { computed } from 'vue'
import { getImageUrl } from '@/api/images'
import type { Image } from '@/types';
import BaseImage from '@/components/BaseImage.vue'

const props = defineProps<{image: Image}>()
const imageUrl = computed(() => getImageUrl(props.image.id, { width: 1000 }))
</script>

<template>
  <BaseImage :src="imageUrl" :alt="props.image.description ?? ''"/>
</template>
