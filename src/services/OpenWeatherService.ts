import {
  ICurrentWeather,
  IFiveDayForecast,
  IForecastWeather,
  ILocation,
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
  private _apiBase: string = "https://api.openweathermap.org/data/2.5/";
  private _apiKey: string = "54e6a33b161001dd37822697dce2955c";
  private _defaultLocation: ILocation = {
    lat: 45.34,
    lon: 28.84,
  };

  private async getResource<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  public async getCurrentWeather(): Promise<ITransformedCurrentWeather> {
    const url: string = `${this._apiBase}weather?lat=${this._defaultLocation.lat}&lon=${this._defaultLocation.lon}&appid=${this._apiKey}&units=metric`;
    const res: ICurrentWeather = await this.getResource<ICurrentWeather>(url);

    return this._transformWeatherData(res);
  }

  public async getFiveDayForecast(): Promise<
    ITransformedForecastWithSummary[]
  > {
    const url: string = `${this._apiBase}forecast?lat=${this._defaultLocation.lat}&lon=${this._defaultLocation.lon}&appid=${this._apiKey}&units=metric`;
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
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
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
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
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
