<script setup lang="ts">
import { groupBy, map, mapValues, uniq } from 'lodash-es'

import { useWineMakers } from '@/api/wineMakers'
import { useGrapes } from '@/api/grapes'
import { useBottles } from '@/api/bottles'
import { computed } from 'vue'

const { data: wineMakers } = useWineMakers()
const { data: grapes } = useGrapes()
const { data: rawBottles } = useBottles()

const grapesByCountry = computed(() => groupBy(grapes.value, (grape) => grape.country))
const countries = computed(() => uniq(map(grapes.value, (grape) => grape.country)).sort())

const bottles = computed(() => {
  const categoryGroup = groupBy(rawBottles.value, (bottle) => bottle.category.name)

  console.log(categoryGroup)

  const makerGroup = mapValues(categoryGroup, (bottles) => groupBy(bottles, 'maker'))

  return makerGroup
})
</script>

<template>
  <main>
    <p class="mb-6">
      we choose to work with artisan winemakers who farm without using any chemicals in the vines,
      and in this way trying to minimize the manipulation of the grapes in the cellar<br />
      <br />
      these produced wines reflect the vineyards' climate, soil and terrain
    </p>
    <div class="">
      <section class="mb-5" v-for="category in Object.keys(bottles)" :key="category">
        <h1 class="center mb-1 font-bold uppercase">{{ category }}</h1>
        <section class="mb-3" v-for="maker in Object.keys(bottles[category])" :key="maker">
          <h2 class="italic">{{ maker }}</h2>
          <section class="ml-3" v-for="bottle in bottles[category][maker]" :key="bottle.id">
            <p>
              <span class="">{{ bottle.name }}{{ bottle.year ? ` ${bottle.year}` : '' }}</span>
              <span class="opacity-75"> — {{ bottle.info }}{{ bottle.location ? `, ${bottle.location}` : '' }}</span>
            </p>
          </section>
        </section>
      </section>
    </div>
  </main>
</template>
