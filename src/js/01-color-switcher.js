function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const timerStartHandler = () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        btnStart.setAttribute('disabled', true);
    }, 1000);
};

const timerStopHandler = () => {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
    // body.removeAttribute('style');
};

btnStart.addEventListener('click', timerStartHandler);
btnStop.addEventListener('click', timerStopHandler);