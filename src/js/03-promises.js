import Notiflix from 'notiflix';

const form = document.querySelector('form.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(evt) {
  evt.preventDefault();

  let valueDelay = Number(delay.value);
  let valueStep = Number(step.value);
  let valueAmount = Number(amount.value);
  for (let i = 1; i <= valueAmount; i++) {
    const promiseDelay = valueDelay + valueStep * (i - 1);

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
