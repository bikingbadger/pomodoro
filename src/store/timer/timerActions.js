export default {
  createTimer({ commit, state, dispatch }) {
    // create the timer once
    const timerId = window.setInterval(() => {
      // Make sure the timer is running and not paused
      if (state.isRunning) {
        // Check if the timer has ended stop timer and set next value
        // else decrease and set the new time
        if (state.currentTime <= 0) {
          dispatch('playAlarm');
          dispatch('stopTimer');
          commit('nextStep');
        } else {
          dispatch('decreaseTime');
        }
      }
    }, state.secondsConversion);
    commit('setTimer', timerId);
  },
  startTimer({ commit }) {
    commit('startTimer');
  },
  decreaseTime({ commit }) {
    commit('decreaseTime');
  },
  stopTimer({ commit }) {
    commit('stopTimer');
  },
  resetTimer({ commit }) {
    commit('resetTimer');
  },
  playAlarm({ commit }) {
    commit('playAlarm');
  },
};
