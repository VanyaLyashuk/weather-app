import CurrentWeather from './components/currentWeather/CurrentWeather';
import SearchBar from './components/searchBar/SearchBar';

const App = () => {
  return (
    <div className='container'>
      <header className='my-3 md:my-4'>
        <SearchBar />
      </header>
      <main>
        <CurrentWeather />
        <section>
          5 Day Forecast
        </section>
      </main>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
