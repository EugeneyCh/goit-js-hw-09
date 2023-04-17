const refs = {
  startBtn: document.querySelector(`[data-start]`),
  stopBtn: document.querySelector(`[data-stop]`),
};

const colorChange = {
  intervalId: null,
  start() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    colorChange.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(colorChange.intervalId);
  },
};

refs.startBtn.addEventListener('click', colorChange.start);
refs.stopBtn.addEventListener('click', colorChange.stop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
