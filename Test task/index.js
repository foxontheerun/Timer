const inputEl = document.querySelector('input');
const buttonEl = document.getElementById('start');
const buttonPause = document.getElementById('pause');
const timerEl = document.getElementById('remainingTime');
let isPaused = false;
let isStart = true;
let hslColorDelta = 0;

const createTimerAnimator = () => {
  let sec;
  let min;
  let hours;
  let remainingTime;
  return (seconds) => {
    const delta = seconds;
    let timer = setInterval(function () {
      if(!isPaused){
        /* Выполняемый код... */
        sec = seconds % 60;
        min = seconds / 60 % 60;
        hours = seconds / 60 / 60 % 60;
        remainingTime = `<div class="number center">${Math.trunc(hours)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${Math.trunc(min)}</div>
                            <div class="colon center">:</div>
                            <div class="number center">${sec}</div>`;
        timerEl.innerHTML = remainingTime;
        if (seconds <= 0) {
          clearInterval(timer);
        }
        --seconds;
      }
      }
      , 1000);
    let colorChangeTimer = setInterval(function () {

      if(!isPaused) {
        colorChange(hslColorDelta);
        if (hslColorDelta === 120) {
          clearInterval(colorChangeTimer);
        }
        hslColorDelta++;
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
  if (isStart) {;
    const seconds = Number(inputEl.value);
    console.log(seconds);
    animateTimer(seconds);
    inputEl.value = ``;
  }
  isStart = false;
});


buttonPause.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    buttonPause.innerHTML = '||';
    colorChange(hslColorDelta);
  } else {
    isPaused = true;
    buttonPause.innerHTML = 'Play';
    colorChange(-90);
  }

});

const colorChange = (num) => {
  document.documentElement.style.setProperty('--main-color', `hsl(${240+num}, 79%, 66%)`);
  document.documentElement.style.setProperty('--light-shadow', `hsl(${240+num}, 70%, 73%)`);
  document.documentElement.style.setProperty('--dark-shadow', `hsl(${240+num}, 57%, 53%)`);
  document.documentElement.style.setProperty('--input-color', `hsl(${240+num}, 100%, 87%)`);
}
