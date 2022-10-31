<template>
    <div class="playerlist-wrapper">
       <h2 class="title">Players</h2>
       <form class="form" @submit.prevent="addPlayer">
            <input class="newPlayer" type="text" v-model="playerName" placeholder="Enter player name" id="newPlayer" />
            <button class="add" type="submit" title="Add Player">
                <span>＋</span>
            </button>
            <p v-if="state.isDuplicated" class="error">Please choose a different name.</p>
            <p v-if="state.isMaxPlayers" class="error">Max 4 players!</p>
        </form>
       <ul class="playerlist">
            <li class="player-item" v-for:="(player, index) in state.playerList" :key="index" v-bind:class="{ 'isActive': player.isActive }">
                {{ player.name }}
                <span v-if="player.isActive" class="active">👉 NOW PLAYING</span>
                <button class="remove" @click="removePlayer(index)">
                    <span>⤬</span>
                </button>
                <div class="player-cards">
                    <Hand v-bind:player="player" />
                </div>
            </li>
       </ul>            
    </div>
</template>

<script>

import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';
import Hand from '@/components/Hand.vue';

export default {
    name: 'PlayerList',
    props: {
        'playerName': {
            type: String
        },
        'challenge': {
            type: Object
        }
    },
    components: {
        Hand
    },
    setup(props) {
        const { players } = storeToRefs(usePlayerStore());
        const {  updatePlayers } = usePlayerStore();

        const state = reactive({
            index: 0,
            hasPlayers: false,
            playerList: [],
            isDuplicated: false,
            isMaxPlayers: false
        });
        
        function addPlayer(e) {
            let newPlayer = document.getElementById('newPlayer');
            console.log('#addPlayer', newPlayer.value);
            let newPlayerObj = {
                name: newPlayer.value,
                cards: [],
                isActive: false,
                score: [],
                isWinner: false
            }
            if (newPlayer.value === '') {
                state.isDuplicated = false;
                return;
            }
            state.isMaxPlayers = state.playerList.length >= 4 ? true : false;
            state.playerList.map((player) => { 
                if (newPlayer.value === player.name) {
                    state.isDuplicated = true;
                } else {
                    state.isDuplicated = false;
                };
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
                console.log(update, '#update');
                updatePlayers(update);
            } else {
                updatePlayers(state.playerList);
            }
            if (state.playerList.length === 2) {
                state.playerList[0].isActive = true;
            }
        }

        function removePlayer(index) {
            console.log('removePlayer');
            state.playerList.splice(index, 1);
            if (state.playerList.length <= 3) {
                state.isMaxPlayers = false;
            }
        }

        return { state, addPlayer, removePlayer }
    }
}
</script>
