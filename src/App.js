import React, { useEffect, useState } from 'react';

function App() {
  const [countriesSearch, setcountriesSearch] = useState('');
  const [countriesData, setcountriesData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setcities] = useState([]);

  const fetchData = () => {
    setLoading(true);
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((result) => {
        setcountriesData(result.data);
        setfilteredData(result.data);
      })
      .catch((error) => {
        console.log('Error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchWeatherData = (city) => {
    setLoading(true);
    const weatherApiKey =
      'https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}';
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log('Error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filterData = () => {
    setfilteredData(
      countriesData.filter((item) =>
        item.country.toLowerCase().includes(countriesSearch.toLowerCase())
      )
    );
  };

  const handleChange = (event) => {
    setcountriesSearch(event.target.value);
  };

  const handleCityClick = (city) => {
    fetchWeatherData(city);
  };

  useEffect(() => {
    filterData();
  }, [countriesSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center`}>
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-center text-4xl font-semibold text-gray-800">
          Weather App
        </h1>

        <input
          onChange={handleChange}
          placeholder="Enter location"
          className="w-full px-4 py-2 text-lg rounded-full bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="overflow-y-auto max-h-64">
          {filteredData.map((country, index) => (
            <div key={index} onClick={() => handleCityClick(country.country)}>
              {country.country}
            </div>
          ))}
        </div>
        {loading && <div>Loading...</div>}
        {weatherData && weatherData.location && weatherData.current && (
          <div>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Weather: {weatherData.current.condition.text}</p>
          </div>
        )}
        <button
          onClick={fetchData}
          className="w-full py-2 mt-4 bg-blue-600 rounded-full text-lg font-semibold focus:outline-none hover:bg-blue-500 transition-all"
        >
          Get Weather
        </button>
      </div>
    </div>
  );
}

export default App;
