const playSound = () => {
  const alarmClock = document.querySelector(".alarm");
  const audio = document.querySelector(`audio[data-audio]`);
  let alarmActive = true;

  const playAlarm = () => {
    if (alarmActive) {
      // show the alarm clock
      alarmClock.classList.add("alarm-active");

      // reset the time and play the alarm
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Turn off the alarm sound
  const killAlarm = e => {
    console.log(e.target);
    alarmActive = false;
    audio.pause();
    audio.currentTime = 0;
    alarmClock.classList.remove("alarm-active");
  };

  // Add event listener for looping audio
  audio.addEventListener(
    "ended",
    function() {
      playAlarm;
    },
    false,
  );

  alarmClock.addEventListener("click", killAlarm);

  playAlarm();
};

export { playSound };
