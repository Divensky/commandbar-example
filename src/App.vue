<script setup lang="ts">
import { onMounted } from 'vue';
import { init } from 'commandbar';
import router from './router';
import EventService from './services/EventService';
import { User, Metadata } from './types';

init('0854bf03', { debug: true });
const currentUser = 'irina8kats@gmail.com';

function displayUser(user: User) {
  alert(`User: ${user}`);
}

function displayEvent(args) {
  const argsString = JSON.stringify(args, null, 2);
  const eventDetails = JSON.parse(argsString).args;
  const formattedDetails = `
    ID: ${eventDetails.id}
    Category: ${eventDetails.category}
    Title: ${eventDetails.title}
    Description: ${eventDetails.description}
    Location: ${eventDetails.location}
    Date: ${eventDetails.date}
    Time: ${eventDetails.time}
    Organizer: ${eventDetails.organizer}
  `;

  alert(`Event Details:\n${formattedDetails}`);
}

async function onSearchEvents() {
  const response = await EventService.getEvents();
  return response.data;
}

onMounted(async () => {
  window.CommandBar.boot(currentUser).then(() => {
    window.CommandBar.addRouter(router.push);

    window.CommandBar.addArgumentChoices('events', [], {
      onInputChange: onSearchEvents,
      labelKey: 'title',
    });

    window.CommandBar.addCallback('displayEvent', displayEvent);
    window.CommandBar.addCommand({
      name: 'displayEvent',
      text: 'Search upcoming events',
      category: 'Welcome',
      icon: 'https://openmoji.org/data/color/svg/E250.svg',
      template: { type: 'callback', value: 'displayEvent' },
      arguments: {
        args: {
          order_key: 0,
          value: 'events',
          type: 'context',
          label: 'Event name',
        },
      },
    });

    window.CommandBar.addCallback('displayUser', displayUser);
    window.CommandBar.addRecordAction('users', {
      text: 'Tell me about user records',
      name: 'users',
      category: 'Welcome',
      icon: 'https://openmoji.org/data/color/svg/1F590.svg',
      arguments: {
        user: { order_key: 0, value: '', type: 'context' },
      },
    });

    window.CommandBar.addComponent('user-preview', 'Basic User Preview', {
      mount: (elem: HTMLElement) => ({
        render: (data: User, metadata: Metadata) => {
          console.log('rendering', data, metadata, elem);
          elem.innerHTML =
            '<div>' +
            '<h3>' +
            data.name +
            '</h3>' +
            '<div><img src="' +
            data.icon +
            '" /></div>' +
            '</div>';
        },
        unmount: (elem: HTMLElement) => {
          console.log('unmount', elem);
          // todo: clean up as needed
        },
      }),
    });

    window.CommandBar.addRecords(
      'users',
      [
        {
          name: 'Jane Smith',
          id: 1,
          icon: 'https://openmoji.org/data/color/svg/1F469-200D-2696-FE0F.svg',
        },
        {
          name: 'Jill Kelly',
          id: 2,
          icon: 'https://openmoji.org/data/color/svg/1F468-200D-1F4BC.svg',
        },
        {
          name: 'Jack Brown',
          id: 3,
          icon: 'https://openmoji.org/data/color/svg/1F468-200D-1F4BC.svg',
        },
      ],
      {
        detail: { type: 'component', value: 'user-preview' },
        labelKey: 'name',
        descriptionKey: 'id',
        recordOptions: {
          url: '/about',
        },
      },
    );
  });
});
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'Hello' }">Hello</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
