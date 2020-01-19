const playSound = () => {
  // Play sound using the drum code
  const audio = document.querySelector(`audio[data-audio]`);

  // reset the audio to be able to press multiple times
  audio.currentTime = 0;
  audio.play();
};

export { playSound };
