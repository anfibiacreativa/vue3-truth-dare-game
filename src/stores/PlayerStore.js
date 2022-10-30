import { defineStore } from 'pinia';
import items from '@/data/items.json';

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => {
        return {
            items,
        };
    },

});