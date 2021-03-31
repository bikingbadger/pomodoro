import projectMutations from './projectMutations';
import projectActions from './projectActions';
import projectGetters from './projectGetters';

export default {
  // namespaced: true,
  state() {
    return { projects: [] };
  },
  mutations: projectMutations,
  actions: projectActions,
  getters: projectGetters,
};
