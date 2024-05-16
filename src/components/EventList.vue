<template>
  <h1 class="commandbar-explore">Events for Good</h1>
  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      :id="event.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EventItem } from '../types';

import EventCard from '../components/EventCard.vue';
import EventService from '../services/EventService';

const events = ref<EventItem[]>(null);

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
