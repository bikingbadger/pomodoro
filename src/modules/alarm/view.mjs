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
    if (model.subject === 'timer') {
      console.log(model);
      if (model.running && model.currentTime === 0) {
        this.play();
      }
    }
  },
};
export default AlarmView;
