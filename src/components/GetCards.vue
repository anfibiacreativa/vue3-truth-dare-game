<template>
  <div class="panel">
    <button class="button" value="1" @click="cards">
        Say the truth
        <font-awesome-icon icon="fa-solid fa-user-secret" />
    </button>
    <button class="button" value="2" @click="cards">
        Dare to play
        <font-awesome-icon icon="fa-solid fa-user-secret" />
    </button>
  </div>
  <template v-if="!state.noCards && state.cardsResults.length > 0">
    <ul class="wrapper search-results">
      <li class="search-item" v-for="(result, index) in state.cardsResults" :key="index">
        <Card v-bind:card=state.list[index] />
      </li>
    </ul>
  </template>
  <template v-else-if="!state.noCards">
      <div class="search-message">
          <p>No cards were loaded. Try again.</p>
      </div>
  </template>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import Card from './Card.vue';
import { useCardStore } from '../stores/CardStore';

export default {
    name: 'GetCards',
    components: {
        Card
    },
    setup() {

        const state = reactive({
            list: [],
            noCards: true
        });
        const store = useCardStore();

        const url = '/api/cards';

        function cards(e){
            let type = e.target.value;
            console.log(type, '#type from button');
            let param = 'type=';
            store.fetchCards(url, param, type);
            axios.post(url, 
                `${param}${type}`
            ).then(res => {
                if (type === '' || res.data.length === 0) {
                    state.noCards = true;
                    return;
                }
                state.noCards = false;
                state.cardsResults = res.data.map(card => card.type);
                state.list = res.data;
            }).catch(err => {
                throw new Error(err);
            });
        }
        return { cards, state }
    }
}
</script>
