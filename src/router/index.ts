import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../components/EventList.vue';
import EventCard from '../components/EventCard.vue';
import About from '../components/About.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventCard',
    props: true,
    component: EventCard,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/hello',
    name: 'Hello',
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
