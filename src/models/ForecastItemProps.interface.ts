import { ITransformedForecastWithSummary } from "./TransformedForecastWithSummary.interface";

export interface IForecastItemProps {
  forecast: ITransformedForecastWithSummary;
  key: string;
  index: number;
}
