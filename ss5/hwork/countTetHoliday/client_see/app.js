console.log(`---countTetHoliday/client_see/app.js---`);
const oneDayInMlSeconds = 3600 * 24 * 1000;
const currentTimeInMlSeconds = Date.now();
const tetNewYearInMlSeconds = new Date('February 11, 2021').getTime();
const remainInMlSeconds = tetNewYearInMlSeconds - currentTimeInMlSeconds;
document.querySelector(`#remain-days`).innerHTML = Math.round(remainInMlSeconds / oneDayInMlSeconds) + "&nbsp;";


const timeLeft = 3599 * 1000;
const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
const hourLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minuteLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
const secondLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

console.log(`dayLeft:${dayLeft} - hourLeft:${hourLeft} - minuteLeft:${minuteLeft} - secondLeft:${secondLeft}`);