<template>
    <div class="playerlist-wrapper">
       <h2 class="title">Players</h2>
       <form class="form" @submit.prevent="addPlayer">
            <input class="newPlayer" type="text" v-model="playerName" placeholder="Enter player name" id="newPlayer" />
            <button class="add" type="submit" title="Add Player">
                <span>＋</span>
            </button>
            <p v-if="state.isDuplicated" class="error">Please choose a different name.</p>
        </form>
       <ul class="playerlist">
            <li class="player-item" v-for:="(player, index) in state.playerList" :key="index">
                {{ player }}
                <button class="remove" @click="removePlayer(index)">
                    <span>⤬</span>
                </button>
                <div class="player-cards">

                </div>
            </li>
       </ul>            
    </div>
</template>

<script>

import { reactive } from 'vue';

export default {
    name: 'PlayerList',
    props: {
        'playerName': {
            type: String
        }
    },
    setup(props) {
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
            if (newPlayer.value === '') {
                state.isDuplicated = false;
                return;
            }
            state.isMaxPlayers = state.playerList.length >= 4 ? true : false;
            state.isDuplicated = state.playerList.includes(newPlayer.value) ? true : false;
            if (state.isDuplicated || state.isMaxPlayers) {
                return;
            }
            state.playerList.push(props.playerName);
            state.hasPlayers = true;
            // must figure out how to reset this since this is not working
            newPlayer.value = '';
        }

        function removePlayer(index) {
            console.log('removePlayer');
            state.playerList.splice(index, 1);
        }
        return { state, addPlayer, removePlayer }
    }
}
</script>
