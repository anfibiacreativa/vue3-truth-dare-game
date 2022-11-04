import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('CardStore', {
    state: () => ({
        cards: [],
        totalCardsPlayed: [],
        cardsToRemove: [],
        isLoading: false,
        error: null,
        isChallengeActive: false,
        isGameOver: false,
        isGameOn: false
    }),
    getters: {
        getCards: (state) => {
            return state.cards;
        }
    },
    actions: {
        // get all the cards
        async fetchCards(url, type) {
            this.isLoading = true;
            this.totalCardsPlayed.map((card) => { 
                this.cardsToRemove.push(card._id);
            });
            const projection = this.cardsToRemove;
            try {
                this.cards = await axios.post(url, { type, projection })
                    .then(response => {
                        return response.data;
                    })
            }
            catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        endGame(players) {
            if ((this.totalCardsPlayed.length === players * 3) && !this.isChallengeActive) {
                this.isGameOn = false;
                setTimeout(() => {
                    this.isGameOver = true;
                }, 1000);
            }
        },
        resetCards() {
            this.cards = [];
        },
        updateAllCardsPlayed(card) {
            if (this.totalCardsPlayed.length === 0) {
                this.isGameOn = true;
            }
            this.totalCardsPlayed.push(card);
        },
        setCardisChallenge() {
            this.isChallengeActive = true;
        },
        unsetCardisChallenge() {
            this.isChallengeActive = false;
        }
    }
});
