<script setup lang="ts">
import { useHome } from '@/api/home'
import { useEvents } from '@/api/events'
import EventsItem from '@/components/EventsItem.vue'

const { data } = useHome()
const { data: events } = useEvents({ onlyIncludeUpcomingEvents: true })
</script>

<template>
  <main class="lg:grid lg:grid-cols-2 lg:gap-4">
    <section class="rich-text mb-4" v-if="data" v-html="data.content"></section>
    <section class="text-center" v-if="events && events.length > 0">
      <RouterLink to="/events"><p class="mb-4">upcoming events:</p></RouterLink>
      <EventsItem v-for="event in events" :event="event" :key="event.id" :display-image="false" />
    </section>
  </main>
</template>
