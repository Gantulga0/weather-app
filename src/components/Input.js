import React from 'react';

const Input = ({
  loading,
  countriesSearch,
  handleChange,
  dropdownVisible,
  filteredData,
  handleCityClick,
}) => {
  return (
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
            filteredData.map((country, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCityClick(country)}
              >
                {country}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Input;
