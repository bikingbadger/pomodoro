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
      pomodoroTime: 1500,
      pomodoroRest: 300,
      pomodoroLong: 750,
      secondsConversion:
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 1000
          : 1000,
      sound: null,
    };
  },
  mutations: timerMutations,
  actions: timerActions,
  getters: timerGetters,
};
