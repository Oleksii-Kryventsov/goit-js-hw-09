import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputPicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDate]) {
        if (selectedDate < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
            startButton.addEventListener('click', () => {
                selectDown(selectedDate);
            });
        }
    },
};

flatpickr(inputPicker, options);

function selectDown(selectedDate) {
    const selectDownInteval = setInterval(() => {
        const currentDate = Date.now();
        const timeInMs = Math.floor(selectedDate - currentDate);
        const convertTime = convert(timeInMs);

        if (timeInMs <= 0) {
            clearInterval(selectDownInteval);
        } else {
            populateData(convertTime);
        }
    }, 1000);
};

function convert(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    const hours = Math.floor((ms % day) / hour);
    const days = Math.floor(ms / day);

     return { days, hours, minutes, seconds };
}


function populateData({days = '00', hours = '00', minutes = '00', seconds = '00'} = {}) {
    dataDays.textContent = days.toString().padStart(2, '0');
    dataHours.textContent = hours.toString().padStart(2, '0');
    dataMinutes.textContent = minutes.toString().padStart(2, '0');
    dataSeconds.textContent = seconds.toString().padStart(2, '0');
}

