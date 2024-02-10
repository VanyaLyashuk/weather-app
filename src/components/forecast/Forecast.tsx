import ForecastItem from '../forecastItem/ForecastItem';

const Forecast = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3 sm:text-[22px] md:text-2xl">3-hour Forecast 5 days</h2>
      <ul className='grid gap-3 md:gap-4'>
        <ForecastItem />
        <ForecastItem />
        <ForecastItem />
        <ForecastItem />
        <ForecastItem />
      </ul>
    </section>
  );
};

export default Forecast;
