import { createStore } from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// Import modules
import taskModule from './tasks/taskIndex';
import timerModule from './timer/timerIndex';
import authModule from './auth/index';

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
    timer: timerModule,
    auth: authModule,
  },
});

export default store;
