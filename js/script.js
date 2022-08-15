import playList from "./playList.js";
import langArr from "./lang.js";
import quotes from "./data.js";
console.log(playList);
console.log(langArr);

const time = document.querySelector(".time");

// function showTime() {
// const dateOne = new Date();
// const currentTime = dateOne.toLocaleTimeString();
//  time.textContent = currentTime;
//  setTimeout(showTime, 1000);

// }
// showTime();
function showTime() {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  time.textContent = hour + ":" + min + ":" + sec;
  let t = setTimeout(function () {
    showTime();
  }, 1000);
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

showTime();

const date = document.querySelector(".date");
function showDay() {
  let hash = window.location.hash;
  hash = hash.substr(1);
  const currentDay = new Date();

  if (hash == "en") {
    const d = `${new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(currentDay)}, ${new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDay)} ${currentDay.getDate()}`;
    date.textContent = d;
  }
  if (hash == "ru" || hash == "be") {
    const d = `${new Intl.DateTimeFormat("ru", {
      weekday: "long",
    }).format(currentDay)},  ${currentDay.getDate()}, ${new Intl.DateTimeFormat(
      "ru",
      { month: "long" }
    ).format(currentDay)}`;
    date.textContent = d;
  }

  setTimeout(showDay, 10000);
}
showDay();

const baseMorning = "https://oreshkevich.github.io/moment/images/morning/";
const baseDay = "https://oreshkevich.github.io/moment/images/afternoon/";
const baseEvening = "https://oreshkevich.github.io/moment/images/evening/";
const baseNight = "https://oreshkevich.github.io/moment/images/night/";
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
let i = 0;

const btn = document.querySelector(".slide-prev");
const btnNext = document.querySelector(".slide-next");

function browsePicture(src) {
  let block = document.getElementById("block");
  block.style.backgroundImage = "url(" + `${src}` + ")";
}

function getPicture(n) {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let index = random(0, 18);

  let date = new Date();
  let j = date.getHours();
  let imageSrc;
  if (j >= 0 && j < 6) imageSrc = baseNight + images[index];
  if (j >= 6 && j < 12) imageSrc = baseMorning + images[index];
  if (j >= 12 && j < 18) imageSrc = baseDay + images[index];
  if (j >= 18 && j <= 23) imageSrc = baseEvening + images[index];
  browsePicture(imageSrc);

  if (n >= 0) {
    let index = i % images.length;

    let date = new Date();
    let j = date.getHours();
    let imageSrc;
    if (j >= 0 && j < 6) imageSrc = baseNight + images[index];
    if (j >= 6 && j < 12) imageSrc = baseMorning + images[index];
    if (j >= 12 && j < 18) imageSrc = baseDay + images[index];
    if (j >= 18 && j <= 23) imageSrc = baseEvening + images[index];
    browsePicture(imageSrc);
    i = i + 1;
  } else if (n < 0) {
    let index = Math.abs(19 - i);
    i = i + 1;
    if (i > 19) {
      i = 1;
    }

    let date = new Date();
    let j = date.getHours();
    let imageSrc;
    if (j >= 0 && j < 6) imageSrc = baseNight + images[index];
    if (j >= 6 && j < 12) imageSrc = baseMorning + images[index];
    if (j >= 12 && j < 18) imageSrc = baseDay + images[index];
    if (j >= 18 && j <= 23) imageSrc = baseEvening + images[index];
    browsePicture(imageSrc);
  }
}
// btn.addEventListener('click', getPicture);
btn.addEventListener("click", function () {
  getPicture(-1);
});
btnNext.addEventListener("click", function () {
  getPicture(1);
});

getPicture();

const audio = new Audio();
const playBtn = document.querySelector(".play");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
// audio.src = 'https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3';
audio.src = playList[0].src;

function playAudio() {
  audio.currentTime = 0;
  if (audio.paused || audio.ended) {
    switchTreck(3);
  } else {
    audio.pause();
  }
}

function toggleBtn() {
  playBtn.classList.toggle("pause");
}

playBtn.addEventListener("click", toggleBtn);
playBtn.addEventListener("click", playAudio);

const playListContainer = document.querySelector(".play-list");
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  playListContainer.append(li);
  li.classList.add("play-item");
  li.innerText = `${playList[i].title}`;
}

let treck;
function switchTreck(numTreck) {
  audio.src = playList[numTreck].src;

  //     audio.onended=function(){
  //       let i = 1;
  //       audio.src = playList[i].src;
  //       i++;
  //     audio.play();
  //     console.log(i);
  // }
  let playItem = document.querySelectorAll(".play-item");
  playItem.forEach((elem) => {
    elem.classList.remove("item-active");
  });

  playItem[numTreck].classList.add("item-active");
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add("pause");
  let track = document.getElementById("track");

  track.innerHTML = `${playList[numTreck].title}`;
}

var currentSong = 0;
audio.addEventListener("ended", function () {
  audio.pause();
  audio.currentTime = 0;
  // document.getElementById('seek').value = 0;
  if (currentSong + 1 >= 3) {
    currentSong = 0;
  } else {
    currentSong++;
  }

  // audio.pause();
  audio.src = playList[currentSong];
  switchTreck(currentSong);
});

playPrev.addEventListener("click", function () {
  if (treck > 0) {
    treck--;
    switchTreck(treck);
  } else {
    treck = 3;
    switchTreck(treck);
  }
});

playNext.addEventListener("click", function () {
  if (treck < 3) {
    treck++;
    switchTreck(treck);
  } else {
    treck = 0;
    switchTreck(treck);
  }
});
const volume = document.getElementById("volume");
const muteButton = document.getElementById("mute-button");

function updateVolume() {
  if (audio.muted) {
    audio.muted = false;
  }
  audio.volume = volume.value;
}
volume.addEventListener("input", updateVolume);
console.log(volume);

function updateVolumeIcon() {
  if (audio.muted || audio.volume === 0) {
    muteButton.style.opacity = 0.4;
  } else {
    muteButton.style.opacity = 1;
  }
}
audio.addEventListener("volumechange", updateVolumeIcon);

function toggleMute() {
  audio.muted = !audio.muted;

  if (audio.muted) {
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

muteButton.addEventListener("click", toggleMute);

const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const seek = document.getElementById("seek");

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

function initializeAudio() {
  const audioDuration = Math.round(audio.duration);
  seek.setAttribute("max", audioDuration);
  progressBar.setAttribute("max", audioDuration);
  const time = formatTime(audioDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
}

function updateTimeElapsed() {
  const time = formatTime(Math.round(audio.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
}

function updateProgress() {
  seek.value = Math.floor(audio.currentTime);
  progressBar.value = Math.floor(audio.currentTime);
}

function skipAhead(event) {
  const skipTo = event.target.dataset.seek
    ? event.target.dataset.seek
    : event.target.value;
  audio.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}
audio.addEventListener("loadedmetadata", initializeAudio);
audio.addEventListener("timeupdate", updateTimeElapsed);
audio.addEventListener("timeupdate", updateProgress);
seek.addEventListener("input", skipAhead);

const greeting = document.querySelector(".greeting");

// greeting.innerHTML = 'Good morning';

function getHi() {
  let hash = window.location.hash;
  hash = hash.substr(1);
  console.log(hash);
  let date = new Date();
  let j = date.getHours();
  if (j >= 0 && j < 6) greeting.innerHTML = langArr["night"][hash];
  if (j >= 6 && j < 12) greeting.innerHTML = langArr["morning"][hash];
  if (j >= 12 && j < 18) greeting.innerHTML = langArr["afternoon"][hash];
  if (j >= 18 && j <= 23) greeting.innerHTML = langArr["evening"][hash];
}
getHi();

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");
console.log(city.value);

async function getWeather() {
  //  if () {
  // weatherError.textContent =  "Error! city not found for" + `${city.value}` ;

  //  } else
  let hash = window.location.hash;
  hash = hash.substr(1);
  console.log(hash);
  let url;
  if (city.value == "") {
    if (hash == "en") city.value = "Brest";
    if (hash == "ru") city.value = "Брест";
  } else {
    city.value = city.value;
    console.log(city.value);
  }

  if (hash == "en") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  }

  if (hash == "ru") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  }
  if (hash == "be") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&lang=be&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  }
  console.log(url);

  console.log(city.value);
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";

    // if (weatherIcon.classList.add(`owf-${data.weather[0].id}`) == undefined) {
    //   weatherError.textContent = "Error! city not found for";

    // }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = "";
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent =
      `${langArr["wind"][hash]}: ` + `${Math.round(data.wind.speed)} m/s`;
    humidity.textContent =
      `${langArr["humidity"][hash]}: ` + `${data.main.humidity} %`;
    city.value = data.name;

    console.log(city.value);
  } catch (err) {
    weatherError.textContent = "Error! city not found";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }
}

// getWeather()

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

// async function getQuotes() {
//    const url = `https://type.fit/api/quotes`;
//   const res = await fetch(url);
//   const data = await res.json();
//   const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

//  let indexTwo = random(0, 10);

//    quote.textContent = data[indexTwo].text;
//    author.textContent = data[indexTwo].author;

// }

function getQuotes() {
  let hash = window.location.hash;
  hash = hash.substr(1);
  let random = quotes[Math.floor(Math.random() * quotes.length)];

  if (hash == "en") {
    quote.textContent = random.text;
    author.textContent = random.author;
  }

  if (hash == "ru" || hash == "be") {
    quote.textContent = random.tex;
    author.textContent = random.auth;
  }
}
getQuotes();
changeQuote.addEventListener("click", getQuotes);

const select = document.querySelector("select");
const allLang = ["en", "ru", "be"];

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substr(1);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }
  select.value = hash;
  // document.querySelector('title').innerHTML = langArr['unit'][hash];
  // document.querySelector('.greeting').innerHTML = langArr['greeting'][hash];

  // console.log(langArr['greeting']);
  // for (let key in langArr) {
  //     let elem = document.querySelector(key);
  //     console.log(elem);
  //     if (elem) {
  //         elem.innerHTML = langArr[key][hash];
  //     }
  // }
}

changeLanguage();

const buttonWeather = document.querySelector(".button-weather");
const weather = document.querySelector(".weather");
// let hid = "hid";

buttonWeather.addEventListener("click", () => {
  weather.classList.toggle("hid");
});
const buttonTime = document.querySelector(".button-time");
buttonTime.addEventListener("click", () => {
  time.classList.toggle("hid");
});

const buttonPlay = document.querySelector(".button-play");
const player = document.querySelector(".player");
buttonPlay.addEventListener("click", () => {
  player.classList.toggle("hid");
});
const buttonDate = document.querySelector(".button-date");
const dateButton = document.querySelector(".date");
buttonDate.addEventListener("click", () => {
  dateButton.classList.toggle("hid");
});
const buttonWish = document.querySelector(".button-wish");
const greetingContainer = document.querySelector(".greeting-container");
buttonWish.addEventListener("click", () => {
  greetingContainer.classList.toggle("hid");
});
const buttonQuote = document.querySelector(".button-quote");
const quoteWrap = document.querySelector(".quote-wrap");
buttonQuote.addEventListener("click", () => {
  quoteWrap.classList.toggle("hid");
});
const buttonSettings = document.querySelector(".button-settings");
const todoSettings = document.querySelector(".todo-settings");

buttonSettings.addEventListener("click", () => {
  todoSettings.classList.toggle("vigorous");
});

const name = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
  // localStorage.setItem('weather', hid);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  // if(localStorage.getItem('weather')) {
  //   hid = localStorage.getItem('weather');
  // }
}
window.addEventListener("load", getLocalStorage);

// window.localStorage.clear ()
