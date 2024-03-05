import React, { useEffect, useState } from "react";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Footer from "./components/footer/Footer";
import Forecast from "./components/forecast/Forecast";
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";
import { ILocation } from "./models";

const App: React.FC = () => {
  const [searchedCityCoords, setSearchedCityCoords] = useState<ILocation>(() => {
    const coords = localStorage.getItem("coords");
    return coords ? JSON.parse(coords) : {lat: 45.34, lon: 28.84};
  });

  useEffect(() => {
    localStorage.setItem("coords", JSON.stringify(searchedCityCoords));
  }, [searchedCityCoords]);

  const onCitySelect = (coords: ILocation): void => {
    setSearchedCityCoords(coords);
  };

  const {lat, lon} = searchedCityCoords;

  return (
    <div className="container flex flex-col min-h-screen pt-3 md:pt-4">
      <Header />
      <SearchBar onCitySelect={onCitySelect} />
      <main>
        <ErrorBoundary>
          <CurrentWeather lat={lat} lon={lon}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Forecast lat={lat} lon={lon}/>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default App;
