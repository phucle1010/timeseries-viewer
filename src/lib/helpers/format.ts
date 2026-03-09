const formatNumber = (value: number | null | undefined, digits = 2) => {
  if (value === null || value === undefined) return "-";
  return value.toFixed(digits);
};

const formatPercent = (value: number | null | undefined, digits = 1) => {
  if (value === null || value === undefined || value === 0) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
};

const formatMarketCap = (marketCapitalizationInMillions: number) => {
  // Finnhub's `marketCapitalization` is in "million" units.
  const v = marketCapitalizationInMillions;
  if (!Number.isFinite(v)) return "-";

  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}T`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(2)}B`;
  return `$${v.toFixed(2)}M`;
};

export { formatNumber, formatPercent, formatMarketCap };
