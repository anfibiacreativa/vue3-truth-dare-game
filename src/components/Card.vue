<template>
    <div class="card-wrapper">
        <div class="card-flipper" v-bind:class="{ 'isFlipped': state.isFlipped }">
            <div class="card card-front" @mousedown="flipCard">
                <span>{{card.title}}</span>
            </div>
            <div class="card card-back" @mousedown="flipCard">
                <span class="isBlock">{{card.text}}</span>
            </div>
        </div>
        <button class="button small" @click="chooseCard">Choose</button>
    </div>
</template>

<script>

import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/PlayerStore';

export default {
    name: 'Card',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { addCardToPlayer } = usePlayerStore();
        const state = reactive({
            index: 0,
            isFlipped: false
        });

        function flipCard(e) {
            state.isFlipped = !state.isFlipped;
        }
        function chooseCard(e) {
            console.log(props.card, '#props.card');
            addCardToPlayer(props.card);
        }
        return { state, flipCard, chooseCard }
    }
}
</script>
