<script setup>
    import { storeToRefs } from 'pinia';
    import { useCardStore } from '@/stores/CardStore';
    import Card from './Card.vue';
import { onMounted } from 'vue';

    defineProps({
        card: {
            type: Object
        },
        cards: {
            type: Array
        }
    });

    const { cards, loading, error } = storeToRefs(useCardStore());
    const { fetchCards } = useCardStore();
    const url = '/api/cards';

    function getCardList(e) {
        let type = e.target.value;
        console.log(type, '#type from button');
        let param = 'type=';
        fetchCards(url, `${param}${type}`).then(() => {
            console.log({ cards, loading, error }, '#cards, loading, error');
        }).catch(err => {
            throw new Error(err);
        });
    }

    onMounted(() => {
        console.log('mounted')
    })
</script>

<template>
    <div class="panel">
        <button class="button" value="1" @click="getCardList">
            Say the truth, ok? 🥹
        </button>
        <button class="button" value="2" @click="getCardList">
            Dare to play! 😈
        </button>
    </div>
    <template>
        <ul class="wrapper search-results">
            {{ cards }}
            <li v-for="(card, index) of cards" :key="index">
                <Card v-bind:card=card />
            </li>  
        </ul>
    </template>
</template>