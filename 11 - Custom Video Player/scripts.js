const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const plus25Button = document.querySelector('button[data-skip="25"]');
const minus10Button = document.querySelector('button[data-skip="-10"]');
const fullScreenButton = document.querySelector('button.fullscreen');
const progressBar = document.querySelector('.progress');
const progressBarFilled = document.querySelector('.progress__filled');

togglePlay = () => {
  if (video.paused) {
    video.play();
    playButton.innerText = '❚❚';
  } else {
    video.pause();
    playButton.innerText = '►';
  }
}

updateVolume = () => {
  video.volume = volumeSlider.value;
}

updateSpeed = () => {
  video.playbackRate = speedSlider.value;
}

forward = () => {
  video.currentTime += 25;
}

backward = () => {
  video.currentTime -= 10;
}

updateProgressBar = () => {
  progressBarFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}

changeCurrentTime = (e) => {
  const time = e.offsetX / progressBar.offsetWidth * video.duration;
  video.currentTime = time;
}

toggleFullScreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
volumeSlider.addEventListener('change', updateVolume);
speedSlider.addEventListener('change', updateSpeed);
plus25Button.addEventListener('click', forward);
minus10Button.addEventListener('click', backward);
fullScreenButton.addEventListener('click', toggleFullScreen);

video.addEventListener('timeupdate', updateProgressBar);

progressBar.addEventListener('click', changeCurrentTime);