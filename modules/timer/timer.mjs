import * as Alarm from '../alarm/alarm.mjs';

'use strict';

const timerData = {
  timer: 1500,
  running: false,
  pompoms: 0,
};
const buttonAction = document.querySelector('[data-action]');
let countDown;
const timeout =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 1
    : 1000;

/**
 * Render the timer
 */
const renderTimer = () => {
  render('#timer', templateTimer);
  render('.pompoms', templatePompoms);

  // Set time in title
  document.title = 'Pompom ' + templateTimer();
};

/**
 * Render the template for the given selector
 * @param {String} selector The selector for the element on the page to render
 * @param {Function} template Callback function to create the layout
 */
const render = (selector, template) => {
  const app = document.querySelector(selector);
  if (!app) return;

  // retrieve the output for the current state of timer
  const output = template();

  // check for changes, if there are none no reason to update the document
  if (app.innerHTML === output) return;

  // update changes to the document
  app.innerHTML = output;
};

/**
 * Template for the Timer
 *
 * Creates the html output for the timer using the state timerData
 */
const templateTimer = () => {
  // extract the minutes from the timer, convert to string and pad with zero's
  const minutes = parseInt(timerData.timer / 60, 10)
    .toString()
    .padStart(2, '0');
  // extract the seconds from the timer, convert to string and pad with zero's
  const seconds = parseInt(timerData.timer % 60, 10)
    .toString()
    .padStart(2, '0');
  // console.log(`${minutes}:${seconds}`);
  return `${minutes}:${seconds}`;
};

/**
 * Template for Pompoms
 *
 * Creates a ordered list of the tasks stored in local storage
 */
const templatePompoms = () => {
  // check if time is up and return message
  if (timerData.pompoms === 0) {
    return '';
  }

  let pompoms = '';
  for (let index = 0; index < timerData.pompoms; index++) {
    if (index % 2 === 0) pompoms += '🍅';
  }

  return `${pompoms}`;
};

const clearInterval = () => {
  // Set running to false and set button text
  timerData.running = false;
  buttonAction.innerText = 'START';

  // Clear the window interval for the timer
  window.clearInterval(countDown);
};

// Start Timer
const startTimer = () => {
  // Only start a new timer if one is not already running
  if (!countDown === undefined) return;
  countDown = window.setInterval(() => {
    //Make sure the timer is running and not paused
    if (timerData.running) {
      //  Check if the timer has ended, if it has determine the next course of action
      if (timerData.timer <= 0) {
        clearInterval();
        Alarm && Alarm.play();

        /**
         * Check the amount of pompoms, this will determine what happens to the timer
         * The number of pompoms will indicate what iteration we are on
         * 8: Will indicate the end of a round because this is the last iteration
         * 7: Will be the long break after the previous 3 breaks
         * 1,3,5: Will be the short breaks and can be calculated using mod
         * 2,4,6: Pomodoro, this is the default not caught by any of the if statements
         */
        timerData.pompoms++;
        console.log(timerData.pompoms);
        // End: The 8th pompom will happen after the long break so requires it to be reset
        if (timerData.pompoms === 8) {
          timerData.pompoms = 0;
          timerData.timer = 1500;
        }
        // Long Break: The 7th pompom occurs after 4 rounds so this means you get a long break
        else if (timerData.pompoms === 7) {
          timerData.timer = 750;
        }
        // Short Break: Every 2nd pompom should be a break
        else if (timerData.pompoms % 2 === 1) {
          timerData.timer = 300;
        } else {
          // Pomodoro period
          timerData.timer = 1500;
        }
      } else {
        /**
         * Decrease the timer
         */
        timerData.timer--;
      }
    }
    renderTimer();
  }, timeout);
};

/**
 * Setup the timer
 */
const load = () => {
  renderTimer();
  Alarm.load();
};

/**
 * Reset the timer
 */
const reset = () => {
  clearInterval();
  timerData.timer = 1500;
  timerData.pompoms = 0;
  renderTimer();

  // Kill the alarm if the button is pressed
  Alarm.kill();
};

/**
 * Start the timer
 */
const start = () => {
  timerData.running = true;
  startTimer();
  buttonAction.innerText = 'PAUSE';
  // Kill the alarm if the button is pressed
  Alarm.kill();
};

/**
 * Pause the timer
 */
const pause = () => {
  timerData.running = false;
  buttonAction.innerText = 'START';
  // Kill the alarm if the button is pressed
  Alarm.kill();
};

export { load, reset, start, pause };
