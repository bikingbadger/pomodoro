import authActions from './actions';
import authMutations from './mutations';
import authGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      id: 0,
      name: '',
      username: '',
      email: '',
      isLoggedIn: true,
    };
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters,
};
