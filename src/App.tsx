import { useEffect, useState } from "react";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Footer from "./components/footer/Footer";
import Forecast from "./components/forecast/Forecast";
import SearchBar from "./components/searchBar/SearchBar";

type Theme = "light" | "dark";

const App = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const onThemeChange = (btn: string): void => {
    if (btn === theme) return;

    setTheme(btn === "light" ? "light" : "dark");
  };

  return (
    <div className="container flex flex-col min-h-screen pt-3 md:pt-4">
      <header className="flex justify-start mb-3 md:mb-4">
        <div className="font-medium text-neutral-600 dark:text-slate-400">
          <span className=""></span>Theme:{" "}
          <button
            className={theme === "dark" ? "text-primary" : ""}
            onClick={() => onThemeChange("dark")}
          >
            Dark
          </button>{" "}
          /{" "}
          <button
            className={theme === "light" ? "text-primary" : ""}
            onClick={() => onThemeChange("light")}
          >
            Light
          </button>
        </div>
      </header>
      <SearchBar />
      <main>
        <CurrentWeather />
        <Forecast />
      </main>
      <Footer />
    </div>
  );
};

export default App;
