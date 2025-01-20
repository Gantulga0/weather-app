import React, { useEffect } from 'react';

const weatherImages = {
  Sunny:
    'https://pinecone-academy-weather-app.vercel.app/_next/image?url=%2Fsun.png&w=640&q=75',
  Storm:
    'https://s3-alpha-sig.figma.com/img/48c4/875d/ba401cc991766e88dd3ca79e1994751f?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAhEJ-ps9pTOCo3G7FRq9bJqPSidMzBhFPpvwPlOaO85I~twvtUh6aFqMarwF~8pFg~wjY21YByFph-scxY2ov7ui7ORKjq7DdOqNmqZSzRiXbia0TD-u~AIeYm7FE6sUq9FT1iF-VW~oOOW-MMOWLgEzediPI1Pk7tGPc0Z1hVvSssETISheSpCCImMmx1q-0HO3pjVjcLYNvy~0yrT6gSsJiSjv0xh43-lf5tP4BDKm21akeUOGdAB7ku~CZuuuFwEuxg7RGrBqL5fsCVbet0b5iADiQmoBt5Q8RU3nbgveswMKsmmVMMnxBRZoU5Ud99U4UsfNvlMJRTdV9KOkg__',
  Snow: 'https://s3-alpha-sig.figma.com/img/0e3a/6228/609812788f4e58d757eb38529a991ff6?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8pJe1OQoSjmrD~82LUglKcwUrAzAZY~hT4ODXzzGS-O9r6RFlWjy3OB4vbvsMpdZIvocwJLqDC8oV3ojhL3suex6HD6wprVFmfmodr67KFv9~dX1gXv5DVNBjFfZcxGxFLaL87CdOaVVZYzhTUI7YW0YUA39Gis42UR7RAvBRRNDVURkiwI72wqPE-u9e097Ckg0hDvL1TgBeXbvRT~j9QEbsb0AIkB9qAAwhmvOczM7tT7TgyyYbOBphE9~nKbLO4blgvjFcjbKiAKdPlX8FNKL6vCUpgswSdXRetNQSzeElOIxe81YizQ4Iqb8ahqQmU5NstGsnIhldgephRc4w__',
  Rain: 'https://s3-alpha-sig.figma.com/img/bc4b/aa63/6ebd08978462908e36459d2bc23076aa?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FY-HbX4RXu2qZCSGONDvlwYUM6jrLXQkPFjibF0z4lsq3zdtHyievAtsiewc78UBrJbbzG6MWtSXaoOUG6LDwPYYFENEYx8dDeedLms2OOEanMO6dQp2Q3PMqG6J0jCiGuiKWJ-wHTLzcnbPiC8bVnyv3CE4JuDnpgn1gE-vhJfcq866J~vywfBlem~yIIZ88gN2gBymfkfZsTa79asXe5zoDQP-~uW4F0nKyEu95JY917d4eRuRrat7TFwinMW2aTeLJkYCkJFn6FuytFLD-sYu4b7L0DwzA6HhOjPwv02PUGe3UHYeJUxDw-pCLLlc04Z0UoJypoG59lho3PZJJA__',
  Windy:
    'https://s3-alpha-sig.figma.com/img/e9e5/9e83/4e34283c0b1193edb5dbf42a07b0a7f8?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SbZJ6L8aG-7Y5SYOo77Jjv26mutZP8mX-yF4Z7hB17kwr0b0kWphGdxgC3FsXimEHH7f7rH8YXBBrb6-JfxHQ1gk8N5izhnjDYnBAwJS4JKaUa8aaZfqZmyxVZkZXnLvefOpGxL7S~CiLLKqnEVLSQLlN0WBjFi~lFW854umghw9wGAsscYYpUf6JeqBCh0kQwjC9YL93Yu-0QYfVW-rsqSFqTxicnzu2l0d-tH3f~SY8xieR22yj4d7N3c~2B6H2ubD4ORKwxVEfKnajx-eC62Yke0sJVRYIYS8bdxssVZ9brL-5kmAAgE8IH4nwQ6CMdz-Ncf1YU94Y1QBaaNFww__',
  Cloudy:
    'https://s3-alpha-sig.figma.com/img/d903/5d9b/37951bf8dd709e5e657a1532899f0b55?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N8I3VWZmyvOGiJLEz2B6n9-~2FKf~0VHkQN5XQT2Yhxq7e1OWcZkPIVpGkNuurg1JsfJUkWYjxrLkaVYEJ28wQC88GHYDuE~yRUBXqXT1Gxfb12xT8ncgm21YtZ~8AXhRQu9IDoN478wtKEQDapG6jnUIylQw1IgFh~O0t1YhOxu5rHGvExPSka~g~epcKZOZ5OwMlE-paDHz4wXbjyAPJQyR-loQTa7p4N7sLzye8-WNGlCb7xTfvKkL~xoYADiKD-~CilXd0KWQe-ibUy3su13Vcam3QhKqPQE~GfYu2LUEqlpLRZZIim5q7dLBmZG2rSQTcnjfctHefy-MITYgA__',
};

const Right = ({
  weatherLoading,
  weatherData,
  setWeatherLoading,
  setWeatherData,
  selectedCity,
}) => {
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

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const getWeatherImage = (condition) => {
    if (condition.includes('Sunny')) return weatherImages.Sunny;
    if (condition.includes('Storm')) return weatherImages.Storm;
    if (condition.includes('Snow')) return weatherImages.Snow;
    if (condition.includes('Freezing fog')) return weatherImages.Snow;
    if (condition.includes('Rain')) return weatherImages.Rain;
    if (condition.includes('Patchy rain nearby')) return weatherImages.Rain;
    if (condition.includes('Windy')) return weatherImages.Windy;
    if (condition.includes('Partly cloudy')) return weatherImages.Cloudy;
    if (condition.includes('Cloudy')) return weatherImages.Cloudy;
    if (condition.includes('Overcast')) return weatherImages.Cloudy;
    if (condition.includes('Mist')) return weatherImages.Cloudy;
    return weatherImages.Sunny;
  };

  return (
    <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen">
      <div className="flex relative w-[414px] h-[828px] justify-center z-10 ">
        <div className="z-20 w-full h-5/6 z-20 rounded-[10.5px] overflow-hidden shadow-lg bg-white/75 backdrop-blur-m">
          {weatherLoading ? (
            <div className="text-black flex justify-center items-center h-full">
              <p>Loading weather data...</p>
            </div>
          ) : (
            weatherData && (
              <div className="text-black">
                <p className="text-gray-400 m-5">
                  {weatherData.forecast?.forecastday[0]?.date}
                </p>
                <h2 className=" flex justify-center h-12 text-5xl font-extrabold text-gray-900">
                  {weatherData.location?.name}
                </h2>
                <div className="px-10 py-14 backdrop-blur-lg flex items-center justify-center">
                  <div className="flex items-center justify-center w-72 h-72">
                    <img
                      className="absolute object-cover w-72 h-72"
                      src={getWeatherImage(weatherData.current?.condition.text)}
                      alt="Weather condition"
                    />
                  </div>
                </div>
                <div className="px-10">
                  <p className="text-transparent bg-clip-text font-extrabold text-[90px] bg-gradient-to-b from-black to-white">
                    {weatherData.forecast?.forecastday[0]?.day.maxtemp_c}°C
                  </p>
                  <p className="font-extrabold mb-12 h-6 text-indigo-400">
                    {weatherData.current?.condition.text}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Right;
