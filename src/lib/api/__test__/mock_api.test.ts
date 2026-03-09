import { fetchTimeseriesBySymbols } from "../mock_api";

describe("mock_api helpers", () => {
  // Increase timeout for this test suite because of the 3000ms mock latency
  jest.setTimeout(10000);

  describe("fetchTimeseriesBySymbols", () => {
    const mockSymbols = ["NVDA", "AMD"];

    it("should fetch data for all requested symbols", async () => {
      const result = await fetchTimeseriesBySymbols(mockSymbols);

      expect(result).toHaveLength(mockSymbols.length);
      expect(result[0].symbolCode).toBe("NVDA");
      expect(result[1].symbolCode).toBe("AMD");
    });

    it("should ensure the first data point value is always 0 (normalization baseline)", async () => {
      const result = await fetchTimeseriesBySymbols(["AAPL"]);
      const firstPoint = result[0].data[0];

      // According to the formula ((v - v0) / v0) * 100, the first point (v=v0) must be 0
      expect(firstPoint.v).toBe(0);
    });

    it("should return data points with correct ISO string format", async () => {
      const result = await fetchTimeseriesBySymbols(["MSFT"]);
      const firstDate = result[0].data[0].t;

      // Check if the date format matches YYYY-MM-DDTHH:mm:ssZ
      expect(firstDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    });

    it("should exclude weekends (Saturdays and Sundays) from the timeseries", async () => {
      const result = await fetchTimeseriesBySymbols(["TSM"]);
      const dates = result[0].data.map((point) => new Date(point.t));

      dates.forEach((date) => {
        const day = date.getDay();
        // 0 is Sunday, 6 is Saturday
        expect(day).not.toBe(0);
        expect(day).not.toBe(6);
      });
    });

    it("should simulate approximately 3000ms of latency", async () => {
      const start = Date.now();
      await fetchTimeseriesBySymbols(["GOOGL"]);
      const duration = Date.now() - start;

      // Should be at least 3000ms
      expect(duration).toBeGreaterThanOrEqual(3000);
    });
  });
});
