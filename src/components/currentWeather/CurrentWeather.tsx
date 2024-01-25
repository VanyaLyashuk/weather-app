import weatherImg from "../../assets/10d@4x.png";
import arrowIcon from "../../assets/icons/arrow-icon.svg";
import pressureIcon from "../../assets/icons/pressure-icon.svg";

const CurrentWeather = () => {
  return (
    <section className="px-3 py-6 mb-3 rounded-md shadow-md sm:mb-4 sm:px-4 sm:py-6 sm:flex sm:flex-wrap md:px-[18px] md:py-8">
      <div className="flex items-center justify-between w-full">
        <p className="text-primary md:text-lg sm:text-[18px]">Jan 4, 01:04pm</p>
        <ul className="sm:flex sm:items-center sm:gap-4">
          <li className="flex gap-2 text-sm sm:text-[16px]">
            <span className="uppercase text-zinc-500">Sunrise</span>
            <span>07:42am</span>
          </li>
          <li className="flex gap-2 text-sm sm:text-[16px]">
            <span className="text-gray-500 uppercase">Sunset</span>
            <span>04:40pm</span>
          </li>
        </ul>
      </div>
      <h1 className="w-full text-[28px] leading-none font-bold break-words mt-2 sm:mt-1 sm:text-[34px] md:text-4xl">
        Izmail, UA
      </h1>
      <div className="flex items-center gap-3 sm:pr-5 md:pr-8">
        <img
          className="w-[140px] mx-[-34px] my-[-16px] sm:w-[150px] sm:my-0 md:w-[160px]"
          src={weatherImg}
          alt="weather"
        />
        <p className="text-5xl">12°C</p>
      </div>
      <p className="mb-4 text-lg font-medium sm:mb-0 sm:text-xl md:text-[22px] sm:order-last sm:w-full">
        Feels like 11°C. Overcast clouds. Moderate breeze
      </p>
      <ul className="border-l-[3px] border-primary pl-3 py-1 flex items-center gap-x-3 gap-y-2 flex-wrap text-lg sm:pl-5 sm:w-[calc(100%_-_235px)] sm:self-center md:text-xl md:pl-8 md:gap-x-4">
        <li className="flex items-center gap-1">
          <img src={arrowIcon} alt="wind" />
          <span>6.1m/s WSW</span>
        </li>
        <li className="flex items-center gap-1">
          <img src={pressureIcon} alt="pressure" />
          <span>1003hPa</span>
        </li>
        <li>
          <span>Humidity: 69%</span>
        </li>
        <li>
          <span>UV: 1</span>
        </li>
        <li>
          <span>Dew point: 7°C</span>
        </li>
        <li>
          <span>Visibility: 10.0km</span>
        </li>
      </ul>
    </section>
  );
};

export default CurrentWeather;
