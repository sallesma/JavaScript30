let countDown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  clearInterval(countDown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(function(){
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTimeLeft(secondsLeft);

    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
  }, 1000)
}

function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  display = `${min}:${sec < 10 ? '0' : ''}${sec}`
  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

document.querySelectorAll('.timer__button')
  .forEach(button => button.addEventListener('click', ()=> {
    const seconds = parseInt(button.dataset.time);
    timer(seconds);
}));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(parseInt(minutes) * 60);
  this.reset();
})
