import authMutations from './authMutations';
import authActions from './authActions';
import authGetters from './authGetters';

export default {
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters,
};
