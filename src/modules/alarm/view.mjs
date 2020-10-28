const alarmClock = document.getElementById('alarmClock');
const audio = new Howl({
  src: ['sounds/alarmclock.mp3'],
  preload: true,
  loop: true,
  volume: 0.5,
});

const AlarmView = {
  load: function () {
    // Add image to div
    const imageId = 'alarmImage';
    if (!document.getElementById(imageId)) {
      const image = document.createElement('img');
      image.id = imageId;
      image.src = 'img/alarm.png';
      image.alt = 'alarm clock';
      alarmClock.appendChild(image);
    }

    // Remove the class to show the alarm clock image
    alarmClock.classList.add('invisible');

    // Add a click event to kill the alarm sound
    alarmClock.addEventListener('click', this.kill);
  },

  play: function () {
    // show the alarm clock
    alarmClock.classList.remove('invisible');

    // Play the alarm the options for looping is true so it will loop
    //   indefinitely until the alarm clock image is pressed.
    audio.play();
  },

  // Turn off the alarm sound
  kill: function () {
    // Stop the alarm
    audio.stop();

    // Remove the class to show the alarm clock image
    alarmClock.classList.add('invisible');
  },
  // notify called by PubSub
  notify: function (model) {
    // console.log(model.subject);
    if (model.subject === 'timer') {
      // Play alarm if the timer has stopped and the time has run out
      if (model.running && model.currentTime <= 0) {
        this.play();
      }
      // If start or reset button pressed then the alarm should also be stopped
      if (model.buttonPressed) {
        this.kill();
      }
    }
  },
};
export default AlarmView;
