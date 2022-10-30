<template>
  <input type="text" name="search-box" @keyup="search" />
  <template v-if="!state.noSearch && state.searchResults.length > 0">
    <ul class="search-results">
      <li class="search-item" v-for="(result, index) in state.searchResults" :key="index">
          <a src="#">{{result}}</a>
      </li>
    </ul>
  </template>
  <template v-else-if="!state.noSearch">
      <div class="search-message">
          <p>No results found. Please, try again.</p>
      </div>
  </template>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
    name: 'SearchBox',
    setup(){

        const state = reactive({
            searchResults: [],
            noSearch: true
        });

        const apiURL = '/api/search';
        const remote = `https://nv-vue-function.azurewebsites.net${apiURL}`;
        const local = `http://localhost:7071${apiURL}`;

        const endpoint = process.env.NODE_ENV === 'production' ? remote : local;
        console.log(endpoint, '#endpoint');
        function search(e){
            let term = e.target.value.trim();
            let param = 'term=';
            console.log(term, '#term');
            axios.post(endpoint, 
                `${param}${term}`
            ).then(res => {
                if (term === '') {
                    state.noSearch = true;
                    return;
                }
                state.noSearch = false;
                state.searchResults = res.data.map(item => item.name);
            }).catch(err => {
                console.log(err, '#err');
                throw new Error(err);
            });
        }

        return { search, state }
    }
}
</script>
