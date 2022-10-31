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
        endGame(cards, playersNumber) {
            this.totalCardsPlayed = new Set([...this.totalCardsPlayed, ...cards]);
            const allCardsPlayed = Array.of(this.totalCardsPlayed).length === Array.of(playersNumber).length * 3;
            if (allCardsPlayed && !this.isChallengeActive) {
                this.isGameOver = true;
            }
        },
        resetCards() {
            this.cards = [];
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
