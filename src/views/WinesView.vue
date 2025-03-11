<script setup lang="ts">
import { groupBy, map, mapValues, uniq, filter } from 'lodash-es'

import { useBottles, useBottleLists } from '@/api/bottles'
import { computed, ref } from 'vue'

const { data: bottleLists } = useBottleLists()
const { data: rawBottles } = useBottles()

const userSelectedListId = ref<string | null>(null)

// We want to default to the first list if the user hasn't selected one
const selectedListId = computed(() => userSelectedListId.value ? userSelectedListId.value : bottleLists.value?.[0].id)

const bottles = computed(() => {
  if (!bottleLists.value) {
    return {}
  }

  const categoryGroup = groupBy(
    filter(rawBottles.value, (bottle) => bottle.list == selectedListId.value),
    (bottle) => bottle.category.name
  )

  const locationGroup = mapValues(categoryGroup, (group) =>
    groupBy(group, (bottle) => bottle.location)
  )

  const makerGroup = mapValues(locationGroup, (category) =>
    mapValues(category, (location) => groupBy(location, 'maker'))
  )

  return makerGroup
})
</script>

<template>
  <main>
    <div class="mb-6">
      <p class="mb-3">
        since our opening in 2017 we have been passionate about showcasing the work of
        low-intervention winemakers.
      </p>

      <p class="mb-3">
        our carefully curated selection highlights small producers with a focus on sustainability in
        their farming and low-or-no intervention in their cellars.
      </p>

      <p class="mb-3">
        as these wines sometimes need time to be at their very best, we also age some of our cuvées
        for a few years in our climate controlled storage before releasing onto our lists at the
        restaurant— this way we hope to showcase great wines at their very best.
      </p>

      <p class="mb-3">
        we invite you to explore our selection and discover the wines we have loved since day one.
      </p>
    </div>
    <div class="">
      <div class="mb-5 grid grid-cols-2 gap-2">
        <button @click="userSelectedListId = bottleList.id" v-for="bottleList in bottleLists" :class="{
          'opacity-50': selectedListId !== bottleList.id
        }" class="border-b border-dark-green pb-1" :key="bottleList.id">
          <h1>{{ bottleList.name }}</h1>
          <p class="text-balance text-xs">
            {{ bottleList.description }}
          </p>
        </button>
      </div>
      <section class="mb-5" v-for="category in Object.keys(bottles)" :key="category">
        <h1
          class="mb-1 flex items-center gap-2 border-b-dark-green font-bold uppercase before:flex-1 before:border-b after:flex-1 after:border-b"
        >
          {{ category }}
        </h1>
        <section v-for="location in Object.keys(bottles[category])" :key="location">
          <h2 class="font-bold">{{ location }}</h2>
          <section
            class="mb-3"
            v-for="maker in Object.keys(bottles[category][location])"
            :key="maker"
          >
            <h3 class="italic">{{ maker }}</h3>
            <section
              class="ml-3"
              v-for="bottle in bottles[category][location][maker]"
              :key="bottle.id"
            >
              <p>
                <span class="">{{ bottle.name }}{{ bottle.year ? ` ${bottle.year}` : '' }}</span>
                <span class="opacity-75">
                  — {{ bottle.info }}{{ bottle.location ? `, ${bottle.location}` : '' }}</span
                >
              </p>
            </section>
          </section>
        </section>
      </section>
    </div>
  </main>
</template>

<style lang="css" scoped></style>
