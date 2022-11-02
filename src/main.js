import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';


// let's use pinia for state management! 🎉
const pinia = createPinia();
const app = createApp(App)
.use(pinia)
.mount('#app');
