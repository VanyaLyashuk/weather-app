export interface ITransformedFiveDayForecast {
  date: string;
  data: {
    time: string;
    icon: string;
    temperature: string;
    temperatureMin: string;
    temperatureMax: string;
    description: string;
    wind: string;
    pressure: string;
    humidity: string;
    visibility: string;
  }[];
}
