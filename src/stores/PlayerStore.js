import { defineStore } from 'pinia';
import { shouldTransformRef } from 'vue/compiler-sfc';

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
        totalScores: [],
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
        activatePlayer(oldPlayer) {
            const oldIndex = this.players.indexOf(oldPlayer);
            console.log('#####oldIndex', oldIndex);
            if (oldIndex < this.players.length - 1 && oldIndex != -1) {
                const newIndex = oldIndex + 1;
                this.playerActive = this.players[newIndex].name;
                this.players[newIndex].isActive = true;
                this.challenge.playerActive = this.players[newIndex].name;
            } else {
                this.playerActive = this.players[0].name;
                this.players[0].isActive = true;
            }
        },
        deactivatePlayer(currentActivePlayer) {
            this.players.map((player) => {
                if (player.name === currentActivePlayer.name) {
                    this.playerActive = '';
                    player.isActive = false;
                    this.activatePlayer(currentActivePlayer);
                }
            });  
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
           this.challenge.playerActive = this.playerActive;
        },
        removeCurrentChallenge() {
            this.challenge.text = '';
            this.challenge.active = false;
            this.challenge.playerActive = '';
        },
        addCardToPlayer(card) {
            this.players.map((player) => {
                if (player.name === this.playerActive) {
                    if (player.cards.length < 3) {
                        player.cards.push(card);
                    }
                }
            });
        },
        addScoreToPlayer(score) {
            this.players.map((player) => {
                if (player.name === this.playerActive) {
                    player.round.score.push(score);
                }
            });
            this.addTotalScores(score);
        },
        addHandPlayedToPlayer() {
            this.players.map((player) => {
                if (player.name === this.playerActive) {
                    player.round.hand.push('🖐');
                }
            });
        },
        addTotalScores(score) {
            console.log('newScore', score);
            this.players.map((player) => {
                if (player.name === this.playerActive) {
                    let index = this.players.indexOf(player);
                    console.log(this.players.length, 'this.players.length|||||||####');
                    console.log(this.totalScores.length, 'scores.length|||||||####');
                    if (this.totalScores.length < this.players.length) {
                        if (typeof this.totalScores[index] === 'undefined') {
                            this.totalScores.splice(
                                index,
                                0,
                                {   
                                    name: player.name,
                                    score: Number(score)
                                }
                            );
                        }
                        
                    } else {
                        this.totalScores[index].score += Number(score);
                    }
                } 
            });
            console.log('#####totalScore', [this.totalScores]);
        }
    }
});
