<template>
    <div class="playerlist-wrapper">
       <h2 class="title">Players</h2>
       <form class="form" @submit.prevent="addPlayer">
            <input type="text" v-model="playerName" placeholder="Enter player name" id="newPlayer" />
            <button type="submit">
                <font-awesome-icon icon="fa-solid fa-user-secret" />
            </button>
        </form>
       <ul class="playerlist">
            <li v-for:="(player, index) in state.playerList" :key="index">
                {{ player }}
                <button @click="removePlayer(index)">
                    <font-awesome-icon icon="fa-solid fa-user-slash" />
                </button>
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
            playerList: []
        });

        function addPlayer(e) {
            let newPlayer = document.getElementById('newPlayer');
            console.log('#addPlayer', newPlayer.value);
            state.playerList.push(props.playerName);
            // must figure out how to reset this
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
