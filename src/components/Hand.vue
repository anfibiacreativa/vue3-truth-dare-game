<script setup>
    import { storeToRefs } from 'pinia';
    import { usePlayerStore } from '@/stores/PlayerStore';

    defineProps({
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


</script>

<template>
    <div class="hand">
        <div v-for="card in player.cards" class="thumb"></div>
    </div>
    <div v-if="playerActive === player.name" class="info challenge">{{ challenge.text }}</div>
    <div v-if="playerActive === player.name" class="action-panel">
        <a href="#" role="button" class="action"  @click="acceptCard">Accept</a>
        <a href="#" role="button" class="action" @click="declineCard">Decline</a>
    </div>
</template>

