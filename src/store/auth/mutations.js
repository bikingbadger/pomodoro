import router from '@/router';

export default {
  authSuccess(state, payload) {
    const userData = payload;
    state.email = userData.email;
    state.registrationError = false;
    state.errorMsg = '';
    router.push({ path: 'home' });
  },

  authFail(state, payload) {
    const error = payload;

    state.registrationError = true;
    state.errorMsg = error.message;
  },

  getUser(state, userData) {
    state.username = userData.username;
    state.name = userData.name;
    state.id = userData.id;
    state.email = userData.email;
    state.isLoggedIn = true;
  },
};
