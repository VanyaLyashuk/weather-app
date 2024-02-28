export interface ITransformedForecast {
  date: string;
  data: {
    time: string;
    icon: string;
    temperature: string;
    feelsLike: string;
    temperatureMin: number;
    temperatureMax: number;
    description: string;
    wind: string;
    pressure: string;
    humidity: string;
    visibility: string;
  }[];
}
