import { defineStore } from 'pinia';
import items from '@/data/items.json';
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
        async fetchCards({ commit }) {
            try {
                const url = 'api/cards';
                const response = await axios.get(url)
                    commit('SET_CARDS', response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});
