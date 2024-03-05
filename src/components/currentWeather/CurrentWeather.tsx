import ArrowIcon from "@icons/ArrowIcon";
import PressureIcon from "@icons/PressureIcon";
import { ILocation, ITransformedCurrentWeather } from "@models/index";
import OpenWeatherService from "@services/OpenWeatherService";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CurrentWeather: React.FC<ILocation> = ({lat, lon}) => {
  const [currentWeather, setCurrentWeather] =
    useState<ITransformedCurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const minHeightClass = "min-h-[325px] sm:min-h-[250px] md:min-h-[315px]";

  const openWeatherService = new OpenWeatherService();

  useEffect(() => {
    setLoading(true);
    setError(false);
    openWeatherService
      .getCurrentWeather(lat, lon)
      .then((response) => {
        setCurrentWeather(response);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [lat, lon]);

  const spinner = loading ? <Spinner minHeightClass={minHeightClass} /> : null;
  const errorMsg = error ? (
    <ErrorMessage
      minHeightClass={minHeightClass}
      message="Error loading current weather."
    />
  ) : null;

  const content = !(loading || errorMsg || !currentWeather) ? (
    <CurrentWeatherView
      {...(currentWeather || ({} as ITransformedCurrentWeather))}
    />
  ) : null;

  return (
    <>
      {spinner}
      {errorMsg}
      {content}
    </>
  );
};

const CurrentWeatherView: React.FC<ITransformedCurrentWeather> = ({
  date,
  sunrise,
  sunset,
  locationName,
  icon,
  temperature,
  feelsLike,
  description,
  wind,
  pressure,
  humidity,
  visibility,
}) => {
  return (
    <section className="px-3 py-6 mb-6 rounded-md shadow-md sm:px-4 sm:py-6 sm:grid sm:grid-cols-[auto,1fr] md:px-[18px] md:py-8 sm:mb-7 bg-white dark:dark-mode">
      <div className="flex items-center justify-between w-full sm:col-span-2">
        <p className="text-primary current-weather-date-xs">{date}</p>
        <ul className="sm:flex sm:items-center sm:gap-4">
          <li className="flex gap-2 text-sm sunrise-sunset-xs">
            <span className="uppercase text-zinc-500">Sunrise</span>
            <span className="dark:dark-mode-text-color">{sunrise}</span>
          </li>
          <li className="flex gap-2 text-sm sunrise-sunset-xs">
            <span className="text-gray-500 uppercase">Sunset</span>
            <span className="dark:dark-mode-text-color">{sunset}</span>
          </li>
        </ul>
      </div>
      <h1 className="w-full text-3xl leading-none font-bold break-words mt-2 sm:mt-2 sm:text-[32px] md:text-4xl dark:dark-mode-text-color sm:col-span-2">
        {locationName}
      </h1>
      <div className="flex items-center gap-3 sm:pr-4 md:pr-8">
        <img
          className="w-[120px] mx-[-18px] my-[-16px] sm:my-[-8px] md:w-[160px]"
          src={icon}
          alt="weather"
        />
        <p className="text-5xl dark:dark-mode-text-color">{temperature}</p>
      </div>
      <p className="mb-4 text-lg font-medium sm:text-xl sm:mb-0 md:text-2xl sm:order-last sm:w-full dark:dark-mode-text-color current-weather-description-xs sm:col-span-2">
        Feels like {feelsLike}°C. {description}
      </p>
      <ul className="w-full border-l-[3px] border-primary pl-3 py-1 flex items-center gap-x-3 gap-y-2 flex-wrap text-base current-weather-condition-xs sm:pl-4 sm:self-center md:text-xl md:pl-8 md:gap-x-4 dark:dark-mode-text-color">
        <li className="flex items-center gap-1">
          <ArrowIcon />
          <span>{wind}</span>
        </li>
        <li className="flex items-center gap-1">
          <PressureIcon />
          <span>{pressure}</span>
        </li>
        <li>
          <span>{humidity}</span>
        </li>
        <li>
          <span>{visibility}</span>
        </li>
      </ul>
    </section>
  );
};

export default CurrentWeather;
