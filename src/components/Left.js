import React, { useEffect } from 'react';

const weatherImages = {
  Sunny:
    'https://s3-alpha-sig.figma.com/img/b6fe/b523/f01b7c0c0765dab6de4f9f5cbb022e1d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ft9~h2kAcRihnxvVgA9fussyynRP2N5P0~9iKCQRv-isLrnzSbeXK~uwJwozaftBvHpqV4ba8sRJGIueVAlZd2pKb3A05AyUdcGMzjnnAPNoA-vyKiLzxjVpXeinrFUUEJw9iQOY279drc9PU5iicGoLQVC9RkCfDtT9ta5AfBjwtQWxcEfRmR8dcXEkIOJ1IGF8GL5infm6xZb5Pej7C7bIllsp-mPuUiK11NOvhnG-AtGn1HeAJtO7VPY-zO2ih0zc6N7kbnPtAMmsum2OdgvwaKi5mi1~fJBlq77R9d5a6jjUzBRihyLqHDLlofC32fyYVclAlvT2c9odRKxooQ__',
  Storm:
    'https://s3-alpha-sig.figma.com/img/48c4/875d/ba401cc991766e88dd3ca79e1994751f?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAhEJ-ps9pTOCo3G7FRq9bJqPSidMzBhFPpvwPlOaO85I~twvtUh6aFqMarwF~8pFg~wjY21YByFph-scxY2ov7ui7ORKjq7DdOqNmqZSzRiXbia0TD-u~AIeYm7FE6sUq9FT1iF-VW~oOOW-MMOWLgEzediPI1Pk7tGPc0Z1hVvSssETISheSpCCImMmx1q-0HO3pjVjcLYNvy~0yrT6gSsJiSjv0xh43-lf5tP4BDKm21akeUOGdAB7ku~CZuuuFwEuxg7RGrBqL5fsCVbet0b5iADiQmoBt5Q8RU3nbgveswMKsmmVMMnxBRZoU5Ud99U4UsfNvlMJRTdV9KOkg__',
  Snow: 'https://s3-alpha-sig.figma.com/img/0e3a/6228/609812788f4e58d757eb38529a991ff6?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8pJe1OQoSjmrD~82LUglKcwUrAzAZY~hT4ODXzzGS-O9r6RFlWjy3OB4vbvsMpdZIvocwJLqDC8oV3ojhL3suex6HD6wprVFmfmodr67KFv9~dX1gXv5DVNBjFfZcxGxFLaL87CdOaVVZYzhTUI7YW0YUA39Gis42UR7RAvBRRNDVURkiwI72wqPE-u9e097Ckg0hDvL1TgBeXbvRT~j9QEbsb0AIkB9qAAwhmvOczM7tT7TgyyYbOBphE9~nKbLO4blgvjFcjbKiAKdPlX8FNKL6vCUpgswSdXRetNQSzeElOIxe81YizQ4Iqb8ahqQmU5NstGsnIhldgephRc4w__',
  Rain: 'https://s3-alpha-sig.figma.com/img/ca16/ac78/b02733bd8579adfe226b99287b7e4bd1?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mk-TraDyzvDNuTo3AdI70cHE0-YIBIydnKVLZNDQRC9AUdxaUIK9qXswf5KKrxYToAiY-ipFfUzmu5IToxZY0YmHQH24RggfAP~sjEZRz5tYvwR17vkYcSnGrulD06EyDCG7FB6kmwP5ASdVS0ufP8zXrudA49~KI7lb4DatHilFoCZDLUYaEhN6reRrJJnlXadJKwWiG1MvAdXy70oTSEDLWmHloG4g-8nnCShJHQNiYslLsHM1dy3MIjSolNuxRWb~r3NasfFEXfwBBYjQ-BZcdizXqiEcKboac1hA3txZEW4OQmPWrxV7NWzhcTH7QGLTXsK3Jcfw8NFPPSpadA__',
  Windy:
    'https://s3-alpha-sig.figma.com/img/327a/280b/5796162afdf71b41c7c5e86b1cea8c13?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XH7CiZApFYMTGtP2S0gGtgsVWh~nBdowLWTakcpH9WDmqBnlowA1~WDMHnubMSbGSBTmaONoyoiFljMoTzB~1~1F5IGVUXanbmDoYpF9x20~~6fdkHfoy0ReyNHTT56rXHKjrUwEKVzOg04GLGTSY2LsDsz4YfWAK~27BEjaB2FdUbfq~NzMRJjDlEkrww3pEy2zwrR9nhLlz40QyPX0RO2n8gC4HUM4iXWH94Fk-kTuKBeCVJe6SyWUxpcYq0iagKdh-VYAM4ZjQTMbDaotSgqCse1dMy29TjLRkq~CHOMVpVbpKVTDRGnONwoJkptSKU8LF1uM54fsX5ec6BRC5g__',
  Cloudy:
    'https://s3-alpha-sig.figma.com/img/f626/1028/e3f613e97dd5d5d8ffa2f8d17e859abd?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LaJxc3vQkaLtOz~-M7hlrgjpPcArh3i19elekhwmNigfRBkurPENy2MjcTcQnUjs3NTrioqXHeg78N6YGhFYn1zfGH~JaPCv6Q-hGdCw~Lk4nx9~a9OnyB~IVzDInJ8rmoi-0KyglrAPKB9LRQLBdE~Ts0pgQfP4BCxVHegB9DzV0fNuCeSFgXz~tHXLAaykn5l18Mb8Oa5qJw3oWuLCZW~TeSj5Zo5HLrh6xWCPWS53rpXwCeYatwF2Dv1OHgT3kCnQczBwaeZlx8BSfJQQMWMEz6F9~QxeoH64KsWbC3UiOrpit8US8cbLccvDFJ9oFcmuClXWqR-07OO1PfkmSw__',
};

const Left = ({
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
    <section className="flex flex-1 relative items-center justify-center w-1/2 h-screen bg-[rgb(15,20,30)] z-1">
      <div className="flex relative w-[414px] h-[828px] justify-center z-10">
        <div className="z-20 w-full h-5/6 rounded-[10.5px] overflow-hidden shadow-lg bg-[#111827]/75 backdrop-blur-m">
          <div>
            {weatherLoading ? (
              <div className="text-white flex justify-center items-center h-full">
                <p>Loading weather data...</p>
              </div>
            ) : (
              weatherData && (
                <div className="text-white">
                  <p className="text-gray-400 m-5">
                    {weatherData.forecast?.forecastday[0]?.date}
                  </p>
                  <h2 className=" flex justify-center h-12 text-5xl font-extrabold text-white">
                    {weatherData.location?.name}
                  </h2>
                  <div className="px-10 py-14 backdrop-blur-lg flex items-center justify-center">
                    <div className="flex items-center justify-center w-72 h-72">
                      <img
                        className="absolute object-cover w-72 h-72"
                        src={getWeatherImage(
                          weatherData.current?.condition?.text || ''
                        )}
                        alt="Weather condition"
                      />
                    </div>
                  </div>
                  <div className="px-10">
                    <p className="text-transparent bg-clip-text font-extrabold text-[90px] bg-gradient-to-b from-black to-white">
                      {weatherData.forecast?.forecastday[0]?.day.mintemp_c}°C
                    </p>
                    <p className="font-extrabold mb-12 h-6 text-yellow-200">
                      {weatherData.current?.condition?.text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Left;
