import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => ({
        players: [],
        playerActive: '',
        isEmpty: true,
        challenge: {
            playerActive: '',
            text: '',
            active: false,
        },
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
        },
        addCurrentChallenge(challenge) {
           this.challenge.text = challenge.text;
           this.challenge.active = true;
        },
        removeCurrentChallenge() {
            this.challenge.text = '';
            this.challenge.active = false;
        },
        addCardToPlayer(card) {
            this.players.map((player) => {
                if (player.name === this.playerActive) {
                    player.cards.push(card);
                }
            })
        },
        addScoreToPlayer(score) {
            this.players.map((player) => {
                if (player.isActive) {
                    player.score += score;
                }
            })
        },
       increaseHand() {
            this.players.map((player) => {
                player.hand.push('🖐');
            })
        }
    }
});
