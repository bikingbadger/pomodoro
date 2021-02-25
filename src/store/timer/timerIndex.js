import timerMutations from './timerMutations';
import timerActions from './timerActions';
import timerGetters from './timerGetters';

export default {
  namespaced: true,
  state() {
    return {
      timerId: null,
      startTime: null,
      currentTime: 0,
      isRunning: false,
      workTime: true,
      pompoms: 1,
      currentPomodoro: 0,
      pomodoroTime: 150,
      pomodoroRest: 30,
      pomodoroLong: 75,
      secondsConversion:
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 5
          : 1000,
    };
  },
  mutations: timerMutations,
  actions: timerActions,
  getters: timerGetters,
};
