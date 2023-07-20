<script setup lang="ts">
const props = defineProps<{ src: string; alt?: string }>()
</script>

<template>
  <img :src="props.src" :alt="props.alt" />
</template>
