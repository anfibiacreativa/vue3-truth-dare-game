import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('CardStore', {
    state: () => ({
        cards: [],
        isLoading: false,
        error: null,
        isChallengeActive: false
    }),
    getters: {
        getCards: (state) => {
            return state.cards;
        }
    },
    actions: {
        // get all the cards
        async fetchCards(url, body) {
            this.cards = [];
            this.loading = true
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
