import ArrowIcon from '../../UI/arrowIcon/ArrowIcon';
import PressureIcon from '../../UI/pressureIcon/PressureIcon';
import TriangleIcon from '../../UI/triangleIcon/TriangleIcon';
import forecastImg from "../../assets/10d@4x.png";

const ForecastItem = () => {
  return (
    <li className="overflow-hidden bg-white rounded-md shadow-md dark:bg-slate-800 dark:text-slate-400">
      <button className="flex items-center justify-between w-full px-3 rounded-md sm:px-4 md:px-[18px]">
        <p className="sm:text-lg">Fri, Jan 05</p>
        <div className="flex items-center">
          <img
            src={forecastImg}
            className="w-12 sm:w-14 md:w-15"
            alt="clouds"
          />
          <p className="sm:text-lg">12/6°C</p>
        </div>
        <TriangleIcon />
      </button>
      <div className="px-3 pb-6 sm:px-4 sm:grid sm:grid-cols-[1fr_3px_160px] md:grid-cols-[1fr_3px_180px] md:px-[18px] sm:gap-x-4 md:gap-x-6 md:pb-8">
        <div className="flex items-center gap-3 sm:mt-[-14px] sm:pt-2 md:pt-3 sm:col-span-1 ">
          <img
            className="w-[100px] mx-[-22px] sm:w-[120px] sm:mx-[-26px] sm:my-[-12px]"
            src={forecastImg}
            alt="weather"
          />
          <div>
            <p className="text-base font-bold sm:text-lg md:text-xl">
              Few clouds. Light breeze.
            </p>
            <p className="text-base md:text-xl">
              The high will be 5°C,{" "}
              <span className="whitespace-nowrap">the low will be 1°C</span>.
            </p>
          </div>
        </div>
        <div className="hidden sm:block w-[3px] sm:bg-primary sm:row-span-2"></div>
        <ul className="mb-2 border-l-[3px] border-primary pl-3 py-1 flex items-center gap-x-3 gap-y-2 flex-wrap text-base md:text-lg sm:row-span-2 sm:mb-0 sm:gap-y-1 md:gap-y-2 sm:pl-0 sm:border-l-0">
          <li className="flex items-center gap-1">
            <ArrowIcon />
            <span>6.1m/s WSW</span>
          </li>
          <li className="flex items-center gap-1">
            <PressureIcon />
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
        <div className="overflow-auto md:text-lg sm:col-span-1 sm:overflow-hidden">
          <table className="text-center">
            <thead>
              <tr>
                <td></td>
                <td className="p-1 sm:pb-[6px] sm:px-[6px] md:px-3 sm:pt-0 md:pb-3 text-center">
                  Morning
                </td>
                <td className="p-1 sm:pb-[6px] sm:px-[6px] md:px-3 sm:pt-0 md:pb-3 text-center">
                  Afternoon
                </td>
                <td className="p-1 sm:pb-[6px] sm:px-[6px] md:px-3 sm:pt-0 md:pb-3 text-center">
                  Evening
                </td>
                <td className="p-1 sm:pb-[6px] sm:px-[6px] md:px-3 sm:pt-0 md:pb-3 text-center">
                  Night
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-sm text-left uppercase text-zinc-500 md:text-base">
                  Temperature
                </td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">-8°C</td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">-3°C</td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">-4°C</td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">-3°C</td>
              </tr>
              <tr>
                <td className="text-sm text-left uppercase text-zinc-500 md:text-base">
                  Feels like
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  -14°C
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  -9°C
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  -9°C
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  -8°C
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </li>
  );
};

export default ForecastItem;
