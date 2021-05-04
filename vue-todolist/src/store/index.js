import Vuex from 'vuex';
import Vue from 'vue';

import todos from './todos';

Vue.use(Vuex);

const index = new Vuex.Store({
  modules: {
    todos,
  }
});

export default index;
