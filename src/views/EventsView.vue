<script setup lang="ts">
import { computed, ref } from 'vue'
import { isBefore } from 'date-fns'

import type { Event } from '@/types'
import EventsItem from '@/components/EventsItem.vue'
import { useEvents } from '@/api/events'

const { data: events } = useEvents()

function eventHasPassed(event: Event) {
  if (event.end_date) {
    return !isBefore(new Date(), new Date(event.end_date))
  } else {
    return !isBefore(new Date(), new Date(event.start_date))
  }
}

const upcomingEvents = computed(
  () => events.value && events.value.filter((event) => !eventHasPassed(event))
)
const pastEvents = computed(
  () => events.value && events.value.filter((event) => eventHasPassed(event))
)
</script>

<template>
  <main class="text-center lg:text-left">
    <section class="mb-4">
      <h1 class="mb-4">upcoming events:</h1>
      <div class="grid grid-cols-2">
        <EventsItem v-for="event in upcomingEvents" :event="event" :key="event.id" />
      </div>
    </section>
    <section>
      <h1 class="mb-4">past events:</h1>
      <div class="grid grid-cols-2 gap-3">
        <EventsItem
          v-for="event in pastEvents"
          :event="event"
          :key="event.id"
          :display-time="false"
        />
      </div>
    </section>
  </main>
</template>
