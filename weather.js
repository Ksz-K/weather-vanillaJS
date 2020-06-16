class Weather {
  constructor(placeID) {
    (this.apiKey = "8bb9e356ac5d904ff26f0ca340138191"),
      (this.placeID = placeID);
  }

  //Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${this.placeID}&appid=${this.apiKey}`
    );

    const responseData = await response.json();
    return responseData;
  }

  //Change weather location
  changeLocation(placeID) {
    this.placeID = placeID;
  }
}
