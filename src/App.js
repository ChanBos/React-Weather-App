// Imported hooks and react libraries.
import React, { useState, useEffect } from 'react';
// Imported stylesheet.
import './App.css';
// Imported components.
import Header from './components/Header';
import Footer from './components/Footer';
// Imported countries from i18n-iso-countries to get the iso code and return the country name in English.
import countries from 'i18n-iso-countries';
// Imported icons from Font Awesome.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudSunRain,
  faHandHoldingWater,
  faHandSparkles,
  faMapMarkerAlt,
  faSearchLocation,
  faTemperatureHigh,
  faTemperatureLow,
  faWind
} from '@fortawesome/free-solid-svg-icons';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // Setting the initial states of the app to store the response and the locations. Using the useState hook to set the data. Showing Durban as 
  // an example.
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Durban');
  const [state, setState] = useState('Durban');

  // Constructing the API URL and accessing the key via the process.env variable.
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${apiKey}`;
  console.log (process.env.REACT_APP_API_KEY);

  // Using the useEffect hook to fetch the data from the API to store and render once the API's URL changes.
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  // Constructed an input handler to get the data once requested and to store in the getState.
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  // Constructed a submit handler to handle the request once the search button is clicked.
  const submitHandler = () => {
    setState(getState);
  };

  // Constructed a kelvin to celsius converter to output the temperature in celsius.
  const kelvinToCelsius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  // Constructed a miles to kilometers converter to output the temperature in kilometers.
  const milesToKilometers = (k) => {
    return (k * 3.6).toFixed(2);
  };

  // Created a function to capitalize the first letters of each part of the countries' names.
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Returning the data. Included the React Bootstrap stylesheet's link and called the "Header" and "Footer" components below. I also called the
  // following from the API:

  // {apiData.weather[0].icon} - The icon displaying the current conditions.
  // {apiData.name} - The city's name.
  // {countries.getName(apiData.sys.country, 'en', { select: 'official', })} - The country's name with the first letters capitalized.
  // {kelvinToCelsius(apiData.main.temp_min)} - The minimum temperature.
  // {kelvinToCelsius(apiData.main.temp_max)} - The maximum temperature.
  // {kelvinToCelsius(apiData.main.feels_like)} - The "feels like" temperature, taking into account the temperatures and conditions.
  // {apiData.weather[0].main} - The summarized condition.
  // {capitalizeFirstLetter(apiData.weather[0].description)} - The full condition's description.
  // {apiData.main.humidity} - The humidity percentage.
  // {milesToKilometers(apiData.wind.speed)} - The wind speed.

  // Called the inputHandler (input section) and submitHandler (button) to get the current state's values and added Font Awesome icons. Also 
  // added a loading message for if the page load takes a while. Currently only shows if there is no input or upon refresh.
  return (
    <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
      <Header />

      <div className="container">
        <div className="searchsection">
          <label htmlFor="location-name">Enter Location:</label>
          <input
            type="text"
            id="location-name"
            onChange={inputHandler}
            value={getState}
          />
          <button onClick={submitHandler}><FontAwesomeIcon icon={faSearchLocation} /></button>
        </div>

        <div className="mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData.main ? (
            <div id="weathercontainer">
              <div id="mainweather">
                <img
                  src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
                <p className="h2">{kelvinToCelsius(apiData.main.temp)}&deg;C</p>
                <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> {apiData.name}</h3>
                <h3>{countries.getName(apiData.sys.country, 'en', { select: 'official', })}</h3>
              </div>

              <div className="temperatureconditions">
                <div id="temperature">
                  <h5>Temperature:</h5>
                  <p><FontAwesomeIcon icon={faTemperatureLow} /> {kelvinToCelsius(apiData.main.temp_min)}&deg;C</p>
                  <p><FontAwesomeIcon icon={faTemperatureHigh} /> {kelvinToCelsius(apiData.main.temp_max)}&deg;C</p>
                  <p><FontAwesomeIcon icon={faHandSparkles} /> Feels like: {kelvinToCelsius(apiData.main.feels_like)}&deg;C</p>
                </div>
                <div id="conditions">
                  <h5>Conditions:</h5>
                  <p><FontAwesomeIcon icon={faCloudSunRain} /> {apiData.weather[0].main}: {capitalizeFirstLetter(apiData.weather[0].description)}</p>
                  <p><FontAwesomeIcon icon={faHandHoldingWater} /> Humidity: {apiData.main.humidity}%</p>
                  <p><FontAwesomeIcon icon={faWind} /> Wind Speed: {milesToKilometers(apiData.wind.speed)} km/h</p>
                </div>
              </div>
            </div>
          ) : (
            <h1 id="loading">Weather Bot is Loading...</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Exported App to Index.js.
export default App;