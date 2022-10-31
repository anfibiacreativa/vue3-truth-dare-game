<script setup>
    import { storeToRefs } from 'pinia';
    import { usePlayerStore } from '@/stores/PlayerStore';
    import { useCardStore } from '@/stores/CardStore';
    
    const props = defineProps({
        card: {
            type: Object
        },
        player: {
            type: Object
        },
        challenge: {
            type: Object
        }
});

const { players, playerActive, challenge } = storeToRefs(usePlayerStore());
const { unsetCardisChallenge, resetCards, endGame } = useCardStore();

const { 
    deactivatePlayer,
    addScoreToPlayer,
    removeCurrentChallenge
} = usePlayerStore();

function resetGame(player) {
    deactivatePlayer(player);
    removeCurrentChallenge();
    unsetCardisChallenge();
    resetCards();
}

function succeed(e) {
    console.log('succeed');
    addScoreToPlayer(1);
    resetGame(props.player);
    endGame(props.player.cards, players);
}

function fail(e) {
    console.log('fail');
    addScoreToPlayer(0);
    resetGame(props.player);
    endGame(props.player.cards, players);
}

</script>

<template>
    <div class="hand">
        <div v-for="card in player.cards" class="thumb"></div>
    </div>
    <div v-if="playerActive === player.name" class="info challenge">{{ challenge.text }}</div>
    <div v-if="playerActive === player.name" class="action-panel">
        <a href="#" role="button" class="action"  @click="succeed">Succeeded!</a>
        <a href="#" role="button" class="action" @click="fail">Failed :(</a>
    </div>
</template>

