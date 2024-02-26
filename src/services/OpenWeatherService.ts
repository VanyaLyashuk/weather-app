import {
  ICurrentWeather,
  IFiveDayForecast,
  IForecastWeather,
  ILocation,
  ITransformedCurrentWeather,
  ITransformedFiveDayForecast,
} from "@models/index";

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

  public async getFiveDayForecast(): Promise<ITransformedFiveDayForecast[]> {
    const url: string = `${this._apiBase}forecast?lat=${this._defaultLocation.lat}&lon=${this._defaultLocation.lon}&appid=${this._apiKey}&units=metric`;
    const res: IFiveDayForecast = await this.getResource<IFiveDayForecast>(url);

    console.log(this._transformFiveDayForecast(res.list));

    return this._transformFiveDayForecast(res.list);
  }

  private _transformWeatherData(
    data: ICurrentWeather
  ): ITransformedCurrentWeather {
    return {
      locationName: `${data.name}, ${data.sys.country}`,
      date: this._transformDate(new Date(data.dt * 1000), "mm dd, time"),
      sunrise: this._transformTime(new Date(data.sys.sunrise * 1000)),
      sunset: this._transformTime(new Date(data.sys.sunset * 1000)),
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      temperature: `${Math.round(data.main.temp)}°C`,
      feelsLike: Math.round(data.main.feels_like),
      pressure: `${data.main.pressure}hPa`,
      humidity: `Humidity: ${data.main.humidity}%`,
      visibility: `Visibility: ${(data.visibility / 1000).toFixed(1)}km`,
      description:
        data.weather[0].description[0].toUpperCase() +
        data.weather[0].description.slice(1),
      wind: this._transformWind(data),
    };
  }

  private _transformFiveDayForecast = (
    data: IForecastWeather[]
  ): ITransformedFiveDayForecast[] => {
    const transformed: ITransformedFiveDayForecast[] = data.map(
      (item: IForecastWeather) => {
        return {
          date: this._transformDate(new Date(item.dt * 1000), "day, mm dd"),
          data: [
            {
              time: this._transformTime(new Date(item.dt * 1000)),
              icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              temperature: `${Math.round(item.main.temp)}°C`,
              temperatureMin: `${Math.round(item.main.temp_min)}°C`,
              temperatureMax: `${Math.round(item.main.temp_max)}°C`,
              description:
                item.weather[0].description[0].toUpperCase() +
                item.weather[0].description.slice(1),
              wind: this._transformWind(item),
              pressure: `${item.main.pressure}hPa`,
              humidity: `Humidity: ${item.main.humidity}%`,
              visibility: `Visibility: ${(item.visibility / 1000).toFixed(
                1
              )}km`,
            },
          ],
        };
      }
    );

    return this._groupForecastByDay(transformed);
  };

  private _groupForecastByDay = (
    data: ITransformedFiveDayForecast[]
  ): ITransformedFiveDayForecast[] => {
    const result: ITransformedFiveDayForecast[] = [];

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

  private _transformDate = (date: Date, format?: string): string => {
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
        return `${
          months[date.getMonth()]
        } ${date.getDate()}, ${this._transformTime(date)}`;
    }
  };
  private _transformTime = (date: Date): string => {
    const hours: string = (date.getHours() % 12 || 12).toString();
    const minutes: string =
      date.getMinutes() < 10
        ? `0${date.getMinutes()}`
        : date.getMinutes().toString();
    const ampm: string = date.getHours() < 12 ? "am" : "pm";

    return `${hours}:${minutes}${ampm}`;
  };
  private _transformWind = (
    data: ICurrentWeather | IForecastWeather
  ): string => {
    return `${data.wind.speed} m/s ${this._transformWindDirection(
      data.wind.deg
    )}`;
  };
  private _transformWindDirection = (degrees: number): string => {
    const directions: string[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    return directions[Math.round(degrees / 45) % 8];
  };
}

export default OpenWeatherService;