import React, { useEffect, useState } from 'react';
import citiesFilter from './utils/citiesFilter';
import Right from './components/Right';
import Left from './components/Left';
import Input from './components/Input';
import Svg from './components/Svg';

function App() {
  const [countriesSearch, setcountriesSearch] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setselectedCity] = useState('Ulan bator');
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Svg />
      <Right
        weatherLoading={weatherLoading}
        weatherData={weatherData}
        setWeatherLoading={setWeatherLoading}
        setWeatherData={setWeatherData}
        selectedCity={selectedCity}
      />
      <Input
        loading={loading}
        countriesSearch={countriesSearch}
        handleChange={handleChange}
        dropdownVisible={dropdownVisible}
        filteredData={filteredData}
        handleCityClick={handleCityClick}
      />
      <Left
        weatherLoading={weatherLoading}
        weatherData={weatherData}
        setWeatherLoading={setWeatherLoading}
        setWeatherData={setWeatherData}
        selectedCity={selectedCity}
      />
    </div>
  );
}

export default App;
