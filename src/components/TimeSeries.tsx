import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import TimeSeriesResponse from "../models/TimeSeries";
import { fetchTimes } from "../services/ApiService";

const TimeSeries: React.FC = () => {
  const [data, setData] = useState<TimeSeriesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cont = await fetchTimes();
        setData(cont);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">IBM Stock Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data &&
          Object.entries(data["Time Series (5min)"]).map(([time, values]) => (
            <div key={time} className="bg-blue-100 shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{time}</h2>
              <p className="mb-1">
                <span className="font-semibold">Open:</span> {values["1. open"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">High:</span> {values["2. high"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Low:</span> {values["3. low"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Close:</span> {values["4. close"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Volume:</span> {values["5. volume"]}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimeSeries;