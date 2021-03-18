import audio from '@/assets/sounds/alarmclock.mp3';
import { Howl } from 'howler';

export default {
  setTimer: (state, timerId) => {
    state.timerId = timerId;
    state.currentPomodoro = state.pomodoroTime;
    state.currentTime = state.pomodoroTime;
    state.sound = new Howl({
      src: [audio],
      preload: true,
      loop: true,
      volume: 0.5,
    });
  },
  startTimer: (state) => {
    state.isRunning = true;
    state.sound.stop();
    state.startTime = new Date().getTime();
  },
  decreaseTime: (state) => {
    const currentMillisecondsPassed =
      (new Date().getTime() - state.startTime) / state.secondsConversion;
    state.currentTime = state.currentPomodoro - currentMillisecondsPassed;
  },
  stopTimer: (state) => {
    state.isRunning = false;
    state.currentPomodoro = state.currentTime;
  },
  resetTimer: (state) => {
    state.isRunning = false;
    state.currentTime = state.pomodoroTime;
    state.currentPomodoro = state.currentTime;
    state.pompoms = 1;
    state.workTime = true;
    state.sound.stop();
  },
  nextStep: (state) => {
    /**
     * Check the amount of pompoms, this will determine what happens to the timer
     * The number of pompoms will indicate what iteration we are on
     * 8: Will indicate the end of a round because this is the last iteration
     * 7: Will be the long break after the previous 3 breaks
     * 1,3,5: Will be the short breaks and can be calculated using mod
     * 2,4,6: Pomodoro, this is the default not caught by any of the if statements
     */
    if (state.workTime) {
      // Short Break: Every 2nd pompom should be a break

      if (state.pompoms === 4) {
        state.currentPomodoro = state.pomodoroLong;
        state.currentTime = state.pomodoroLong;
        state.pompoms = 0;
      } else {
        state.currentPomodoro = state.pomodoroRest;
        state.currentTime = state.pomodoroRest;
      }
      state.workTime = false;
    } else {
      // Pomodoro period
      state.pompoms += 1;
      state.currentPomodoro = state.pomodoroTime;
      state.currentTime = state.pomodoroTime;
      state.workTime = true;
    }
  },
  playAlarm: (state) => {
    state.sound.play();
  },
};
