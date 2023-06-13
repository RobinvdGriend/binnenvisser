<script setup lang="ts">
import MenuItem from './MenuItem.vue'
</script>

<template>
  <nav class="flex flex-col items-end text-4xl leading-tight">
    <MenuItem to="/">home</MenuItem>
    <MenuItem to="/">info</MenuItem>
    <MenuItem to="/">group reservations</MenuItem>
    <MenuItem to="/">menu</MenuItem>
    <MenuItem to="/">jobs</MenuItem>
    <MenuItem to="/">gallery</MenuItem>
  </nav>
</template>
