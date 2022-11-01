<script setup>

import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useCardStore } from '@/stores/CardStore';
import Hand from '@/components/Hand.vue';

const props = defineProps({
    card: {
        type: Object
    },
    cards: {
        type: Array
    },
    isPlaying: false,
    playerName: {
        type: String
    },
    challenge: {
        type: Object
    }
});

const { players } = storeToRefs(usePlayerStore());
const { isGameOver, isGameOn } = storeToRefs(useCardStore());
const { updatePlayers } = usePlayerStore();

const state = reactive({
    index: 0,
    hasPlayers: false,
    playerList: [],
    isDuplicated: false,
    isMaxPlayers: false
});

function addPlayer(e) {
    let newPlayer = document.getElementById('newPlayer');
    let newPlayerObj = {
        name: newPlayer.value,
        cards: [],
        isActive: false,
        round: {
            hand: [],
            score: []
        },
        isWinner: false
    }
    if (newPlayer.value === '') {
        state.isDuplicated = false;
        return;
    }
    state.isMaxPlayers = state.playerList.length >= 4 ? true : false;
    state.playerList.map((player) => {
        (player.name === newPlayer.value) ? state.isDuplicated = true : state.isDuplicated = false;
    });
    if (state.isDuplicated || state.isMaxPlayers) {
        return;
    }
    state.playerList.push(newPlayerObj);
    state.hasPlayers = true;
    // must figure out how to reset this since this is not working
    newPlayer.value = '';

    if (players ==! state.playerList) {
        let update = new Set([ ...players, ...state.playerList]);
        updatePlayers(update);
    } else {
        updatePlayers(state.playerList);
    }
    if (state.playerList.length === 2) {
        state.playerList[0].isActive = true;
    }
}

function removePlayer(index) {
    state.playerList.splice(index, 1);
    if (state.playerList.length <= 3) {
        state.isMaxPlayers = false;
    }
}

</script>

<template>
    <div class="playerlist-wrapper">
       <h2 class="title">Players</h2>
       <form class="form" @submit.prevent="addPlayer">
            <input class="newPlayer" type="text" v-model="playerName" placeholder="Enter player name" id="newPlayer" />
            <button :disabled="isGameOn" class="add" type="submit" title="Add Player">
                <span>＋</span>
            </button>
            <p v-if="state.isDuplicated" class="error">Please choose a different name.</p>
            <p v-if="state.isMaxPlayers" class="error">Max 4 players!</p>
        </form>
       <ul class="playerlist">
            <li class="player-item" v-for:="(player, index) in state.playerList" :key="index" v-bind:class="{ 'isActive': player.isActive }">
                {{ player.name }}
                <span v-if="player.isActive && !isGameOver" class="active">👉 NOW PLAYING</span>
                <button :disabled="isGameOn" class="remove" @click="removePlayer(index)">
                    <span>⤬</span>
                </button>
                <div class="player-cards">
                    <Hand v-bind:player="player" v-if="!isGameOver" />
                </div>
            </li>
       </ul>            
    </div>
</template>
