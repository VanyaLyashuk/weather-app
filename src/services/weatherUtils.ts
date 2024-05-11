import {
  ICurrentWeather,
  IForecastWeather,
  ITransformedForecast,
  ITransformedForecastWithSummary,
  TimePeriodKey,
  TimePeriodValue,
} from "../models";

export const _getTimePeriod = (time: string): TimePeriodValue | null => {
  const timePeriodMapping: Record<TimePeriodKey, TimePeriodValue> = {
    "6:00am": "morning",
    "3:00pm": "afternoon",
    "9:00pm": "evening",
    "12:00pm": "night",
  };

  return timePeriodMapping[time as TimePeriodKey] || null;
};

export const _transformDate = (date: Date, format?: string): string => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  switch (format) {
    case "day, mm dd":
      return `${days[date.getDay()]}, ${
        months[date.getMonth()]
      } ${date.getDate()}`;
    case "dd":
      return `${date.getDate()}`;
    default:
      return `${months[date.getMonth()]} ${date.getDate()}, ${_transformTime(
        date
      )}`;
  }
};

export const _transformTime = (date: Date): string => {
  const hours: string = (date.getHours() % 12 || 12).toString();
  const minutes: string =
    date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes().toString();
  const ampm: string = date.getHours() < 12 ? "am" : "pm";

  return `${hours}:${minutes}${ampm}`;
};
export const _transformWind = (
  data: ICurrentWeather | IForecastWeather
): string => {
  return `${data.wind.speed} m/s ${_transformWindDirection(data.wind.deg)}`;
};
export const _transformWindDirection = (degrees: number): string => {
  const directions: string[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return directions[Math.round(degrees / 45) % 8];
};

export const _groupForecastByDay = (
  data: ITransformedForecast[]
): ITransformedForecast[] => {
  const result: ITransformedForecast[] = [];

  data.forEach((item) => {
    const existingIndex = result.findIndex(
      (resItem) => resItem.date === item.date
    );

    if (existingIndex > -1) {
      result[existingIndex].data.push(item.data[0]);
    } else {
      result.push({ ...item });
    }
  });

  return result;
};

export const _getDailyTemperatureStats = (
  data: ITransformedForecast[]
): ITransformedForecastWithSummary[] => {
  return data.map((item) => {
    const dailyTemperatureSummary = {
      morning: { temperature: "N/A", feelsLike: "N/A" },
      afternoon: { temperature: "N/A", feelsLike: "N/A" },
      evening: { temperature: "N/A", feelsLike: "N/A" },
      night: { temperature: "N/A", feelsLike: "N/A" },
    };

    item.data.forEach((timePeriodData) => {
      const timePeriod = _getTimePeriod(timePeriodData.time);
      if (
        timePeriod &&
        timePeriodData.temperature &&
        timePeriodData.feelsLike
      ) {
        dailyTemperatureSummary[timePeriod] = {
          temperature: timePeriodData.temperature,
          feelsLike: timePeriodData.feelsLike,
        };
      }
    });

    return {
      ...item,
      dailyTemperatureSummary,
    };
  });
};
