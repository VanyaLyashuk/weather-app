import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Footer from "./components/footer/Footer";
import Forecast from "./components/forecast/Forecast";
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";

const App = () => {
  return (
    <div className="container flex flex-col min-h-screen pt-3 md:pt-4">
      <Header />
      <SearchBar />
      <main>
        <ErrorBoundary>
          <CurrentWeather />
        </ErrorBoundary>
        <ErrorBoundary>
          <Forecast />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default App;
