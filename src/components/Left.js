import React, { useEffect } from 'react';

const weatherImages = {
  Sunny:
    'https://s3-alpha-sig.figma.com/img/b6fe/b523/f01b7c0c0765dab6de4f9f5cbb022e1d?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Qn80RDshGi-cxUIk9pTr9Nd-lvfFXtvH97jZoDdEbb6WX5BFtj4McpJbSWLyocHV0OWLjp2xZfjiymGc9Q3EoDNBr7UxUIG9yJkpguKrDV0P84IeTsRMvMmZ0RWxhntKBT~NzoC~igAkXqSAKzQK8AA9EkCCun8qugQ9zxsvE6COQo23fPrRvXrz7WAc2LPI-5eX37-ZdKNMXqqQGzzs8JKxNeIdSQ5JgGvOMxT3ViKONJZnUzprDz11sHUqmvNhuRdgkL2~-LGZx-VbBiRk1ZXEF~n3WoIkEQyJixEDPFNzdK1aAAjcZKsfoAIma8x5GZfgofOBTPqsAw1x4Nn58g__',
  Storm:
    'https://s3-alpha-sig.figma.com/img/0694/57c6/f5aa97462ae195f64738006cb131159c?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MRGcLvIlY4~ML7TWIsp6~0w~ApTMwC6pH7xmtRwsiIKAHXAcEL8z44mRff4R-CHem4nhLVIBQ0KweytpIBbG78IGUHv~s6LVIgohmHn~3RHPqF4Hp2vIVklrbs8A9G8q0VNALNGFy8tVmbyxCRxIV~zK9oUACGKN1iyxMu5NoW1cHftLGeM9btwkcbSflzy6I1DqTb-NN6uIo868iBBA6CbG0clISE5rQtGqPf7pmgGjb~3PHQMkhB8RVyOAEjZD0lVHfUs4CuakuTcOxIiF2JMF7KwlYhh-YaUQ9cyaikIjRx6Pp8qOHBeU6-jYcEtM7HbBn~T16uDTxfWG-w6FbQ__',
  Snow: 'https://s3-alpha-sig.figma.com/img/0694/57c6/f5aa97462ae195f64738006cb131159c?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MRGcLvIlY4~ML7TWIsp6~0w~ApTMwC6pH7xmtRwsiIKAHXAcEL8z44mRff4R-CHem4nhLVIBQ0KweytpIBbG78IGUHv~s6LVIgohmHn~3RHPqF4Hp2vIVklrbs8A9G8q0VNALNGFy8tVmbyxCRxIV~zK9oUACGKN1iyxMu5NoW1cHftLGeM9btwkcbSflzy6I1DqTb-NN6uIo868iBBA6CbG0clISE5rQtGqPf7pmgGjb~3PHQMkhB8RVyOAEjZD0lVHfUs4CuakuTcOxIiF2JMF7KwlYhh-YaUQ9cyaikIjRx6Pp8qOHBeU6-jYcEtM7HbBn~T16uDTxfWG-w6FbQ__',
  Rain: 'https://s3-alpha-sig.figma.com/img/ca16/ac78/b02733bd8579adfe226b99287b7e4bd1?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nc4BYYsCoqvht4ALkxwM5lt28YwsInPOzkXD87f2RvLnyEBZoU74A21Xx~QEzlB3H7H~WqTC53bICg8SYlqhrq14BttzVFmw7Q5PFLiEFhZhB4baaCZXqp0P~OePSLWpg~4zH-6JcX-yGctaDOKB19y7h2YOb10SjjMRXe621ldq0Jw4viFgk9ecGDbjqYiAYpNi0J1kBsx2XT8pnAWWppVMCn8YAK29XnzSu03vDHRmHZwi3ZFdekT4a2fF2394hET6cI3BFi-SCeZPPP81iCBDzWPQ8-52uBZnoQFVdLFMP-Vl~ruczvWls4ByJIJQvea5vb9myQ1s3wBSfpUzPw__',
  Windy:
    'https://s3-alpha-sig.figma.com/img/327a/280b/5796162afdf71b41c7c5e86b1cea8c13?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HIOvdrXq4heYNvOMuuFJsZgKiZVx68-2WynYnnglXUlnngB47QmBnK6haPjNn9IPrbkgOua3LwW3MXGVhC4aA4WpmUxobk3SQR5pEniHmKzDv~OKDJw32K2sO2~GK~ypHA-9p~6dwGzIrnMy60059oPa9AmX5F3IbPMgSgpZrz7MysILsHasKMmhwV90nELO9YAQp9RAewe3WntAGCmmTUddfYGtJ5~keqBXaZCD9yhZpGUK5951Q2EMd1fyYEhpCArr8zaUs1TtMr89TxcjNcleGCP6VdNtI9A1TciA4L5-tskmjBQf0j3~HZYnLbmGB8COx7asLKMaTXGPO--09g__',
  Cloudy:
    'https://s3-alpha-sig.figma.com/img/f626/1028/e3f613e97dd5d5d8ffa2f8d17e859abd?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gfuxx8ntEslzdFN71s3NKzlCgoYvc31ZSuWY6d5rrH83VJNMc4TgF6AoPR17DQNj8WvCFPYSy5MlVb0kQJvmOMnTwLtvqbzMI3HL6kx2zZhGLihst3qjKtamupuwFpi77ytL95zT4XNbgk0EI79PH0wVwklLL1QVQJpty3QlsAz5Pyyoboy2cOFMgSGMOgiHwNJ6VA9-Dd3T9OTprdXXREi3m-6NelFrg8MZKgvcK8g-hah3r3ugSpcWBxaB7-ATQeL-vrZxTTf6zlqtneqyfRu2k4HJiGdoZs8s6IXrCkaUOqOuj88RBNvPmWFN3g2ajD-J2x4HjyVYMAT4pdMDYA__',
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
