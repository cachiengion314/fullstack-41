console.log(`---countTetHoliday/client_see/app.js---`);
const oneDayInMlSeconds = 3600 * 24 * 1000;
const currentTimeInMlSeconds = Date.now();
const tetNewYearInMlSeconds = new Date('February 11, 2021').getTime();
const remainInMlSeconds = tetNewYearInMlSeconds - currentTimeInMlSeconds;
document.querySelector(`#remain-days`).innerHTML = Math.round(remainInMlSeconds / oneDayInMlSeconds) + "&nbsp;";
