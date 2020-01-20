const alarmClock = document.getElementById("#alarmClock");

const loadAlarm = () => {
  // Add custom CSS
  const cssId = "alarm"; // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "modules/alarm/assets/css/alarm.css";
    link.media = "all";
    head.appendChild(link);
  }

  // Add image to div
  const imageId = "alarmImage";
  if (!document.getElementById(imageId)) {
    const image = document.createElement("img");
    image.id = imageId;
    image.src = "modules/alarm/assets/img/alarm.png";
    image.alt = "alarm clock";
    alarmClock.appendChild(image);
  }
};

const playSound = () => {
  const audio = new Audio("modules/alarm/assets/sounds/alarmclock.mp3"); //document.querySelector(`audio[data-audio]`);
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

export { loadAlarm, playSound };
