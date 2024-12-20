const apiKey = '3209f1d2ef53a97c36f16048662cbb74'; // OpenWeatherMap API key
const submitBtn = document.getElementById('submit-btn');
const cityInput = document.getElementById('city-input');
const locationDisplay = document.getElementById('location');
const descriptionDisplay = document.getElementById('description');
const temperatureDisplay = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

submitBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    return;
  }
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMessage.textContent = error.message;
    clearWeatherData();
  }
}

function displayWeather(data) {
  errorMessage.textContent = '';
  locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
  descriptionDisplay.textContent = data.weather[0].description;
  temperatureDisplay.textContent = `${data.main.temp} °C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function clearWeatherData() {
  locationDisplay.textContent = '';
  descriptionDisplay.textContent = '';
  temperatureDisplay.textContent = '';
  weatherIcon.src = '';
}
