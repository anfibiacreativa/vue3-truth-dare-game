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
const { setWinner } = usePlayerStore();

const { 
    deactivatePlayer,
    addScoreToPlayer,
    removeCurrentChallenge
} = usePlayerStore();

function resetGame(player) {
    const totalPlayers = players.value.length;
    deactivatePlayer(player);
    removeCurrentChallenge();
    unsetCardisChallenge();
    resetCards();
    endGame(totalPlayers);
    setWinner();
}

function succeed(e) {
    addScoreToPlayer(1);
    resetGame(props.player);
}

function fail(e) {
    addScoreToPlayer(0);
    resetGame(props.player);
}

</script>

<template>
    <div class="hand">
        <div v-for="card in player.round.hand" class="thumb"></div>
    </div>
    <div class="hand results">
        <div v-for="score in player.round.score" class="result" v-bind:class="score === 1 ? 'green': 'red'"></div>
    </div>
    <div v-if="playerActive === player.name" class="info challenge">{{ challenge.text }}</div>
    <div v-if="playerActive === player.name && challenge.active" class="action-panel">
        <button class="button action"  @click="succeed">Succeeded!</button>
        <button class="button action" @click="fail">Failed :(</button>
    </div>
</template>

