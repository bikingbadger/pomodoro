export default {
  setTimer: (state, timerId) => {
    state.timerId = timerId;
  },
  startTimer: (state) => {
    state.isRunning = true;
    state.buttonPressed = true;
    state.startTime = new Date().getTime();
  },
  decreaseTime: (state) => {
    const secondsConversion =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 750
        : 1000;
    const currentMillisecondsPassed = (new Date().getTime() - state.startTime) / secondsConversion;
    state.currentTime = state.currentPomodoro - currentMillisecondsPassed;
  },
  stopTimer: (state) => {
    state.isRunning = false;
  },
};
