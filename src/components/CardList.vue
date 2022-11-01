<script setup>
    import { storeToRefs } from 'pinia';
    import { useCardStore } from '@/stores/CardStore';
    import { usePlayerStore } from '@/stores/PlayerStore';
    import Card from './Card.vue';
    import Results from './Results.vue';

    defineProps({
        card: {
            type: Object
        },
        cards: {
            type: Array
        },
        isPlaying: false
    });

    const { cards, isLoading, error, isGameOver } = storeToRefs(useCardStore());
    const { fetchCards } = useCardStore();
    const { setActivePlayer } = usePlayerStore(); 
    const { players, playerActive, challenge } = storeToRefs(usePlayerStore());
    const url = '/api/cards';

    function getCardList(e) {
        setActivePlayer();
        let type = e.target.value;
        console.log(type, '#type from button');
        let param = 'type=';
        fetchCards(url, `${param}${type}`).then(() => {
            console.log({ cards, isLoading, error }, '#cards, loading, error');
        }).catch(err => {
            throw new Error(err);
        });
    }
</script>

<template>
    <div class="panel">
        <button :disabled="players.length < 2 || challenge.active || isGameOver" class="button" value="1" @click="getCardList">
            Say the truth, ok? 🥹
        </button>
        <button :disabled="players.length < 2 || challenge.active || isGameOver" class="button" value="2" @click="getCardList">
            Dare to play! 😈
        </button>
    </div>
    {{ isGameOver }}
    <div v-if="!this.isGameOver">
        <p class="error.info" v-if="players.length < 2">Add at least 2 players to get cards!</p>
        <p class="info" v-if="playerActive !== ''" >Now playing {{ playerActive }}</p>
        <p class="error" v-if="playerActive && !challenge.active">Choose wisely, {{ playerActive }}! You only have one chance per hand.</p>
        <p class="info" v-if="isLoading">Loading cards...Please wait.</p>
    </div>
    <Results v-if="isGameOver" />
    <ul class="wrapper card-results">
        <li class="card-item" v-for="(card, index) of cards" :key="index">
            <Card v-bind:card=card />
        </li> 
    </ul>
    {{ challenge }}
    {{ players }}
</template>