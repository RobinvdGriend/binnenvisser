<script setup lang="ts">
import { useMenuCategories } from '@/api/menuItems'

function renderPrice(price: string) {
  const priceNumber = Number(price)

  if (isNaN(priceNumber)) {
    return price
  } else {
    return priceNumber
  }
}

const { data: menuCategories } = useMenuCategories()
</script>

<template>
  <main>
    <p class="mb-6">our menu changes seasonally and is therefore subject to daily alterations</p>
    <div class="lg:w-9/12">
      <template v-for="menuCategory in menuCategories" :key="menuCategory.id">
        <h1 v-if="!menuCategory.hide_category_name" class="font-bold uppercase">{{ menuCategory.name }}</h1>
        <table class="mb-8 w-full border-collapse">
          <colgroup>
            <col class="w-5/6" />
            <col class="w-1/6" />
          </colgroup>
          <tr v-for="menuItem in menuCategory.menu_items" :key="menuItem.id">
            <td class="pl-0">{{ menuItem.name }}</td>
            <td class="pl-2 align-top">{{ renderPrice(menuItem.price) }}</td>
          </tr>
        </table>
      </template>
    </div>
  </main>
</template>
