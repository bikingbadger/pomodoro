import { createStore, createLogger } from 'vuex';
import VuexPersistence from 'vuex-persist';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// Import modules
import taskModule from './tasks/taskIndex';
import timerModule from './timer/timerIndex';
import authModule from './auth/index';

const vuexLocal = new VuexPersistence({
  // supportCircular: true,
  storage: window.localStorage,
  modules: ['auth', 'tasks'],
});

const store = createStore({
  state() {
    return {};
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
  modules: {
    tasks: taskModule,
    timer: timerModule,
    auth: authModule,
  },
  plugins:
    process.env.NODE_ENV !== 'production' ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});

export default store;
