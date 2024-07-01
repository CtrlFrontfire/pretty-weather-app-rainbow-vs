function displayTemperature(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#weather-app-city");
  let currentConditionElement = document.querySelector(
    "#weather-app-condition"
  );
  let realFeelElement = document.querySelector("#feel-like");
  let realFeel = Math.round(response.data.temperature.feels_like);
  let pressureElement = document.querySelector("#current-pressure");
  let humidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#weather-app-timestamp");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  currentConditionElement.innerHTML = response.data.condition.description;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="condition-icon" />`;
  realFeelElement.innerHTML = `${realFeel}°`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let dateNow = date.getDate();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let formattedMonth = months[month];
  return `${day} ${dateNow} ${formattedMonth} ${year}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "d32099afo5328e0346f4tb17db5ff833";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let cityUserInput = document.querySelector("#search-input");
  searchCity(cityUserInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  apiKey = "d32099afo5328e0346f4tb17db5ff833";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
       <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div class="icon-wrapper">
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
           </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
            </div>
        </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
