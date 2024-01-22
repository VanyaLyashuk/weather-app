import SearchBar from './components/searchBar/SearchBar';

const App = () => {
  return (
    <div>
      <header>
        <SearchBar />
      </header>
      <main>
        Current Weather
      </main>
      <section>
        5 Day Forecast
      </section>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
