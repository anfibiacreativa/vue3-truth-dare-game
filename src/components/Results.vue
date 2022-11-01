<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useCardStore } from '@/stores/CardStore';
import { onMounted } from 'vue';

const { players } = storeToRefs(usePlayerStore());
const { addTotalScores, resetPlayers } = usePlayerStore();
const { playAgain } = useCardStore();

function startOver() {
    // simple hack to reset the game
    // TODO: reset from the store
    window.location.reload();
}

</script>

<template>
    <section class="halloffame">
        <p class="winner info">🏆 And the winner is: 🏆</p>
        <p class="error info">There has been a draw!</p>
        <button class="button" @click="startOver">Play again</button>
    </section>
</template>
