const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.getElementById('remainingTime');

const createTimerAnimator = () => {
  let sec;
  let min;
  let hours;
  let remainingTime;
  let hslColorDelta = 0;
  return (seconds, delta) => {
    let timer = setInterval(function () {
      sec = seconds % 60
      min = seconds / 60 % 60
      hours = seconds / 60 / 60 % 60

      remainingTime = `<div class="number center">${Math.trunc(hours)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${Math.trunc(min)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${sec}</div>`;
      timerEl.innerHTML = remainingTime;
      if (seconds <= 0) {
        clearInterval(timer);
        // alert("Время закончилось");
      }
      --seconds;
    }, 1000);
    let colorChangeTimer = setInterval(function () {
      colorChange(hslColorDelta);
      hslColorDelta++;
      if (hslColorDelta === 120) {
        clearInterval(colorChangeTimer);
      }
    }, delta/120*1000);
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
  const delta = seconds;

  animateTimer(seconds, delta);

  inputEl.value = ``;
});

const colorChange = (num) => {
  document.documentElement.style.setProperty('--main-color', `hsl(${240+num}, 79%, 66%)`);
  document.documentElement.style.setProperty('--light-shadow', `hsl(${240+num}, 70%, 73%)`);
  document.documentElement.style.setProperty('--dark-shadow', `hsl(${240+num}, 57%, 53%)`);
  document.documentElement.style.setProperty('--input-color', `hsl(${240+num}, 100%, 87%)`);
}
