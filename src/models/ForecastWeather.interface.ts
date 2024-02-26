export interface IForecastWeather {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: { icon: string; description: string }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}