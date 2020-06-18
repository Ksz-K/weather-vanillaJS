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
let citiesOfcountrySelected;

const selectCountry = document.getElementById("country");
const selectCity = document.getElementById("city");

countries.sort().forEach((country) => {
  const CountryOption = document.createElement("option");
  CountryOption.innerText = country;
  CountryOption.value = country;
  country === "PL" ? (CountryOption.selected = true) : "";
  selectCountry.appendChild(CountryOption);
});

const populateCities = (citiesOfcountrySelected) => {
  citiesOfcountrySelected.forEach((city) => {
    const CityOption = document.createElement("option");
    CityOption.innerText = city.name;
    CityOption.value = city.name;
    selectCity.appendChild(CityOption);
  });
};

selectCountry.addEventListener("change", () => {
  $("#city option").remove();
  weather
    .getCities(selectCountry.value)
    .then((cities) => {
      citiesOfcountrySelected = cities;
      populateCities(cities);
    })
    .catch((err) => console.log(err));
});

//Change location event
document.getElementById("w-change-btn").addEventListener("click", (e) => {
  const city = document.getElementById("city").value;
  console.log(citiesOfcountrySelected);
  console.log(city);
  const citySelected = citiesOfcountrySelected.filter(
    (item) => item.name === city
  );
  console.log(citySelected);
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

  weather
    .getCities()
    .then((cities) => {
      citiesOfcountrySelected = cities;
      populateCities(cities);
    })
    .catch((err) => console.log(err));
}
