type MetaData = {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
};

type TimeSeriesEntry = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

type TimeSeriesData = {
  [key: string]: TimeSeriesEntry;
};

type TimeSeriesResponse = {
  "Meta Data": MetaData;
  "Time Series (5min)": TimeSeriesData;
};
export default TimeSeriesResponse;
