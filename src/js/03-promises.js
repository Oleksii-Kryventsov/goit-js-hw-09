import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlePromiseClick);

function handlePromiseClick(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  promises(delayValue, stepValue, amountValue);
  e.currentTarget.reset();
};

function promises(delay, step, amount) {
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay + (i * step))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}