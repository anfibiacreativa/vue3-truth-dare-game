import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('CardStore', {
    state: () => {
        cards: []
    },
    getters: {
        getCards: (state) => {
            return state.cards;
        }
    },
    actions: {
        async fetchCards(url, param, type) {
            try {
                let body = `${param}${type}`;
                const response = await axios.post(url, body)
                .then((response) => {
                    this.cards = response.data;
                    console.log(this.cards);
                })

            }
            catch (error) {
                console.log(error);
            }
        }
    }
});
