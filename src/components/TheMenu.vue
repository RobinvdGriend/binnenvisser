<script setup lang="ts">
import MenuItem from './MenuItem.vue'
</script>

<template>
  <nav
    class="flex flex-col items-end text-4xl leading-tight lg:items-start lg:text-base lg:leading-4"
  >
    <MenuItem to="/">home</MenuItem>
    <MenuItem class="lg:hidden" to="/info">info</MenuItem>
    <MenuItem to="/reservations">reservations</MenuItem>
    <MenuItem to="/menu">menu</MenuItem>
    <MenuItem to="/wines">wines</MenuItem>
    <MenuItem to="/jobs">jobs</MenuItem>
    <MenuItem to="/events">events</MenuItem>
    <MenuItem to="/gallery">gallery</MenuItem>
  </nav>
</template>
