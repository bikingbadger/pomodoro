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
    ? 3
    : 1000;
let Alarm;

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
  if (!countDown === undefined) return;
  countDown = window.setInterval(() => {
    if (timerData.running) {
      if (timerData.timer <= 0) {
        clearInterval();
        Alarm && Alarm.play();
        timerData.pompoms++;
        // Check the pompoms to determine next time
        if (timerData.pompoms === 7) {
          timerData.timer = 750;
          timerData.pompoms = 0;
        } else if (timerData.pompoms % 2 === 1) {
          // Short Break
          timerData.timer = 300;
        } else {
          // Pomodoro period
          timerData.timer = 1500;
        }
      } else {
        timerData.timer--;
      }
    }
    renderTimer();
  }, timeout);
};

/**
 * Setup the timer
 */
const load = (alarm) => {
    console.log(alarm);
    Alarm = alarm;
    renderTimer();
}

/**
 * Reset the timer
 */
const reset = () => {
  clearInterval();
  timerData.timer = 1500;
  timerData.pompoms = 0;
  renderTimer();
};

/**
 * Start the timer
 */
const start = () => {
  timerData.running = true;
  startTimer();
  buttonAction.innerText = 'PAUSE';
};

/**
 * Pause the timer
 */
const pause = () => {
  timerData.running = false;
  buttonAction.innerText = 'START';
};

export { load, reset, start, pause };
