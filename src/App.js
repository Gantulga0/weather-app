import React, { useEffect, useState } from 'react';
import citiesFilter from './utils/citiesFilter';

function App() {
  const [countriesSearch, setcountriesSearch] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setselectedCity] = useState('Ulan bator');
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);

  console.log(loading);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries'
      );
      const result = await response.json();
      console.log(result);

      const countriesAndcities = citiesFilter(result.data);
      setCities(countriesAndcities);
      setfilteredData(countriesAndcities);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (city) => {
    setWeatherLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=2e426e1ecbac4ca4ae622051251501&q=${city}&days=1&aqi=yes&alerts=yes`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleChange = (event) => {
    setcountriesSearch(event.target.value);
    setfilteredData(
      cities
        .filter((city) =>
          city.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())
        )
        .slice(0, 5)
    );
    setDropdownVisible(true);
  };

  const handleCityClick = (city) => {
    setselectedCity(city);
    fetchWeatherData(city);
    setDropdownVisible(false);
    setcountriesSearch('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchWeatherData('Ulan bator');
  }, [selectedCity]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen">
        <svg
          width="70"
          height="140"
          viewBox="0 0 70 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[48%] left-[94%] z-20"
        >
          <circle opacity="0.1" cx="70" cy="70" r="69.5" stroke="black" />
        </svg>
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[48%] left-[94%] z-10"
        >
          <circle cx="50" cy="50" r="50" fill="white" />
        </svg>
        <svg
          width="43"
          height="86"
          viewBox="0 0 43 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[50%] left-[96%] z-20"
        >
          <path
            d="M16.1296 7.58989L2.54477 32.8821C0.849461 36.0473 0 39.5213 0 43C0 46.4791 0.849461 49.9523 2.54477 53.1179L16.1296 78.4105C18.6335 83.0823 23.5304 86 28.8593 86H43.2889V78.835H43.2842C40.622 78.835 38.1737 77.3781 36.9216 75.0428L23.3418 49.7455C22.2069 47.6366 21.6413 45.3208 21.6413 43C21.6413 40.6788 22.2069 38.363 23.3418 36.2549L36.9216 10.9577C38.1737 8.62162 40.622 7.16533 43.2842 7.16533H43.2889V0H28.8593C23.5304 0 18.6335 2.91825 16.1296 7.58989Z"
            fill="#111111"
          />
        </svg>
        <svg
          width="44"
          height="86"
          viewBox="0 0 44 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[50%] left-[101%] z-20"
        >
          <path
            d="M40.7442 32.882L27.1599 7.58993C24.6554 2.91778 19.7591 0 14.43 0H0V7.16486H0.00510914C2.66726 7.16486 5.11563 8.62166 6.36732 10.9572L19.9469 36.2543C21.0827 38.3633 21.647 40.679 21.647 42.9999C21.647 45.3211 21.0827 47.6368 19.9469 49.7454L6.36732 75.0423C5.11563 77.3783 2.66726 78.8345 0.00510914 78.8345H0V85.9999H14.43C19.7591 85.9999 24.6554 83.0821 27.1599 78.41L40.7442 53.1177C42.4388 49.9526 43.2889 46.4785 43.2889 42.9999C43.2889 39.5211 42.4388 36.0475 40.7442 32.882Z"
            fill="#111111"
          />
        </svg>

        <svg
          width="733.33"
          height="1100"
          viewBox="0 0 733.33 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[100%] z-10"
        >
          <path
            d="M800 0H0V497C0 510.807 11.4776 521.604 24.5822 525.953C55.6155 536.25 78 565.511 78 600C78 634.489 55.6155 663.75 24.5822 674.047C11.4776 678.396 0 689.193 0 703V1150C0 1177.61 22.3858 1200 50 1200H800V0Z"
            fill="#0F141E"
          />
          <circle opacity="0.1" cy="600" r="169.5" stroke="white" />
          <circle opacity="0.1" cy="600" r="269.5" stroke="white" />
          <circle opacity="0.08" cy="600" r="469.5" stroke="white" />
          <circle opacity="0.06" cy="600" r="669.5" stroke="white" />
        </svg>
        <svg
          width="733.33"
          height="1100"
          viewBox="0 0 733.33 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[35%] z-10"
          transform="scale(-1, 1)"
        >
          <circle opacity="0.1" cx="0" cy="600" r="269.5" stroke="#111827" />
          <circle opacity="0.08" cx="0" cy="600" r="469.5" stroke="#111827" />
          <circle opacity="0.06" cx="0" cy="600" r="669.5" stroke="#111827" />
          <circle opacity="0.04" cx="0" cy="600" r="869.5" stroke="#111827" />
        </svg>
        <svg
          width="170"
          height="340"
          viewBox="0 0 170 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[85%] top-[466px] z-10"
        >
          <circle opacity="0.08" cx="170" cy="170" r="169.5" stroke="black" />
        </svg>

        <div className="flex relative w-[414px] h-[828px] justify-center z-10 ">
          <div className="z-20 w-full h-5/6 z-20 rounded-[10.5px] overflow-hidden shadow-lg bg-white/75 backdrop-blur-xl">
            {weatherLoading ? (
              <div className="text-black flex justify-center items-center h-full">
                <p>Loading weather data...</p>
              </div>
            ) : (
              weatherData && (
                <div className="text-black">
                  <p className="text-gray-400 m-5">
                    {weatherData.forecast.forecastday[0].date}
                  </p>
                  <h2 className=" flex justify-center h-12 text-5xl font-extrabold text-gray-900">
                    {weatherData.location.name}
                  </h2>
                </div>
              )
            )}
            <div className="px-10 py-14 backdrop-blur-lg flex items-center justify-center">
              <div className="flex items-center justify-center w-72 h-72">
                <img
                  className="absolute object-cover w-72 h-72"
                  src="https://pinecone-academy-weather-app.vercel.app/_next/image?url=%2Fsun.png&w=640&q=75"
                />
              </div>
            </div>
            <div className="px-10">
              {weatherData && (
                <div className="text-black">
                  <p className="text-transparent bg-clip-text font-extrabold text-[90px] bg-gradient-to-b from-black to-white">
                    {weatherData.forecast.forecastday[0].day.maxtemp_c}°C
                  </p>
                  <p className="font-extrabold mb-12 h-6 text-indigo-400">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="absolute w-40 z-30 h-40 left-[45%] top-[20%]">
        <input
          disabled={loading}
          type="text"
          onChange={handleChange}
          value={countriesSearch}
          placeholder="Search"
          className="px-4 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && <div className="text-red">loading</div>}
        {dropdownVisible && (
          <div className="absolute top-[20%] mt-2 w-60 bg-white border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
            {countriesSearch.length > 0 &&
              filteredData.map((country, index) => {
                return (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCityClick(country)}
                  >
                    {country}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen bg-[rgb(15,20,30)]">
        <div className="flex relative w-[414px] h-[828px] justify-center z-10">
          <div className="z-20 w-full h-5/6 rounded-[10.5px] overflow-hidden shadow-lg bg-[#111827]/75 backdrop-blur-xl">
            <div>
              {weatherLoading ? (
                <div className="text-white flex justify-center items-center h-full">
                  <p>Loading weather data...</p>
                </div>
              ) : (
                weatherData && (
                  <div className="text-white">
                    <p className="text-gray-400 m-5">
                      {weatherData.forecast.forecastday[0].date}
                    </p>
                    <h2 className=" flex justify-center h-12 text-5xl font-extrabold text-white">
                      {weatherData.location.name}
                    </h2>
                  </div>
                )
              )}
            </div>
            <div className="px-10 py-14 backdrop-blur-lg flex items-center justify-center">
              <div className="flex justify-between items-center"></div>
              <div className="flex items-center justify-center w-72 h-72">
                <img
                  className="absolute object-cover w-72 h-72"
                  src="https://pinecone-academy-weather-app.vercel.app/_next/image?url=%2Fmoon.png&w=640&q=75"
                />
              </div>
            </div>
            <div className="px-10">
              {weatherData && (
                <div className="text-white">
                  <p className="text-transparent bg-clip-text font-extrabold text-[90px] bg-gradient-to-b from-black to-white">
                    {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                  </p>
                  <p className="font-extrabold mb-12 h-6 text-yellow-200">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default App;
