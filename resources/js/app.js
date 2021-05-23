require('./bootstrap');
require('@fortawesome/fontawesome-free/js/all.js');
import router from './assets/router.js';
import Vuelidate from 'vuelidate';
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'

window.Vue = require('vue').default;

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
store.dispatch("auth/getUser").then(() => {
    const app = new Vue({
        el: '#app',
        router,
        store
    });
})