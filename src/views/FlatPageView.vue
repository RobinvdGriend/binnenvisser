<script setup lang="ts">
import type { Ref } from 'vue'
import { useRouteParams } from '@vueuse/router'

import { useFlatPage } from '@/api/getFlatPage';


const slug = useRouteParams('slug');
const { data } = useFlatPage(slug as Ref<string | null>);
</script>

<template>
  <main class="rich-text" v-html="data?.content"/>
</template>