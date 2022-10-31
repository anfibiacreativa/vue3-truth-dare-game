import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('CardStore', {
    state: () => ({
        cards: [],
        totalCardsPlayed: [],
        isLoading: false,
        error: null,
        isChallengeActive: false,
        isGameOver: false
    }),
    getters: {
        getCards: (state) => {
            return state.cards;
        }
    },
    actions: {
        // get all the cards
        async fetchCards(url, body) {
            this.loading = true;
            try {
                this.cards = await axios.post(url, body)
                    .then(response => {
                        return response.data;
                    })
            }
            catch (error) {
                this.error = error;
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        endGame(players) {
            if ((this.totalCardsPlayed.length / players) === 3 && !this.isChallengeActive) {
                console.log('####endGame');
                this.isGameOver = true;
            }
        },
        resetCards() {
            this.cards = [];
        },
        updateAllCardsPlayed(card) {
            this.totalCardsPlayed.push(card);
            console.log('####totalCardsPlayed', this.totalCardsPlayed.length);
        },
        setCardisChallenge() {
            console.log('setCardisChallenge before', this.isChallengeActive);
            this.isChallengeActive = true;
        },
        unsetCardisChallenge() {
            console.log('unsetCardisChallenge before', this.isChallengeActive);
            this.isChallengeActive = false;
        }
    }
});
