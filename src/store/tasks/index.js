import taskMutations from './mutations';
import taskActions from './actions';
import taskGetters from './getters';

export default {
  namespaced: true,
  state() {
    return { tasks: [] };
  },
  mutations: taskMutations,
  actions: taskActions,
  getters: taskGetters,
};
