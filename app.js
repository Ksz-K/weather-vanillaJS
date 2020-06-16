//Init local storage
const storage = new Storage();
//Get storaed location data
const weatherLocation = storage.getLocationData();

//Init weather object
const weather = new Weather(weatherLocation.locationID);

//Init UI
const ui = new UI();

//Get weather on DOM load
document.addEventListener("DOMContentLoaded", getWeather);

//Populate country & city select
let countrySelected;
const countries = [...new Set(cities.map((item) => item.country))];
const selectCountry = document.getElementById("country");

countries.sort().forEach((country) => {
  const CountryOption = document.createElement("option");
  CountryOption.innerText = country;
  CountryOption.value = country;
  CountryOption.selected = country === "PL";
  selectCountry.appendChild(CountryOption);
});

const populateCities = (country = "PL") => {
  countrySelected = cities.filter((item) => item.country === country).sort();

  countrySelected.forEach((city) => {
    const selectCity = document.querySelector("#city");
    const CityOption = document.createElement("option");
    CityOption.innerText = city.name;
    CityOption.value = city.name;
    selectCity.appendChild(CityOption);
  });
};
populateCities();

selectCountry.addEventListener("change", () => {
  $("#city option").remove();
  populateCities(document.getElementById("country").value);
});

//Change location event
document.getElementById("w-change-btn").addEventListener("click", (e) => {
  const city = document.getElementById("city").value;
  const citySelected = countrySelected.filter((item) => item.name === city);
  const locationID = citySelected[0].id;
  //Change location
  weather.changeLocation(locationID);

  //Set location in LocalStorage
  storage.setLocationData(locationID);

  //Get and display weather
  getWeather();

  //Close modal
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
    })
    .catch((err) => console.log(err));
}
