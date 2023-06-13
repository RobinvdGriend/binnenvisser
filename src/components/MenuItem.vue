<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{ to: RouteLocationRaw }>()
</script>
<template>
  <RouterLink :to="props.to"><slot /></RouterLink>
</template>
