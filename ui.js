class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.celsius = document.getElementById("w-celsius");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.feelsLike = document.getElementById("w-feelsLike");
    this.wind = document.getElementById("w-wind");
    this.pressure = document.getElementById("w-pressure");
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.celsius.innerHTML = `${(weather.main.temp * 1 - 272.15).toFixed(
      2
    )} <span>&deg;C</span>`;
    this.icon.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Wilgotność: ${weather.main.humidity}`;
    this.feelsLike.innerHTML = `Temperatura odczuwalna: ${(
      weather.main.temp * 1 -
      272.15
    ).toFixed(2)} <span>&deg;C</span>`;
    this.wind.textContent = `Szybkość wiatru: ${weather.wind.speed} m/s`;
    this.pressure.textContent = `Ciśnienie: ${weather.main.pressure} hPa`;
  }
}
