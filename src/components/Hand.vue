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
const { unsetCardisChallenge } = useCardStore();

const { 
    activatePlayer,
    deactivatePlayer,
    addScoreToPlayer,
    removeCurrentChallenge
} = usePlayerStore();

function succeed(e) {
    console.log('succeed', props.player.score);
    addScoreToPlayer(props.player.score);
    deactivatePlayer(props.player);
    removeCurrentChallenge();
    unsetCardisChallenge();
}

function fail(e) {
    console.log('fail');
    deactivatePlayer(props.player);
    removeCurrentChallenge();
    unsetCardisChallenge();
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

