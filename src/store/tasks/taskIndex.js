import taskMutations from './taskMutations';
import taskActions from './taskActions';
import taskGetters from './taskGetters';

export default {
  // namespaced: true,
  state() {
    return { tasks: [] };
  },
  mutations: taskMutations,
  actions: taskActions,
  getters: taskGetters,
};
