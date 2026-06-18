const API_KEY = "e925e26c5d4cbcc1f4f72ecb6965b1a9";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");

const cityName = document.getElementById("cityName");
const desc = document.getElementById("desc");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const coords = document.getElementById("coords");
const updated = document.getElementById("updated");
const extra = document.getElementById("extra");
const icon = document.getElementById("weatherIcon");
const status = document.getElementById("status");

function updateUI(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  desc.textContent = data.weather[0].description;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} m/s`;
  pressure.textContent = `${data.main.pressure} hPa`;
  coords.textContent = `${data.coord.lat}, ${data.coord.lon}`;
  updated.textContent = new Date().toLocaleTimeString();
  extra.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

async function fetchWeather(url) {
  status.textContent = "Fetching weather...";
  const res = await fetch(url);
  if (!res.ok) {
    status.textContent = "City not found";
    return;
  }
  const data = await res.json();
  updateUI(data);
  status.textContent = "Updated";
}

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
};

geoBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
  });
};
