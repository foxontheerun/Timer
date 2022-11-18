const inputEl = document.querySelector('input');
const buttonStart = document.getElementById('start');
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
    // Смена цвета фона с синего на красный в зависимости от оставшегося времени
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

const colorChange = (num) => {
  document.documentElement.style.setProperty('--main-color', `hsl(${240+num}, 79%, 66%)`);
  document.documentElement.style.setProperty('--light-shadow', `hsl(${240+num}, 70%, 73%)`);
  document.documentElement.style.setProperty('--dark-shadow', `hsl(${240+num}, 57%, 53%)`);
  document.documentElement.style.setProperty('--input-color', `hsl(${240+num}, 100%, 87%)`);
}

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^\d.]/g, '');
});

buttonStart.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  if (seconds > 86400) {
    alert('The time you entered exceeds the number of seconds in a day. \nВведенное вами время превышает количество секунд в сутках.');
    window.location.reload();
  }
  if ( seconds === 0 ) {
    alert('Please enter the time. \nПожалуйста, введите время.');
    window.location.reload();
  }
  if (isStart) {
    animateTimer(seconds);
    inputEl.value = ``;
    buttonStart.innerHTML = 'Reset';
    isStart = false;
  } else {
    buttonStart.innerHTML = 'Start';
    window.location.reload();
  }
});

buttonPause.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    buttonPause.innerHTML = '||';
    colorChange(hslColorDelta);
    document.documentElement.style.setProperty('--font-color', 'white');

  } else {
    isPaused = true;
    buttonPause.innerHTML = 'Play';
    colorChange(-110);
    document.documentElement.style.setProperty('--font-color', '#0d0f21');
  }

});

