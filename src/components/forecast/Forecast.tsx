import { ILocation, ITransformedForecastWithSummary } from "@models/index";
import OpenWeatherService from "@services/OpenWeatherService";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ForecastItem from "../forecastItem/ForecastItem";
import Spinner from "../spinner/Spinner";

const Forecast: React.FC<ILocation> = ({ lat, lon }) => {
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
      .getFiveDayForecast(lat, lon)
      .then((response) => {
        setLoading(false);
        setForecast(response);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [lat, lon]);

  const spinner = loading ? <Spinner minHeightClass={minHeightClass} /> : null;
  const errorMsg = error ? (
    <ErrorMessage
      minHeightClass={minHeightClass}
      message="Error loading 3 hour forecast for 5&nbsp;days."
    />
  ) : null;

  const content =
    !loading && !error && forecast ? (
      <section>
        <h2 className="text-xl font-bold mb-3 sm:text-[22px] md:text-2xl dark:dark-mode-text-color">
          3-hour Forecast 5 days
        </h2>
        <ul className="grid gap-3 md:gap-4">
          {forecast.map((item, index) => (
            <ForecastItem forecast={item} key={item.date} index={index} />
          ))}
        </ul>
      </section>
    ) : null;

  return (
    <>
      {spinner}
      {errorMsg}
      {content}
    </>
  );
};

export default Forecast;
