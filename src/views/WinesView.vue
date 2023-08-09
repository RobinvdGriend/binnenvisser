<script setup lang="ts">
import { groupBy, map, uniq } from 'lodash-es'

import { useWineMakers } from '@/api/wineMakers'
import { useGrapes } from '@/api/grapes'
import { computed } from 'vue'

const { data: wineMakers } = useWineMakers()
const { data: grapes } = useGrapes()

const grapesByCountry = computed(() => groupBy(grapes.value, (grape) => grape.country))
const countries = computed(() => uniq(map(grapes.value, (grape) => grape.country)).sort())
</script>

<template>
  <main>
    <p class="mb-6">
      we choose to work with artisan winemakers who farm without using any chemicals in the vines,
      and in this way trying to minimize the manipulation of the grapes in the cellar<br />
      <br />
      these produced wines reflect the vineyards' climate, soil and terrain
    </p>
    <div class="grid grid-cols-2 gap-4">
      <section>
        <h1 class="mb-4">makers:</h1>
        <p v-for="maker in wineMakers" :key="maker.id">{{ maker.name }}</p>
      </section>
      <section>
        <h1 class="mb-4">grapes:</h1>
        <section class="mb-4" v-for="country in countries" :key="country">
          <h2 class="uppercase">{{ country }}</h2>
          <p v-for="grape in grapesByCountry[country]" :key="grape.id">{{ grape.name }}</p>
        </section>
      </section>
    </div>
  </main>
</template>
