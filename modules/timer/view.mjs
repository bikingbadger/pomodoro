import TimerController from './controller.mjs';
const buttonStartPause = document.querySelector('#timer-go');
const buttonReset = document.querySelector('#timer-reset');
const timerElement = document.querySelector('#timer');

const TimerView = {
  load: function () {
    // Check that the buttons exist, if not return
    if (!buttonReset) {
      throw Error('Reset button is missing');
    }
    if (!buttonStartPause) {
      throw Error('Start button is missing');
    }
    // Check that the timer element has been included
    if (!timerElement) {
      throw Error('Timer element is missing');
    }

    /**
     *
     */
    buttonStartPause.addEventListener(
      'click',
      function () {
        // console.log(`Current Button Text: ${buttonStartPause.innerText}`);
        if (buttonStartPause.innerText.toUpperCase() === 'START') {
          TimerController.startTimer();
        } else {
          TimerController.pauseTimer();
        }
      },
      false,
    );

    /**
     *
     */
    buttonReset.addEventListener(
      'click',
      function () {
        TimerController.resetTimer();
      },
      false,
    );
  },
  /**
   * Render the template for the given selector
   * @param {String} selector The selector for the element on the page to render
   * @param {Function} template Callback function to create the layout
   */
  render: function (model) {
    const currentTime = model.currentTime;

    // extract the minutes from the timer, convert to string and pad with zero's
    const minutes = parseInt(currentTime / 60, 10)
      .toString()
      .padStart(2, '0');
    // extract the seconds from the timer, convert to string and pad with zero's
    const seconds = parseInt(currentTime % 60, 10)
      .toString()
      .padStart(2, '0');
    // concatenate the mintues and seconds into a pretty string
    const output = `${minutes}:${seconds}`;

    // check for changes, if there are changes update the document
    if (timerElement.innerHTML !== output) {
      timerElement.innerHTML = output;
    }

    // update the button text
    // console.log(model.running);
    buttonStartPause.innerText = model.running ? 'Pause' : 'Start';
  },
  notify: function (model) {
    this.render(model);
  },
};

export default TimerView;