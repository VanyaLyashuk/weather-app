import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import SearchBar from "./components/searchBar/SearchBar";

const App = () => {
  return (
    <div className="container flex flex-col min-h-screen pt-3 md:pt-4">
      <header className="mb-3 md:mb-4">
      </header>
      <SearchBar />
      <main>
        <CurrentWeather />
        <Forecast />
      </main>
      <footer className="p-8 mt-auto text-center sm:text-lg">
        © 2024. All rights reserved.{" "}
        <span className="whitespace-nowrap">
          Coded by{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/ivan-lyashuk/"
            target="_blank"
          >
            Ivan Lyashuk
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
