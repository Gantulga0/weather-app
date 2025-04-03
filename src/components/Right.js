import React, { useEffect } from 'react';

const weatherImages = {
  Sunny:
    'https://s3-alpha-sig.figma.com/img/3c6b/babb/0657324bf17d1bd5169b60a7fbcb80b1?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=M1dBwAT8PF2L~LFzq28BEhyu~tv1BLCarwkB2kmSHat~099BTmv7JLGvyjK~U0-3ANsR3pyjwXb6hvjeERhm~1KBD66gH8S~z5NNWnjEe2M-fm-MNRGY3t55te-1Kk7JHk7obwlnyTmZoXzcYFMK2NpDuZGf8l4Ds4Xi3R-KlmoBYuqX0bNDHwbNs5NF-xjq1qfBPoPAiUYVhGsLIo~nN~VkCMOaQervKQsSFr~z6ZKOmHGcrMx62-9atvDsW3zsQXR2Q6LGnuC3xljIgECSTP4-ZziQ7hUXMnxDoOARSTAUTvjW0gHB5AC4CAYlv7VOr8X0wfr2eyqdqJcA9imkeg__',
  Storm:
    'https://s3-alpha-sig.figma.com/img/48c4/875d/ba401cc991766e88dd3ca79e1994751f?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Bgj3GFyZm-GYpM0erQovQrUR3a5TF6VsluDqzgTbb57aosPEm6MzrgebQmW69vLObhpTsw8n27R9VaQeyiXlLhr5elI5L23OCTw74ZM4HTqicRdWOvXWbOZ8C~bLrM18BondYm9E16qqSc9ecmgyv~x7gyZpwTH6f1vQcKNw4rNSHZZnF68kFU9bjGGibs~CWcP8dBvB8mTl7g7LvNjUnMgQEErt1Zu~mEQ3KZik89p5hXc~BdokUtWu09ji37TXiUlWboVoelRXULfy1weexWkjpOnpMBrhcsniU5Ov4YxCYKb28zK-1hSDtZfrdmFwMFEqKNV6pez3Wo2HivWA3g__',
  Snow: 'https://s3-alpha-sig.figma.com/img/0e3a/6228/609812788f4e58d757eb38529a991ff6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G9nG8P9D9w1oWQv2hD~3kxCukiRnrpoqVJhd0f1uzPKSwAQK2sHTTXubLlT~9tCqHllvG-sMmae6YcjwIjrL4Qun-DcpI5wN27NnrzTsocE3KwyPDsJpbOASjerE7W-UPiPE~Qhgi6M3NJZQXwb8bl4uu1LzDvRDFfOZlGNOsfoNTXAIEqJTZ~dL43jeL1tXw4JsoRd6LQdiaVyPJ~9Ox~gUp2zLm3~Lmdres9Yd7MVZFe6OGPQ7Q7AK0BZ7Ka~0SaSrxg6u62lj0cYnkAwkDJQl8w0SmixInVlkmZidPuW2MPOitFuib36eFaQu6AziguYI~0J-7Bx8q0SHYquk0w__',
  Rain: 'https://s3-alpha-sig.figma.com/img/bc4b/aa63/6ebd08978462908e36459d2bc23076aa?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=b-XxvIXm2PMNvrqMYJrEwmghMM9eit6ZklipFCsJtEcvAymTDE~0qsx0ii~6UHM4kYtRFrLug-IrvTsk7H8zcZwrCdBNqxdrZ3PmnrwoXhhbWsjMZyqr8Rof3rmTr1QM~WXP9WoGXyblhHYVe8b65VowLsMzT3N2sH2H1PKR9UkzwyNu6wkedHNahHPpli4ds1ITay3JaoL00E5KA0E~e1uiVCi7NmB8SDaQWEC7Jv8Uv8tjtVswxWbed3wjIFgcGWR7w2LQix7EpbrjpfRXz95HrQExQiTQ~mxl7Wi-T2TxnSjvoYc0p3QwLiw24k0IY6RGzhM-BPvadm5Z59ibeQ__',
  Windy:
    'https://s3-alpha-sig.figma.com/img/e9e5/9e83/4e34283c0b1193edb5dbf42a07b0a7f8?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eMWKI9OtEKuwOscxitdK4Jdoj8wRlVGnFGmruRrHQxIGWlJ~8kB72ePSXIMihIPs7fQ6ri7EtCKml~c1OWUPSg5F81VgpLERNbB8ihyB316MkNSVeT2-jTEJ0rDgTaFnxJJaH8jkFVRsv7qxD9hVc2VxzCNW-nnJpfQQOkdiL~fiKMR-o70KwOzT4py8yqW4COHIY0liE6s765XEg4sX3iR5G50vPWfyRBD38Sw9LFqT2JQpg~APPrN9XEKAUtXu7vP99KKc8yOEwo7jsq3-hxRLcPVa3v2l3RF-uoa2JFC-nzCI1eq1-Q0iK1fRoDQkGut5LZG1jMCznbDt27AgVA__',
  Cloudy:
    'https://s3-alpha-sig.figma.com/img/d903/5d9b/37951bf8dd709e5e657a1532899f0b55?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Azt0E9fwV85XKFf2gPeu~ZGFwBY6045rDs81vqyLeueR2wDyqE6VyipXyegqIKPNLmGtD3rD3Ql5Vm5u4ZADj1uEphX5CreWAkzqBp5zVFydaUck2pwfJBxevZjE8ZkBrVrbTKZLNOCJhE4-F0xvJ7b9RNXKrI85FZzglg1wsjWH73ddmOee4d75p8wd-PWMO5ec~SGPfJP6yonyGEthhhTd~utamv1Es1OROZa5PI5bbozqkeke5D1frtiTwWHBJ3CLAhRfNdNBUVXGyzseLAiGHhGApLAKJPg4zwee2DqfLxIDbJafxs-DZdqQkLQmY64jZ5ANQ3hM4~llL68zVg__',
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
        <div className="z-20 w-full h-5/6 rounded-[10.5px] overflow-hidden shadow-lg bg-white/75 backdrop-blur-m">
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
