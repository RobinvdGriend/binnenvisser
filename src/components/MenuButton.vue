<!-- eslint-disable tailwindcss/no-custom-classname -->

<script setup lang="ts">
const props = defineProps<{showCross: boolean}>()
</script>

<template>
  <button class="block">
    <svg class="show-cross-transition fill-brick-orange" :class="{'show-cross': props.showCross}" viewBox="0 0 100 100">
      <rect class="menu-button-top" x="0" y="26" height="6" width="100"/>
      <rect class="menu-button-middle" x="0" y="47" height="6" width="100"/>
      <rect class="menu-button-bottom" x="0" y="68" height="6" width="100"/>
    </svg>
  </button>
</template>

<style scoped>
.show-cross-transition > rect {
  transition: transform 0.3s ease-in-out, opacity 0.3s linear;
  transform-origin: center;
  transform-box: fill-box;
}
.show-cross .menu-button-top {
  transform: translate(0, 24px) rotate(-45deg);
}

.menu-button-middle {
  opacity: 1;
}

.show-cross .menu-button-middle {
  opacity: 0;
}

.show-cross .menu-button-bottom {
  transform: translate(0, -18px) rotate(45deg);
}
</style>