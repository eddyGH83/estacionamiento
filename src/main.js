import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
/* import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.bundle.min.js' */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';



const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');