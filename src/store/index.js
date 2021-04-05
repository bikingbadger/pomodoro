import { createStore } from 'vuex'; // , createLogger
import VuexPersistence from 'vuex-persist';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// Import modules
import taskModule from './tasks/taskIndex';
import timerModule from './timer/timerIndex';
import authModule from './auth/index';
import projectsModule from './projects/projectIndex';

const vuexLocal = new VuexPersistence({
  // supportCircular: true,
  storage: window.localStorage,
  modules: ['auth', 'tasks', 'projects'],
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
    projects: projectsModule,
  },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [vuexLocal.plugin] // createLogger(),
      : [vuexLocal.plugin],
});

export default store;
