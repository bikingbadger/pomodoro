export default {
  setTimer: (state, timerId) => {
    state.timerId = timerId;
    state.currentPomodoro = state.pomodoroTime;
    state.currentTime = state.pomodoroTime;
  },
  startTimer: (state) => {
    state.isRunning = true;
    console.log('start', state.currentPomodoro, state.currentTime);
    state.startTime = new Date().getTime();
    // state.currentTime = state.currentPomodoro - state.currentTime;
  },
  decreaseTime: (state) => {
    const currentMillisecondsPassed =
      (new Date().getTime() - state.startTime) / state.secondsConversion;
    console.log('decrease', state.startTime, state.currentPomodoro, currentMillisecondsPassed);
    state.currentTime = state.currentPomodoro - currentMillisecondsPassed;
  },
  stopTimer: (state) => {
    state.isRunning = false;
    state.currentPomodoro = state.currentTime;
    console.log('stop', state.currentPomodoro, state.currentTime);
  },
  resetTimer: (state) => {
    state.isRunning = false;
    state.currentTime = state.pomodoroTime;
    state.currentPomodoro = state.currentTime;
    state.pompoms = 0;
    state.workTime = true;
  },
  nextStep: (state) => {
    console.log('Next timer');
    //   Alarm && Alarm.play();

    /**
     * Check the amount of pompoms, this will determine what happens to the timer
     * The number of pompoms will indicate what iteration we are on
     * 8: Will indicate the end of a round because this is the last iteration
     * 7: Will be the long break after the previous 3 breaks
     * 1,3,5: Will be the short breaks and can be calculated using mod
     * 2,4,6: Pomodoro, this is the default not caught by any of the if statements
     */
    state.pompoms += 1;
    // console.log(`Pompoms: ${this.pompoms}`);
    // End: The 8th pompom will happen after the long break so requires it to be reset
    if (state.pompoms === 8) {
      state.pompoms = 0;
      // this.setTime(this.pomodoroTime);
      state.currentPomodoro = state.pomodoroTime;
      state.currentTime = state.pomodoroTime;
      state.workTime = true;
    } else if (state.pompoms === 7) {
      // Long Break: The 7th pompom occurs after 4 rounds so this means you get a long break
      // state.setTime(state.pomodoroLong);
      state.currentPomodoro = state.pomodoroLong;
      state.currentTime = state.pomodoroLong;
      state.workTime = false;
    } else if (state.pompoms % 2 === 1) {
      // Short Break: Every 2nd pompom should be a break
      // state.setTime(this.pomodoroRest);
      state.currentPomodoro = state.pomodoroRest;
      state.currentTime = state.pomodoroRest;
      state.workTime = false;
    } else {
      // Pomodoro period
      state.currentPomodoro = state.pomodoroTime;
      state.currentTime = state.pomodoroTime;
      state.workTime = true;
    }
  },
};
