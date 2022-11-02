<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';

const { players } = storeToRefs(usePlayerStore());
const { totalScores, winnerName } = storeToRefs(usePlayerStore());

function startOver() {
    // simple hack to reset the game
    // TODO: reset from the store
    window.location.reload();
}

</script>

<template>
    <section class="halloffame">
        <p class="over">✨Game Over!✨</p>
        <h2>Final Scores</h2>
        <ul>
            <li v-for="score in totalScores" :key="score.name">
                <span>{{ score.name }}:</span>
                <span> {{ score.score }}</span>
            </li>
        </ul>
        <p class="winner info" v-if="this.winnerName !== ''">🏆 And the winner is: {{ winnerName }} 🏆</p>
        <p class="error info" v-if="this.winnerName === ''">There has been a draw!</p>
        <button class="button play" @click="startOver">Play again</button>
    </section>
</template>
