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

class OpenWeatherService {
  private _apiBase: string = "https://api.openweathermap.org/";
  private _apiBaseImg: string = "http://openweathermap.org/img/wn/";
  private _apiKey: string = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  private async getResource<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  public async searchCity(query: string): Promise<ICity[]> {
    const url: string = `${this._apiBase}geo/1.0/direct?q=${query}&limit=5&appid=${this._apiKey}`;
    const response = await this.getResource<ICity[]>(url);

    const uniqueCities = new Set();

    const filteredCities = response.filter((city) => {
      const identifier = `${city.name}, ${city.country}`;
      if (!uniqueCities.has(identifier)) {
        uniqueCities.add(identifier);
        return true;
      }
      return false;
    });

    return filteredCities;
  }

  public async getCurrentWeather(
    lat: number,
    lon: number
  ): Promise<ITransformedCurrentWeather> {
    const url: string = `${this._apiBase}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric`;
    const res: ICurrentWeather = await this.getResource<ICurrentWeather>(url);

    return this._transformWeatherData(res);
  }

  public async getFiveDayForecast(
    lat: number,
    lon: number
  ): Promise<ITransformedForecastWithSummary[]> {
    const url: string = `${this._apiBase}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric`;
    const res: IFiveDayForecast = await this.getResource<IFiveDayForecast>(url);

    return this._transformFiveDayForecast(res.list).splice(0, 5);
  }

  private _transformWeatherData(
    data: ICurrentWeather
  ): ITransformedCurrentWeather {
    return {
      locationName: `${data.name}, ${data.sys.country}`,
      date: _transformDate(new Date(data.dt * 1000), "mm dd, time"),
      sunrise: _transformTime(new Date(data.sys.sunrise * 1000)),
      sunset: _transformTime(new Date(data.sys.sunset * 1000)),
      icon: `${this._apiBaseImg}${data.weather[0].icon}@4x.png`,
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
  }

  private _transformFiveDayForecast = (
    data: IForecastWeather[]
  ): ITransformedForecastWithSummary[] => {
    const transformed = data.map((item: IForecastWeather) => {
      return {
        date: _transformDate(new Date(item.dt * 1000), "day, mm dd"),
        data: [
          {
            time: _transformTime(new Date(item.dt * 1000)),
            icon: `${this._apiBaseImg}${item.weather[0].icon}@4x.png`,
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
}

export default OpenWeatherService;
