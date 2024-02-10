import CurrentWeather from './components/currentWeather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import SearchBar from './components/searchBar/SearchBar';

const App = () => {
  return (
    <div className='container'>
      <header className='my-3 md:my-4'>
        <SearchBar />
      </header>
      <main>
        <CurrentWeather />
        <Forecast />
      </main>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
