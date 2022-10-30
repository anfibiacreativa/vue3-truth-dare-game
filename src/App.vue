<script setup>
import SearchBox from './components/SearchBox.vue';
import GetCards from './components/GetCards.vue';
import { useSearchStore } from '@/stores/SearchStore';
import PlayerList from './components/PlayerList.vue';

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
      <PlayerList />
    </section>
  </main>
</template>

<style>
@import './assets/base.css';
@import './assets/theme.css';
</style>
