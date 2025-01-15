import React, { useEffect, useState } from 'react';
import citiesFilter from './utils/citiesFilter';

function App() {
  const [countriesSearch, setcountriesSearch] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries'
      );
      const result = await response.json();
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
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=2e426e1ecbac4ca4ae622051251501&q=${city}&days=1&aqi=yes&alerts=yes`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    if (!countriesSearch) {
      setfilteredData(cities);
    } else {
      setfilteredData(
        cities
          .filter((city) =>
            city.toLowerCase().startsWith(countriesSearch.toLocaleLowerCase())
          )
          .slice(0, 5)
      );
    }
  };

  const handleChange = (event) => {
    setcountriesSearch(event.target.value);
  };

  useEffect(() => {
    filterData();
  }, [countriesSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {loading && <div>loading</div>}
      <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen">
        <div className="flex relative w-[414px] h-[828px] justify-center z-10">
          <div className="z-20 w-full h-5/6 rounded-[10.5px] overflow-hidden shadow-lg bg-white/75">
            <div className="space-y-12 px-10 py-14 backdrop-blur-lg flex items-center justify-center">
              <div className="flex items-center justify-center w-72 h-72">
                <img
                  className="absolute object-cover w-72 h-72"
                  src="https://pinecone-academy-weather-app.vercel.app/_next/image?url=%2Fsun.png&w=640&q=75"
                />
              </div>
            </div>
            <div className="px-12"></div>
          </div>
          <div></div>
        </div>
      </section>
      <div className="absolute w-full z-30 top-0 left-0 flex items-center justify-center h-full">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search"
          className="px-4 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute top-[600px] mt-2 w-60 bg-white border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {countriesSearch.length > 0 &&
            filteredData.map((country, index) => {
              return (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  {country}
                </div>
              );
            })}
        </div>
      </div>
      <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen bg-[rgb(15,20,30)]">
        <div className="flex relative w-[414px] h-[828px] justify-center z-10">
          <div className="z-20 w-full h-5/6 rounded-[10.5px] overflow-hidden shadow-lg bg-[#111827]/75 backdrop-blur-md">
            <div className="space-y-12 px-10 py-14 backdrop-blur-lg flex items-center justify-center">
              <div className="flex justify-between items-center"></div>
              <div className="flex items-center justify-center w-72 h-72">
                <img
                  className="absolute object-cover w-72 h-72"
                  src="https://pinecone-academy-weather-app.vercel.app/_next/image?url=%2Fmoon.png&w=640&q=75"
                />
              </div>
            </div>
            <div className="px-12"></div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default App;
