import { fadeInUpAnimation } from "@animations/animationsVariants";
import { ICity, ILocation } from "@models/index";
import OpenWeatherService from "@services//OpenWeatherService";
import { motion } from "framer-motion";
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
    onCitySelect(coords);
    setSearch("");
    setCities([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (cities.length) {
      handleCitySelect({
        lat: cities[0].lat,
        lon: cities[0].lon,
      });
    }
  };

  const citiesList = cities.length ? (
    <ul className="flex flex-wrap w-full gap-2 mb-3 md:mb-4">
      {cities.map((city, index) => (
        <motion.li
          initial="hidden"
          whileInView="visible"
          variants={fadeInUpAnimation(index * 0.1)}
          viewport={{ once: true }}
          key={city.name + index}
        >
          <button
            className="cursor-pointer px-3 py-2 text-base leading-relaxed rounded-md shadow-md sm:text-lg md:pl-[18px] dark:dark-mode focus-visible-outline"
            tabIndex={0}
            onClick={() =>
              handleCitySelect({
                lat: city.lat,
                lon: city.lon,
              })
            }
          >
            {city.name}, {city.country}
          </button>
        </motion.li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <motion.form
        initial="hidden"
        whileInView="visible"
        variants={fadeInUpAnimation()}
        viewport={{ once: true }}
        className="relative flex mb-3 md:mb-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-9 py-[10px] text-base leading-relaxed rounded-md shadow-md sm:text-lg md:pl-12 dark:dark-mode focus-visible-outline"
          type="text"
          onChange={handleInputChange}
          placeholder="Search City"
          value={search}
        />
        <LocationIcon />
      </motion.form>
      {citiesList}
    </>
  );
};

export default SearchBar;
