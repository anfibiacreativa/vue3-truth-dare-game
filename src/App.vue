<script setup>
import SearchBox from './components/SearchBox.vue';
import GetCards from './components/GetCards.vue';
import { useSearchStore } from '@/stores/SearchStore';

useSearchStore();
</script>

<template>
  <header>
  </header>
  <main class="main">
    <section class="section play">
      <GetCards />
    </section>
    <section class="section stats">
      <h2>Players</h2>
    </section>
  </main>
</template>

<style>
@import './assets/base.css';
@import './assets/theme.css';
</style>
