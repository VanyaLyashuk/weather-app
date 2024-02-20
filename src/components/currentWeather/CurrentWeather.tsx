import ArrowIcon from "@icons/ArrowIcon";
import PressureIcon from "@icons/PressureIcon";
import { ITransformedCurrentWeather } from "@models/index";
import OpenWeatherService from "@services/OpenWeatherService";
import React, { useEffect, useState } from "react";

const CurrentWeather: React.FC = () => {
  const [currentWeather, setCurrentWeather] =
    useState<ITransformedCurrentWeather | null>(null);

  const openWeatherService = new OpenWeatherService();

  useEffect(() => {
    openWeatherService.getCurrentWeather().then(setCurrentWeather);
  }, []);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  const {
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
  } = currentWeather;

  return (
    <section className="px-3 py-6 mb-6 rounded-md shadow-md sm:px-4 sm:py-6 sm:flex sm:flex-wrap md:px-[18px] md:py-8 sm:mb-7 bg-white dark:bg-slate-800">
      <div className="flex items-center justify-between w-full">
        <p className="text-primary md:text-lg">{date}</p>
        <ul className="sm:flex sm:items-center sm:gap-4">
          <li className="flex gap-2 text-sm sm:text-base">
            <span className="uppercase text-zinc-500">Sunrise</span>
            <span className="dark:text-slate-400">{sunrise}</span>
          </li>
          <li className="flex gap-2 text-sm sm:text-base">
            <span className="text-gray-500 uppercase">Sunset</span>
            <span className="dark:text-slate-400">{sunset}</span>
          </li>
        </ul>
      </div>
      <h1 className="w-full text-[28px] leading-none font-bold break-words mt-2 sm:mt-1 sm:text-3xl md:text-4xl dark:text-slate-400">
        {locationName}
      </h1>
      <div className="flex items-center gap-3 sm:pr-4 md:pr-8">
        <img
          className="w-[140px] mx-[-34px] my-[-16px] sm:my-[-8px] md:w-[160px]"
          src={icon}
          alt="weather"
        />
        <p className="text-5xl dark:text-slate-400">{temperature}</p>
      </div>
      <p className="mb-4 text-lg font-medium sm:text-xl sm:mb-0 md:text-[22px] sm:order-last sm:w-full dark:text-slate-400">
        Feels like {feelsLike}°C. {description}
      </p>
      <ul className="border-l-[3px] border-primary pl-3 py-1 flex items-center gap-x-3 gap-y-2 flex-wrap text-base sm:text-lg sm:pl-4 sm:w-[calc(100%_-_200px)] sm:self-center md:text-xl md:pl-8 md:gap-x-4 md:w-[calc(100%_-_235px)] dark:text-slate-400">
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
