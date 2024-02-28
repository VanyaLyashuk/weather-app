import { IForecastItemProps } from "@models/index";
import { useState } from "react";
import ArrowIcon from "../../UI/icons/ArrowIcon";
import PressureIcon from "../../UI/icons/PressureIcon";
import TriangleIcon from "../../UI/icons/TriangleIcon";

const ForecastItem: React.FC<IForecastItemProps> = ({ forecast, index }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const detailsClasses = showDetails
    ? "max-h-[1000px] visible pb-6 md:pb-8"
    : "max-h-0 invisible pb-0";

  const {
    icon,
    description,
    temperatureMin,
    temperatureMax,
    wind,
    pressure,
    humidity,
    visibility,
  } = index === 0 ? forecast.data[0] : forecast.data[2];

  const { morning, evening, afternoon, night } =
    forecast.dailyTemperatureSummary;

  return (
    <li className="overflow-hidden bg-white rounded-md shadow-md dark:bg-slate-800 dark:text-slate-400">
      <button
        onClick={handleDetails}
        className="flex items-center justify-between w-full px-3 rounded-md sm:px-4 md:px-[18px]"
      >
        <p className="sm:text-lg">{forecast.date}</p>
        <div className="flex items-center">
          <img src={icon} className="w-12 sm:w-14 md:w-15" alt="clouds" />
          <p className="sm:text-lg">{`${temperatureMax}/${temperatureMin}°C`}</p>
        </div>
        <TriangleIcon showDetails={showDetails} />
      </button>
      <div
        className={`px-3 sm:px-4 sm:grid sm:grid-cols-[1fr_3px_160px] md:grid-cols-[1fr_3px_180px] md:px-[18px] sm:gap-x-4 md:gap-x-6 transition-all duration-[400ms] ${detailsClasses}`}
      >
        <div className="flex items-center gap-3 sm:mt-[-14px] sm:pt-2 md:pt-3 sm:col-span-1 ">
          <img
            className="w-[100px] mx-[-22px] sm:w-[120px] sm:mx-[-26px] sm:my-[-12px]"
            src={icon}
            alt="weather"
          />
          <div>
            <p className="text-base font-bold sm:text-lg md:text-xl">
              {description}
            </p>
            <p className="text-base md:text-xl">
              The high will be {`${temperatureMax}°C`},{" "}
              <span className="whitespace-nowrap sm:whitespace-normal">
                the low will be {`${temperatureMin}°C`}
              </span>
              .
            </p>
          </div>
        </div>
        <div className="hidden sm:block w-[3px] sm:bg-primary sm:row-span-2"></div>
        <ul className="mb-2 border-l-[3px] border-primary pl-3 py-1 flex items-center gap-x-3 gap-y-2 flex-wrap text-base md:text-lg sm:row-span-2 sm:mb-0 sm:gap-y-1 md:gap-y-2 sm:pl-0 sm:border-l-0">
          <li className="flex items-center gap-1">
            <ArrowIcon />
            <span>{wind}</span>
          </li>
          <li className="flex items-center gap-1">
            <PressureIcon />
            <span>{pressure}</span>
          </li>
          <li>
            <span>{humidity}</span>
          </li>
          <li>
            <span>{visibility}</span>
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
                <td className="px-1 sm:px-[6px] md:px-3 text-center">
                  {morning.temperature}
                </td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">
                  {afternoon.temperature}
                </td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">
                  {evening.temperature}
                </td>
                <td className="px-1 sm:px-[6px] md:px-3 text-center">
                  {night.temperature}
                </td>
              </tr>
              <tr>
                <td className="text-sm text-left uppercase text-zinc-500 md:text-base">
                  Feels like
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  {morning.feelsLike}
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  {afternoon.feelsLike}
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  {evening.feelsLike}
                </td>
                <td className="px-1 sm:sm:px-[6px] md:px-3 text-center">
                  {night.feelsLike}
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
