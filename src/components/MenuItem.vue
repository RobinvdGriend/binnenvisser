<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{ to: RouteLocationRaw }>()
</script>
<template>
  <RouterLink class="text-dark-red" :to="props.to"><slot /></RouterLink>
</template>
