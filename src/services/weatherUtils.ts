import {
  ICurrentWeather,
  IForecastWeather,
  ITransformedForecast,
  ITransformedForecastWithSummary,
  TimePeriodValue,
} from "../models";

export const _getTimePeriod = (time: string): TimePeriodValue | null => {
  const match = time.match(/(\d+:\d+)([ap]m)/i);
  if (!match) return null;

  const [timeString, period] = match.slice(1);
  const [rawHours] = timeString.split(":").map(Number);

  const hours =
    period.toLowerCase() === "pm" && rawHours !== 12
      ? rawHours + 12
      : period.toLowerCase() === "am" && rawHours === 12
      ? 0
      : rawHours;

  if (hours >= 5 && hours < 9) return "morning";
  if (hours >= 12 && hours < 16) return "afternoon";
  if (hours >= 18 && hours < 22) return "evening";
  if (hours >= 22 || hours < 5) return "night";

  return null;
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
