import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TimeSeries from "../TimeSeries";
import { fetchTimes } from "../../services/ApiService";

jest.mock("../../services/ApiService");

describe("TimeSeries Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* eslint-disable @typescript-eslint/no-empty-function */
  test("renders loading spinner initially", () => {
    (fetchTimes as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<TimeSeries />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders stock data after fetching", async () => {
    const mockData = {
      "Time Series (5min)": {
        "2024-07-24 16:00:00": {
          "1. open": "150.00",
          "2. high": "155.00",
          "3. low": "149.00",
          "4. close": "154.00",
          "5. volume": "10000",
        },
        "2024-07-24 15:55:00": {
          "1. open": "149.50",
          "2. high": "150.50",
          "3. low": "148.50",
          "4. close": "150.00",
          "5. volume": "20000",
        },
      },
    };

    (fetchTimes as jest.Mock).mockResolvedValueOnce(mockData);
    render(<TimeSeries />);
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(screen.getByText(/IBM Stock Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Open:/i)).toBeInTheDocument();
    expect(screen.getByText(/High:/i)).toBeInTheDocument();
    expect(screen.getByText(/Low:/i)).toBeInTheDocument();
    expect(screen.getByText(/Close:/i)).toBeInTheDocument();
    expect(screen.getByText(/Volume:/i)).toBeInTheDocument();
    expect(screen.getByText(/150.00/i)).toBeInTheDocument(); 
    expect(screen.getByText(/155.00/i)).toBeInTheDocument(); 
    expect(screen.getByText(/149.00/i)).toBeInTheDocument();
    expect(screen.getByText(/154.00/i)).toBeInTheDocument();
    expect(screen.getByText(/10000/i)).toBeInTheDocument(); 
  });

  test("handles error during data fetching", async () => {
    (fetchTimes as jest.Mock).mockRejectedValueOnce(new Error("Fetch error")); 
    render(<TimeSeries />);
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );
 });
});
