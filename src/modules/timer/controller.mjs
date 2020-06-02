import TimerModel from './model.mjs';
// import * as Alarm from '../alarm/alarm.mjs';

const TimerController = {
  model: TimerModel,
  countDown: null,
  /**
   * Reset the timer
   */
  resetTimer: function () {
    this.model.reset();
    window.clearInterval(this.countDown);
    // Kill the alarm if the button is pressed
    // Alarm.kill();
  },
  /**
   * Start the timer
   */
  startTimer: function () {
    this.model.start();
    // // Use a faster timeout for local testing
    // const timeout =
    //   window.location.hostname === 'localhost' ||
    //   window.location.hostname === '127.0.0.1'
    //     ? 1
    //     : 1000;
    // Only start a new timer if one is not already running
    // if (!this.countDown === null) return;
    // this.countDown = window.setInterval(() => {
    //   //Make sure the timer is running and not paused
    //   if (this.model.running) {
    //     //  Check if the timer has ended, if it has determine the next course of action
    //     if (this.model.currentTime <= 0) {
    //       this.model.stop();
    //       this.model.next();
    //     } else {
    //       /**
    //        * Decrease the timer
    //        */
    //       this.model.decrease();
    //     }
    //   }
    //   //   renderTimer();
    // }, timeout);
  },
  /**
   * Pause the timer
   */
  pauseTimer: function () {
    this.model.stop();
    // Kill the alarm if the button is pressed
    // Alarm.kill();
  },
};

export default TimerController;
