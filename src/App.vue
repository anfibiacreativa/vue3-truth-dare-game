<script setup>
import SearchBox from './components/SearchBox.vue';
import GetCards from './components/GetCards.vue';
import { useSearchStore } from '@/stores/SearchStore';

useSearchStore();
</script>

<template>
  <header>
  </header>
  <main>
    <GetCards />
  </main>
</template>

<style>
@import './assets/base.css';
@import './assets/theme.css';
</style>
