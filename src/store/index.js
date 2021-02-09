import { createStore } from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// Import modules
import taskModule from './tasks/index';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
  modules: {
    tasks: taskModule,
  },
});

export default store;
