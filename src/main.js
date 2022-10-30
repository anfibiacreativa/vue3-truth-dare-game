import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

// let's use pinia for state management! 🎉
const pinia = createPinia();
const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.mount('#app');
