export interface ITemperatureSummary {
  dailyTemperatureSummary: {
    morning: {
      temperature: string;
      feelsLike: string;
    };
    evening: {
      temperature: string;
      feelsLike: string;
    };
    afternoon: {
      temperature: string;
      feelsLike: string;
    };
    night: {
      temperature: string;
      feelsLike: string;
    };
  };
}
