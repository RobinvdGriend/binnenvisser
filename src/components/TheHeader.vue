<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header ref="header">
    <RouterLink to="/">
      <picture>
        <img class="md:hidden" src="@/assets/header-mobile.svg"/>
        <img class="hidden md:block" src="@/assets/header-desktop.svg"/>
      </picture>
    </RouterLink>
  </header>
</template>
