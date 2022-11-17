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
  const seconds = Number(inputEl.value);
  if (seconds > 86400) {
    alert('The time you entered exceeds the number of seconds in a day. \nВведенное вами время превышает количество секунд в сутках.');
    window.location.reload();
  }
  if ( seconds == 0) {
    alert('Please enter the time. \nПожалуйста, введите время.');
    window.location.reload();
  }
  if (isStart) {;
    console.log(seconds);
    animateTimer(seconds);
    inputEl.value = ``;
    buttonEl.innerHTML = 'Reset';
    isStart = false;
  } else {
    buttonEl.innerHTML = 'Start';
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
    colorChange(-90);
    document.documentElement.style.setProperty('--font-color', '#616161');
  }

});

const colorChange = (num) => {
  document.documentElement.style.setProperty('--main-color', `hsl(${240+num}, 79%, 66%)`);
  document.documentElement.style.setProperty('--light-shadow', `hsl(${240+num}, 70%, 73%)`);
  document.documentElement.style.setProperty('--dark-shadow', `hsl(${240+num}, 57%, 53%)`);
  document.documentElement.style.setProperty('--input-color', `hsl(${240+num}, 100%, 87%)`);
}
