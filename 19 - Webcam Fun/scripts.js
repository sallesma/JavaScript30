const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function startVideo () {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then((stream) => {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    })
    .catch((error) => console.log('An error occured: ' + error));
}

function streamToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = greenScreen(pixels);
    // pixels = rgbSplit(pixels);
    // pixels = redEffect(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length ; i+=4) {
    pixels.data[i] = pixels.data[i] + 100
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length ; i+=4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 150] = pixels.data[i + 2];
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => levels[input.name] = input.value);

  for(let i = 0 ; i < pixels.data.length ; i += 4) {
    const red = pixels.data[i],
    green = pixels.data[i + 1],
    blue = pixels.data[i + 2];

    if (red >= levels.rmin
      && red <= levels.rmax
      && green >= levels.gmin
      && green <= levels.gmax
      && blue >= levels.bmin
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  strip.innerHTML += `
    <a href="${data}" download="handsome">
      <img src="${data}">
    </a>`;
}

video.addEventListener('canplay', streamToCanvas);
startVideo();
