<script setup>
    import { reactive } from 'vue';
    import { storeToRefs } from 'pinia';
    import { usePlayerStore } from '@/stores/PlayerStore';
    import { useCardStore } from '@/stores/CardStore';

    const props = defineProps({
        card: {
            type: Object,
            required: true
        },
    });

    const { addCardToPlayer, addCurrentChallenge, addHandPlayedToPlayer } = usePlayerStore();
    const { setCardisChallenge, updateAllCardsPlayed } = useCardStore();
    const { isChallengeActive } = storeToRefs(useCardStore());
    const state = reactive({
        index: 0,
        isFlipped: false,
    });

    function flipCard(e) {
        state.isFlipped = !state.isFlipped;
    }
    function chooseCard(e) {
        addCardToPlayer(props.card);
        addCurrentChallenge(props.card);
        state.isFlipped = false;
        setCardisChallenge();
        updateAllCardsPlayed(props.card);
        addHandPlayedToPlayer()
    }
</script>

<template>
    <div class="card-wrapper">
        <div class="card-flipper" v-bind:class="{ 'isFlipped': state.isFlipped }">
            <div class="card card-front" @mousedown="flipCard">
                <span>{{card.title}}</span>
            </div>
            <div class="card card-back" @mousedown="flipCard">
                <span class="isBlock">{{card.text}}</span>
            </div>
        </div>
        <button class="button small" :disabled="isChallengeActive" @click="chooseCard(card, e)">Choose</button>
    </div>
</template>