<script setup lang="ts">
import { ref } from 'vue';

const msg = 'Welcome!';
const count = ref(0);

const handleClick = () => {
  window.CommandBar.open();
  // console.log('shareCallbacks', window.CommandBar.shareCallbacks());
};

const handleContactClick = () =>
  window.CommandBar.trackEvent('contact_clicked', {});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" class="commandbar-button" @click="handleClick">
      Open CommandBar
    </button>
  </div>
  <div>
    <button type="button" class="commandbar-button" @click="handleContactClick">
      Contact us
    </button>
  </div>
  <div class="card">
    <p>Counter demo</p>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped></style>
