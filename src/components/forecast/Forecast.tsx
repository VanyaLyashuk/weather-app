import { ITransformedForecast } from "@models/index";
import OpenWeatherService from "@services/OpenWeatherService";
import { useEffect, useState } from "react";
import ForecastItem from "../forecastItem/ForecastItem";

const Forecast = () => {
  const [forecast, setForecast] = useState<
    ITransformedForecast[] | null
  >(null);
  const openWeatherService = new OpenWeatherService();

  useEffect(() => {
    openWeatherService.getFiveDayForecast().then(setForecast);
  }, []);

  if (!forecast) {
    return <div>Loading...</div>;
  }

  const forecastItems = forecast.map((item, index) => (
    <ForecastItem forecast={item} key={item.date} index={index}/>
  ));

  return (
    <section>
      <h2 className="text-xl font-bold mb-3 sm:text-[22px] md:text-2xl dark:text-slate-400">
        3-hour Forecast 5 days
      </h2>
      <ul className="grid gap-3 md:gap-4">
        {forecastItems}
      </ul>
    </section>
  );
};

export default Forecast;
