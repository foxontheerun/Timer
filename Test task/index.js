const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.getElementById('remainingTime');

const createTimerAnimator = () => {
  let sec;
  let min;
  let hours;
  let remainingTime;
  return (seconds) => {
    let timer = setInterval(function () {
        sec = seconds % 60 
        min = seconds / 60 % 60 
        hours = seconds / 60 / 60 % 60 
      if (seconds <= 0) {
        clearInterval(timer);
        alert("Время закончилось");
      }
      else {
        remainingTime = `<div class="number center">${Math.trunc(hours)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${Math.trunc(min)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${sec}</div>`;
        timerEl.innerHTML = remainingTime;
      }
      --seconds;
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  console.log(inputEl.value);
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = ``;
});
