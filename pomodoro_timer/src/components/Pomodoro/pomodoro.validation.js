
export function formatTimer(minutes, seconds) {
  let min = minutes, sec = seconds;
  if (minutes > 0 && minutes < 10) {
    min = `0${minutes}`;
  } else if (minutes <= 0) {
    min = "00";
  }
  if (seconds > 0 && seconds < 10) {
    sec = `0${seconds}`;
  } else if (seconds<=0 || seconds > 60) {
    sec = "00";
  }
  return `${min} : ${sec}`;
}
