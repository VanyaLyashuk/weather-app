export interface ICurrentWeather {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  visibility: number;
  weather: { icon: string; description: string }[];
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
