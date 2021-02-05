import taskMutations from './mutations';
import taskActions from './actions';
import taskGetters from './getters';

export default {
  namespace: true,
  state: {},
  mutations: taskMutations,
  actions: taskActions,
  getters: taskGetters,
  modules: {},
};
