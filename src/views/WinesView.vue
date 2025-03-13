<script setup lang="ts">
import { groupBy, mapValues, filter } from 'lodash-es'

import { useBottles, useBottleLists } from '@/api/bottles'
import { computed, ref } from 'vue'
import { useWinePageDescription } from '@/api/winePage'

const { data: bottleLists } = useBottleLists()
const { data: rawBottles } = useBottles()
const { data: winePageData } = useWinePageDescription()

const userSelectedListId = ref<string | null>(null)

// We want to default to the first list if the user hasn't selected one
const selectedListId = computed(() =>
  userSelectedListId.value ? userSelectedListId.value : bottleLists.value?.[0].id
)

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
  <main class="flex h-full flex-col">
    <section
      class="rich-text bg-off-white"
      v-if="winePageData"
      v-html="winePageData.description"
    ></section>
    <div class="mb-5 grid grid-cols-2 gap-2">
      <button
        @click="userSelectedListId = bottleList.id"
        v-for="bottleList in bottleLists"
        :class="{
          'opacity-50': selectedListId !== bottleList.id
        }"
        class="flex flex-col border-b border-dark-green pb-1 align-top"
        :key="bottleList.id"
      >
        <h1>{{ bottleList.name }}</h1>
        <!-- <p class="text-balance text-xs">
            {{ bottleList.description }}
          </p> -->
      </button>
    </div>
    <div class="flex-shrink overflow-y-auto">
      <section class="mb-5" v-for="category in Object.keys(bottles)" :key="category">
        <h1 class="mb-1 gap-2 border-b-dark-green text-lg font-bold uppercase">
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
              <p class="ml-3 -indent-3">
                <span class=""> {{ bottle.name }}{{ bottle.year ? ` ${bottle.year}` : '' }}</span>
                <span class="whitespace-pre opacity-75"> — </span>
                <span class="opacity-75">
                  {{ bottle.info }}
                </span>
              </p>
            </section>
          </section>
        </section>
      </section>
    </div>
  </main>
</template>

<style lang="css" scoped></style>
