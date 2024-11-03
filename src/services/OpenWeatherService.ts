import { useHttp } from "../hooks/useHttp";
import {
  ICity,
  ICurrentWeather,
  IFiveDayForecast,
  IForecastWeather,
  ITransformedCurrentWeather,
  ITransformedForecastWithSummary,
} from "../models";

import {
  _getDailyTemperatureStats,
  _getTimePeriod,
  _groupForecastByDay,
  _transformDate,
  _transformTime,
  _transformWind,
} from "./weatherUtils";

const useOpenWeatherService = () => {
  const { loading, request, error } = useHttp();
  const _apiBaseImg: string = "http://openweathermap.org/img/wn/";

  const searchCity = async (query: string): Promise<ICity[]> => {
    const endpoint = `/geo/1.0/direct`;
    const params = `q=${query}&limit=5`;
    const response = await request<ICity[]>(endpoint, params);

    const uniqueCities = new Set();
    return response.filter((city) => {
      const identifier = `${city.name}, ${city.country}`;
      if (!uniqueCities.has(identifier)) {
        uniqueCities.add(identifier);
        return true;
      }
      return false;
    });
  };

  const getCurrentWeather = async (
    lat: number,
    lon: number
  ): Promise<ITransformedCurrentWeather> => {
    const endpoint = `/data/2.5/weather`;
    const params = `lat=${lat}&lon=${lon}&units=metric`;
    const res = await request<ICurrentWeather>(endpoint, params);
    return _transformWeatherData(res);
  };

  const getFiveDayForecast = async (
    lat: number,
    lon: number
  ): Promise<ITransformedForecastWithSummary[]> => {
    const endpoint = `/data/2.5/forecast`;
    const params = `lat=${lat}&lon=${lon}&units=metric`;
    const res = await request<IFiveDayForecast>(endpoint, params);
    return _transformFiveDayForecast(res.list);
  };

  const _transformWeatherData = (
    data: ICurrentWeather
  ): ITransformedCurrentWeather => {
    return {
      locationName: `${data.name}, ${data.sys.country}`,
      date: _transformDate(new Date(data.dt * 1000), "mm dd, time"),
      sunrise: _transformTime(new Date(data.sys.sunrise * 1000)),
      sunset: _transformTime(new Date(data.sys.sunset * 1000)),
      icon: `${_apiBaseImg}${data.weather[0].icon}@4x.png`,
      temperature: `${Math.round(data.main.temp)}°C`,
      feelsLike: Math.round(data.main.feels_like),
      pressure: `${data.main.pressure}hPa`,
      humidity: `Humidity: ${data.main.humidity}%`,
      visibility: `Visibility: ${(data.visibility / 1000).toFixed(1)}km`,
      description:
        data.weather[0].description[0].toUpperCase() +
        data.weather[0].description.slice(1),
      wind: _transformWind(data),
    };
  };

  const _transformFiveDayForecast = (
    data: IForecastWeather[]
  ): ITransformedForecastWithSummary[] => {
    const transformed = data.map((item: IForecastWeather) => {
      return {
        date: _transformDate(new Date(item.dt * 1000), "day, mm dd"),
        data: [
          {
            time: _transformTime(new Date(item.dt * 1000)),
            icon: `${_apiBaseImg}${item.weather[0].icon}@4x.png`,
            temperature: `${Math.round(item.main.temp)}°C`,
            feelsLike: `${Math.round(item.main.feels_like)}°C`,
            temperatureMin: Math.round(item.main.temp_min),
            temperatureMax: Math.round(item.main.temp_max),
            description:
              item.weather[0].description[0].toUpperCase() +
              item.weather[0].description.slice(1),
            wind: _transformWind(item),
            pressure: `${item.main.pressure}hPa`,
            humidity: `Humidity: ${item.main.humidity}%`,
            visibility: `Visibility: ${(item.visibility / 1000).toFixed(1)}km`,
          },
        ],
      };
    });

    return _getDailyTemperatureStats(_groupForecastByDay(transformed));
  };

  return {
    loading,
    error,
    searchCity,
    getCurrentWeather,
    getFiveDayForecast,
  };
};

export default useOpenWeatherService;
