import { defineStore } from 'pinia';
import items from '@/data/items.json';

export const useSearchStore = defineStore('SearchStore', {
    state: () => {
        return {
            items,
        };
    },

});