// DOM elements
const showBtn = document.querySelector("button.expand");
const timeNow = document.querySelector("h1.time-now");
const weekNumber = document.querySelector("h4.week-number");
const weekDay = document.querySelector("h4.week-day");
const yearDay = document.querySelector("h4.year-day");
const weatherCurrently = document.querySelector("p.weather-currently");
const background = document.querySelector(".background");
const author = document.querySelector(".quote-wraper h4");
const quote = document.querySelector(".quote");
const weatherImg = document.querySelector(".weather-img");

showBtn.addEventListener("click", () => {
  showBtn.classList.toggle("clicked");
  if (showBtn.classList.contains("clicked")) {
    window.scrollTo({
      top: window.innerHeight * 0.5, // Scroll to 50% of the viewport height
      behavior: "smooth", // Add smooth scrolling behavior
    });
    showBtn.querySelector("span").textContent = "less";
  } else {
    window.scrollTo({
      top: 0, // Scroll to top
      behavior: "smooth", // Add smooth scrolling behavior
    });
    showBtn.querySelector("span").textContent = "more";
  }
});

setInterval(() => {
  refreshTime();
}, 1000);

function getCurrentDateTime() {
  const now = new Date();
  const options = { year: "numeric", hour: "2-digit", minute: "2-digit" };
  const dateTimeString = now.toLocaleString("en-US", options);

  let dayOfWeekNumber = now.getDay(); // 0 (Sunday) - 6 (Saturday)
  dayOfWeekNumber = dayOfWeekNumber === 0 ? 7 : dayOfWeekNumber; // Adjusting Sunday to 7

  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  ); // Day of the year
  const weeksPassed = Math.ceil(dayOfYear / 7); // Number of weeks passed in the year

  return {
    dateTimeString,
    dayOfWeekNumber,
    dayOfYear,
    weeksPassed,
  };
}

function getQuote() {
  fetch("https://api.quotable.io/random")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      quote.textContent = data.content;
      author.textContent = data.author;
    });
}

function refreshTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (hour === 0 && minute === 0) {
    hour = 24; // Adjusting hour to 24 for midnight
  }

  // Format the hour and minute values
  const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
  const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();

  // Concatenate the formatted hour and minute with a colon
  const currentTime = `${formattedHour}:${formattedMinute}`;
  timeNow.textContent = currentTime;
  getCurrentDateTime();
  const currentDateTime = getCurrentDateTime();
  if (hour < 12) {
    weatherCurrently.textContent = "Good Morning, it's currently";
    background.classList.replace("night", "day");
    background.classList.add("day");
    weatherImg.src =
      "	https://emestabillo-clock-app.vercel.app/assets/desktop/icon-sun.svg";
  } else if (hour < 18) {
    weatherCurrently.textContent = "Good Afternoon, it's currently";
  } else {
    weatherCurrently.textContent = "Good Evening, it's currently";
    background.classList.replace("day", "night");
    background.classList.add("night");
    weatherImg.src =
      "	https://emestabillo-clock-app.vercel.app/assets/desktop/icon-moon.svg";
  }
  weekDay.textContent = currentDateTime.dayOfWeekNumber;
  weekNumber.textContent = currentDateTime.weeksPassed;
  yearDay.textContent = currentDateTime.dayOfYear;
}

refreshTime();
getQuote();
