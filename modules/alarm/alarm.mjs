const alarmClock = document.getElementById("alarmClock");

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
  const audio = new Howl({
    src: ["modules/alarm/assets/sounds/alarmclock.mp3"],
    preload: true,
    loop: true,
    volume: 0.5,
  });

  let alarmActive = true;

  const playAlarm = () => {
    if (alarmActive) {
      // show the alarm clock
      alarmClock.classList.add("alarm-active");

      // Play the alarm the options for looping is true so it will loop
      //   indefinitely until the alarm clock image is pressed.
      audio.play();
    }
  };

  // Turn off the alarm sound
  const killAlarm = e => {
    alarmActive = false;

    // Stop the alarm
    audio.stop();

    // Remove the class to show the alarm clock image
    alarmClock.classList.remove("alarm-active");
  };

  // Add a click event to kill the alarm sound
  alarmClock.addEventListener("click", killAlarm);

  // Play the alarm
  playAlarm();
};

export { loadAlarm, playSound };
