const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const randomBodyColor = document.querySelector('body');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', handleStartChangeColor);
stopButton.addEventListener('click', handleStopChangeColor);

function handleStartChangeColor() {
    startButton.disabled = true;
    intervalId = setInterval(() => {
        let randomColor = getRandomHexColor();
        randomBodyColor.style.background = randomColor;
    }, 1000);
};

function handleStopChangeColor() {
    startButton.disabled = false;
    clearInterval(intervalId);
};


