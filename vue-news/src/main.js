// application 설정들의 청사진 눈에 들어옴
import Vue from 'vue'
import App from './App.vue'

import {router} from "./routes";
import {store} from './store';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')
