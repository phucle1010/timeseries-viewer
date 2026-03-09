import { formatNumber, formatPercent, formatMarketCap } from "../format";

describe("format helpers", () => {
  describe("formatNumber", () => {
    // Test standard decimal formatting
    it("should format a number with the default of 2 decimal places", () => {
      expect(formatNumber(123.456)).toBe("123.46");
    });

    // Test custom digit precision
    it("should format a number with a custom number of digits", () => {
      expect(formatNumber(123.4, 0)).toBe("123");
      expect(formatNumber(123.456, 4)).toBe("123.4560");
    });

    // Test null/undefined edge cases
    it("should return a dash for null or undefined values", () => {
      expect(formatNumber(null)).toBe("-");
      expect(formatNumber(undefined)).toBe("-");
    });
  });

  describe("formatPercent", () => {
    // Test positive values (should include the "+" sign)
    it('should prepend a "+" sign for positive percentages', () => {
      expect(formatPercent(5.25)).toBe("+5.3%");
    });

    // Test negative values
    it("should handle negative percentages correctly", () => {
      expect(formatPercent(-3.14)).toBe("-3.1%");
    });

    // Test custom precision
    it("should respect the digits parameter for precision", () => {
      expect(formatPercent(1.234, 2)).toBe("+1.23%");
    });

    // Test zero and empty states
    it("should return a dash for 0, null, or undefined", () => {
      expect(formatPercent(0)).toBe("-");
      expect(formatPercent(null)).toBe("-");
      expect(formatPercent(undefined)).toBe("-");
    });
  });

  describe("formatMarketCap", () => {
    // Test Trillion range (values >= 1,000,000M)
    it("should format values in the millions into Trillions ($T)", () => {
      expect(formatMarketCap(3_000_000)).toBe("$3.00T");
      expect(formatMarketCap(1_550_000)).toBe("$1.55T");
    });

    // Test Billion range (values >= 1,000M and < 1,000,000M)
    it("should format values in the millions into Billions ($B)", () => {
      expect(formatMarketCap(500_000)).toBe("$500.00B");
      expect(formatMarketCap(1_200)).toBe("$1.20B");
    });

    // Test Million range (values < 1,000M)
    it("should format values as Millions ($M) if below 1,000", () => {
      expect(formatMarketCap(950.5)).toBe("$950.50M");
      expect(formatMarketCap(50)).toBe("$50.00M");
    });

    // Test non-finite edge cases
    it("should return a dash for non-finite numbers", () => {
      expect(formatMarketCap(NaN)).toBe("-");
      expect(formatMarketCap(Infinity)).toBe("-");
    });
  });
});
