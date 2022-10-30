<script setup>
import GetCards from './components/GetCards.vue';
import { useCardStore } from '@/stores/CardStore';
import PlayerList from './components/PlayerList.vue';

useCardStore();
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
