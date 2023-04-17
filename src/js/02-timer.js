// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let choosedDate = null;
const inputDate = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const refs = {
  outDays: document.querySelector('[data-days]'),
  outHours: document.querySelector('[data-hours]'),
  outMinutes: document.querySelector('[data-minutes]'),
  outSeconds: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Report.failure('Please choose a date in the future');
      return;
    }
    onChoosedDate(selectedDates[0]);
  },
};
inputDate.addEventListener('click', flatpickr(inputDate, options));
startBtn.addEventListener('click', startCountdown);

function onChoosedDate(date) {
  choosedDate = date.getTime();
  startBtn.disabled = false;
  inputDate.disabled = true;
  return choosedDate;
}
function startCountdown() {
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    timeLeft = Math.floor(choosedDate - Date.now());
    const outputTime = convertMs(timeLeft);

    if (timeLeft < 1000) {
      Notiflix.Notify.success('There is no time left');
      clearInterval(intervalId);
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  outputMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function outputMarkup({ days, hours, minutes, seconds }) {
  refs.outDays.textContent = days;
  refs.outHours.textContent = hours;
  refs.outMinutes.textContent = minutes;
  refs.outSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
