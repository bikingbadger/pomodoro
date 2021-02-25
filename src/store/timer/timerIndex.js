import timerMutations from './timerMutations';
import timerActions from './timerActions';
import timerGetters from './timerGetters';

export default {
  namespaced: true,
  state() {
    return {
      timerId: null,
      startTime: null,
      currentTime: 1500,
      isRunning: false,
      currentPomodoro: 1500,
    };
  },
  mutations: timerMutations,
  actions: timerActions,
  getters: timerGetters,
};
