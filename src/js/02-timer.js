import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');

let intervalId;

startBtn.disabled = true;

timer.style.marginTop = '20px';
timer.style.display = 'flex';
timer.style.gap = '15px';

value.forEach(el => {
	el.style.fontWeight = 'bold';
	el.style.fontSize = '30px';
});

field.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
});


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: '  d F, Y   ( H:i )',
	
  onClose(selectedDates) {
		const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
			Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
			startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);



startBtn.addEventListener('click', () => {
	const endTime = new Date(inputDate.value).getTime();
	Notify.info('Start of countdown');
	intervalId = setInterval(() => {
		updateTimer(endTime);
	}, 1000);
});

function updateTimer(endTime) {
	const delta = endTime - new Date();

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((delta % (1000 * 60)) / 1000);

	daysValue.textContent = addLeadingZero(days)
  hoursValue.textContent = addLeadingZero(hours)
  minutesValue.textContent = addLeadingZero(minutes)
  secondsValue.textContent = addLeadingZero(seconds)
	

  if (delta < 1000) {
    clearInterval(intervalId);
    Notify.success('End of countdown');
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
