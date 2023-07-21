<script setup lang="ts">
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'

import type { Event } from '@/types'
import DirectusImage from '@/components/DirectusImage.vue'

const props = withDefaults(
  defineProps<{ event: Event; displayTime?: boolean; displayImage?: boolean }>(),
  {
    displayTime: true,
    displayImage: true
  }
)

function renderDate(dateString: string) {
  const date = zonedTimeToUtc(dateString, 'Europe/Amsterdam')
  return format(utcToZonedTime(date, 'Europe/Amsterdam'), 'EEE. d MMMM')
}

function renderTime(timeString: string) {
  const parts = timeString.split(':')
  return parts.slice(0, 2).join('.')
}

function renderSchedule(event: Event) {
  let result = renderDate(event.start_date)

  if (event.end_date) {
    result += `—${renderDate(event.end_date)}`
  }

  if (props.displayTime) {
    result += `, ${renderTime(event.start_time)}`

    if (event.end_time) {
      result += `—${renderTime(event.end_time)}`
    }
  }

  return result
}
</script>

<template>
  <article>
    <DirectusImage class="mb-3" v-if="props.event.image" :image="props.event.image" />
    <p class="font-bold lowercase">{{ renderSchedule(props.event) }}</p>
    <h1>{{ props.event.name }}</h1>
  </article>
</template>
