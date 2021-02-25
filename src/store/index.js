import { createStore } from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// Import modules
import taskModule from './tasks/taskIndex';
import timerModule from './timer/timerIndex';

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
  },
});

export default store;
