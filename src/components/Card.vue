<template>
    <div class="card-wrapper">
        <div class="card-flipper" v-bind:class="{ 'isFlipped': state.isFlipped }">
            <div class="card card-front" @mousedown="flipCard">
                <span>{{card.title}}</span>
            </div>
            <div class="card card-back" @mousedown="flipCard">
                <span>{{card.text}}</span>  
            </div>
        </div>
    </div>
</template>

<script>

import { reactive } from 'vue';

export default {
    name: 'Card',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            index: 0,
            isFlipped: false
        });

        function flipCard(e) {
            console.log(e.target, '#e.target Im clicked');
            state.isFlipped = !state.isFlipped;
        }
        return { state, flipCard }
    }
}
</script>
