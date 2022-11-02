<script setup>
import { useCardStore } from '@/stores/CardStore';
import PlayerList from './components/PlayerList.vue';
import CardList from './components/CardList.vue';

useCardStore();
</script>

<template>
  <header>
  </header>
  <main class="main">
    <section class="section play">
      <h1 class="page-title">Welcome to our Truth and Dare Game</h1>
      <CardList />
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
