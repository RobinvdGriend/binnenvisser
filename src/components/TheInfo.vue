<script setup lang="ts">
import { useInfo } from '@/api/info';

const { data: information } = useInfo()
</script>

<template>
  <section class="rich-text" v-html="information?.content"/>
</template>