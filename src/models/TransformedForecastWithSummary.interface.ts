import { ITemperatureSummary } from "./TemperatureSummary.interface";
import { ITransformedForecast } from "./TransformedForecast.interface";

export interface ITransformedForecastWithSummary
  extends ITemperatureSummary,
    ITransformedForecast {}
