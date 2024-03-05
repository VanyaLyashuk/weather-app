import { ICity, ILocation } from "@models/index";
import OpenWeatherService from "@services//OpenWeatherService";
import React, { useEffect, useState } from "react";
import LocationIcon from "../../UI/icons/LocationIcon";

interface ISearchBarProps {
  onCitySelect: (coords: ILocation) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onCitySelect }) => {
  const [search, setSearch] = useState<string>("");
  const [cities, setCities] = useState<ICity[]>([]);

  const openWeatherService = new OpenWeatherService();

  useEffect(() => {
    if (!search.trim()) {
      setCities([]);
      return;
    } else {
      const delayDebounce = setTimeout(() => {
        openWeatherService
          .searchCity(search)
          .then(setCities)
          .catch(console.error);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleCitySelect = (coords: ILocation): void => {
    console.log(cities)
    onCitySelect(coords);
    setSearch("");
    setCities([]);
  };

  const citiesList = cities.length ? (
    <ul className="flex flex-wrap w-full gap-2 mb-3 md:mb-4">
      {cities.map((city, index) => (
        <li
          className="cursor-pointer px-3 py-2 text-base leading-relaxed rounded-md rounded-tl-md shadow-md sm:text-lg md:pl-[18px] dark:bg-slate-800 dark:text-slate-400"
          key={city.name + index}
          onClick={() =>
            handleCitySelect({
              lat: +city.lat.toFixed(2),
              lon: +city.lon.toFixed(2),
            })
          }
        >
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <form className="relative flex mb-3 md:mb-4">
        <input
          className="w-full px-9 py-[10px] text-base leading-relaxed rounded-md shadow-md sm:text-lg md:pl-12 dark:bg-slate-800 dark:text-slate-400"
          type="text"
          onChange={handleInputChange}
          placeholder="Search City"
          value={search}
        />
        <LocationIcon />
      </form>
      {citiesList}
    </>
  );
};

export default SearchBar;
