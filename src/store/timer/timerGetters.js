export default {
  isRunning: (state) => state.isRunning,
  getCurrentTime: (state) => {
    let formattedTime = '0:00';
    if (state.currentTime >= 0) {
      // extract the minutes from the timer, convert to string and pad with zero's
      const minutes = parseInt(state.currentTime / 60, 10)
        .toString()
        .padStart(2, '0');
      // extract the seconds from the timer, convert to string and pad with zero's
      const seconds = parseInt(state.currentTime % 60, 10)
        .toString()
        .padStart(2, '0');
      // concatenate the mintues and seconds into a pretty string
      formattedTime = `${minutes}:${seconds}`;
    }
    return formattedTime;
  },
};
