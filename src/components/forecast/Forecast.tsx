import { ITransformedForecastWithSummary } from "@models/index";
import OpenWeatherService from "@services/OpenWeatherService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ForecastItem from "../forecastItem/ForecastItem";
import Spinner from "../spinner/Spinner";

const Forecast = () => {
  const [forecast, setForecast] = useState<
    ITransformedForecastWithSummary[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const openWeatherService = new OpenWeatherService();

  const minHeightClass = "min-h-[250px] sm:min-h-[330px] md:min-h-[345px]";

  useEffect(() => {
    setLoading(true);
    setError(false);
    openWeatherService
      .getFiveDayForecast()
      .then((response) => {
        setLoading(false);
        setForecast(response);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return <Spinner minHeightClass={minHeightClass} />;
  }

  if (error) {
    return (
      <ErrorMessage
        minHeightClass={minHeightClass}
        message="Error loading 3 hour forecast for 5&nbsp;days."
      />
    );
  }

  const forecastItems = forecast
    ? forecast.map((item, index) => (
        <ForecastItem forecast={item} key={item.date} index={index} />
      ))
    : null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-3 sm:text-[22px] md:text-2xl dark:text-slate-400">
        3-hour Forecast 5 days
      </h2>
      <ul className="grid gap-3 md:gap-4">{forecastItems}</ul>
    </section>
  );
};

export default Forecast;
