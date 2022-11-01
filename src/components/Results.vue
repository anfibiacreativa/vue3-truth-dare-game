<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';

const { players } = storeToRefs(usePlayerStore());
const { totalScores } = storeToRefs(usePlayerStore());

function startOver() {
    // simple hack to reset the game
    // TODO: reset from the store
    window.location.reload();
}

</script>

<template>
    {{ totalScores }}
    <section class="halloffame">
        <h2>Final Scores</h2>
        <ul>
            <li v-for="score in totalScores" :key="score.name">
                <span>{{ score.name }}:</span>
                <span> {{ score.score }}</span>
            </li>
        </ul>
        <p class="winner info">🏆 And the winner is: 🏆</p>
        <p class="error info">There has been a draw!</p>
        <button class="button play" @click="startOver">Play again</button>
    </section>
</template>
