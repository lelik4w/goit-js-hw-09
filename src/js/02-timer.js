// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const timer = {
    days: document.querySelector('.timer span[data-days]'),
    hours: document.querySelector('.timer span[data-hours]'),
    minutes: document.querySelector('.timer span[data-minutes]'),
    seconds: document.querySelector('.timer span[data-seconds]')
};

const addLeadingZero = value => {
    return value.padStart(2, '0');
};

const convertMs = ms => {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

let timerId;
let timeLeft = 0;

const adjustTime = timeLeftObj => {
    timer.days.innerHTML = addLeadingZero(String(convertMs(timeLeftObj).days));
    timer.hours.innerHTML = addLeadingZero(String(convertMs(timeLeftObj).hours));
    timer.minutes.innerHTML = addLeadingZero(String(convertMs(timeLeftObj).minutes));
    timer.seconds.innerHTML = addLeadingZero(String(convertMs(timeLeftObj).seconds));
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        const now = new Date();

        if(selectedDates[0] < now) {
            Notiflix.Notify.warning("Please choose a date in the future");
        } else {
            btnStart.removeAttribute('disabled');
            timeLeft = selectedDates[0] - now;
            adjustTime(timeLeft);
            // console.log(timeLeft);
        }
    },
};

btnStart.setAttribute('disabled', true);
const fp = flatpickr(dateTimePicker, options);

const startTimer = () => {
    timerId = setInterval(() => {
        timeLeft -= 1000;
        adjustTime(timeLeft);
        btnStart.setAttribute('disabled', true);
        // timeLeftObj = convertMs(timeLeft);
        // timer.days.innerHTML = addLeadingZero(String(convertMs(timeLeft).days));
        // timer.hours.innerHTML = addLeadingZero(String(convertMs(timeLeft).hours));
        // timer.minutes.innerHTML = addLeadingZero(String(convertMs(timeLeft).minutes));
        // timer.seconds.innerHTML = addLeadingZero(String(convertMs(timeLeft).seconds));

        // console.log(convertMs(timeLeft));

        if(timeLeft <= 1000) {
            clearInterval(timerId);
            // console.log('clear interval');
        }
    }, 1000);
};

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', ()=>{
    clearInterval(timerId);
});