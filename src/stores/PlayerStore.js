import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => ({
        players: [],
        playerActive: '',
        isEmpty: true
    }),
    getters: {
        getPlayers: (state) => {
            return state.players;
        }
    },
    actions: {
        updatePlayers(players) {
            this.players = players;
            this.isEmpty = false;
        },
        activatePlayer(player) {
            this.playerActive = player;
        },
        deactivatePlayer() {        
            this.playerActive = '';
        },
        getActivePlayer() {
            this.players.map((player) => {
                if (player.isActive) {
                    this.playerActive = player.name;
                }
            })
        }
    }
});
