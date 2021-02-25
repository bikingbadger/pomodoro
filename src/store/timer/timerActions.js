export default {
  createTimer({ commit, state, dispatch }) {
    // Use a faster timeout for local testing
    const timeout = 1000;

    // create the timer once
    const timerId = window.setInterval(() => {
      console.log(state);
      // Make sure the timer is running and not paused
      if (state.isRunning) {
        // Check if the timer has ended stop timer and set next value
        // else decrease and set the new time
        if (state.currentTime <= 0) {
          dispatch('stopTimer');
          // this.next();
        } else {
          dispatch('decreaseTime');
        }
      }
    }, timeout);
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
};
