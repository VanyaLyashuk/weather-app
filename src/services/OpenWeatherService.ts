interface Location {
  lat: number;
  lon: number;
}

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  visibility: number;
  weather: Array<{ icon: string; description: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
}

interface TransformWeatherData {
  locationName: string;
  date: string;
  sunrise: string;
  sunset: string;
  icon: string;
  temperature: string;
  pressure: string;
  humidity: string;
  visibility: string;
  feelsLike: number;
  description: string;
  wind: string;
}

class OpenWeatherService {
  private _apiBase: string = "https://api.openweathermap.org/data/2.5/";
  private _apiKey: string = "54e6a33b161001dd37822697dce2955c";
  private _defaultLocation: Location = {
    lat: 45.34,
    lon: 28.84,
  };

  private async getResource(url: string): Promise<any> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  public async getCurrentWeather(): Promise<TransformWeatherData> {
    const url: string = `${this._apiBase}weather?lat=${this._defaultLocation.lat}&lon=${this._defaultLocation.lon}&appid=${this._apiKey}&units=metric`;
    const res: WeatherData = await this.getResource(url);

    console.log(res);
    
    return this._transformWeatherData(res);
  }

  private _transformWeatherData(data: WeatherData): TransformWeatherData {
    return {
      locationName: `${data.name}, ${data.sys.country}`,
      date: this._transformDate(new Date(data.dt * 1000)),
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
  private _transformWind = (data: WeatherData): string => {
    return `${data.wind.speed} m/s ${this._transformWindDirection(data.wind.deg)}`;
  };
  private _transformWindDirection = (degrees: number): string => {
    const directions: string[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    return directions[Math.round(degrees / 45) % 8];
  };

  private _transformDate = (date: Date): string => {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    return `${months[date.getMonth()]} ${date.getDate()}, ${this._transformTime(
      date
    )}`;
  };
  private _transformTime = (date: Date): string => {
    const hours: string = (date.getHours() % 12 || 12).toString();
    const minutes: string = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString();
    const ampm: string = date.getHours() < 12 ? "am" : "pm";

    return `${hours}:${minutes}${ampm}`;
  };
}

export default OpenWeatherService;
