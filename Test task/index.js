const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.getElementById('remainingTime');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let sec;
  let min;
  let hours;
  let remainingTime;
  return (seconds) => {
    let timer = setInterval(function () {
        sec = seconds % 60 // Получаем секунды
        min = seconds / 60 % 60 // Получаем минуты
        hours = seconds / 60 / 60 % 60 // Получаем часы
      if (seconds <= 0) {
        // Таймер удаляется
        clearInterval(timer);
        // Выводит сообщение что время закончилось
        alert("Время закончилось");
      } else { // Иначе
        // Создаём строку с выводом времени
        remainingTime = `<span class="number">${Math.trunc(hours)}</span>
                        <span class="number">:<span/>
                        <span class="number">${Math.trunc(min)}<span/>
                        <span>:<span/>
                        <span class="number">${sec}<span/>`;
        timerEl.innerHTML = remainingTime;
      }
      --seconds; // Уменьшаем таймер
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
