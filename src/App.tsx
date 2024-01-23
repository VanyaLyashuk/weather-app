import SearchBar from './components/searchBar/SearchBar';

const App = () => {
  return (
    <div className='container'>
      <header className='my-2 md:my-4'>
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
