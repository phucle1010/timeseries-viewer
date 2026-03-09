import { createChart, LineSeries } from "lightweight-charts";
import type { IChartApi, ISeriesApi, LineData } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { ChartSkeleton } from "./skeleton";
import { EmptyChartState } from "./empty";
import { VerticalAxisLabel } from "./vertical-axis-label";

import { fetchTimeseriesBySymbols } from "@/lib/api/mock_api";
import { getColorBySymbol } from "@/lib/helpers/color";
import { cn } from "@/lib/helpers/style";

interface PeerPerformanceChartProps {
  selectedSymbols: string[];
  labels: string[];
}

export function PeerPerformanceChart({ selectedSymbols, labels }: PeerPerformanceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<"Line">>>(new Map());

  const [isChartLoading, setIsChartLoading] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "transparent" },
        textColor: "#64748b",
        fontSize: 12,
      },
      grid: {
        vertLines: { color: "#f1f5f9" },
        horzLines: { color: "#f1f5f9" },
      },
      localization: {
        priceFormatter: (price: number) => {
          return `${price.toFixed(0)}%`;
        },
      },
      rightPriceScale: {
        borderVisible: false,
        alignLabels: true,
        autoScale: true,
      },
    });

    chartRef.current = chart;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Remove default trading view logo from lighweight-charts
  useEffect(() => {
    if (typeof document === "undefined") return;

    const tradingViewLogo = document.getElementById("tv-attr-logo");

    if (!tradingViewLogo) return;

    tradingViewLogo.style.display = "none";
  }, [chartRef]);

  useEffect(() => {
    let isMounted = true;

    const updateChart = async () => {
      if (!chartRef.current) return;

      seriesMapRef.current.forEach((series, symbol) => {
        if (!selectedSymbols.includes(symbol)) {
          chartRef.current?.removeSeries(series);
          seriesMapRef.current.delete(symbol);
        }
      });

      const newSymbols = selectedSymbols.filter((s) => !seriesMapRef.current.has(s));

      if (newSymbols.length === 0) return;

      setIsChartLoading(true);

      try {
        const results = await fetchTimeseriesBySymbols(newSymbols);

        if (!isMounted) return;

        results.forEach((item) => {
          if (seriesMapRef.current.has(item.symbolCode)) return;

          const color = getColorBySymbol(item.symbolCode);
          const newSeries = chartRef.current!.addSeries(LineSeries, {
            color,
            lineWidth: 2,
          });

          const chartData: LineData[] = item.data.map((p) => ({
            time: p.t.split("T")[0],
            value: p.v,
          }));

          newSeries.setData(chartData);
          seriesMapRef.current.set(item.symbolCode, newSeries);
        });
      } catch (error) {
        if (isMounted) console.error("Failed to fetch timeseries:", error);
      } finally {
        if (isMounted) setIsChartLoading(false);
      }
    };

    updateChart();

    return () => {
      isMounted = false;
    };
  }, [selectedSymbols]);

  return (
    <section className="rounded-lg bg-card p-6 shadow-none">
      <div className="mb-4 flex items-end gap-2">
        <h2 className="text-lg font-semibold text-foreground leading-none">Peer Performance</h2>
        {isChartLoading && <span className="text-xs text-neutral-500">(Refetching...)</span>}
      </div>

      <div className="relative h-[400px] w-full">
        {isChartLoading && <ChartSkeleton />}

        {!isChartLoading && selectedSymbols.length > 0 && (
          <div className="absolute top-2 left-3 z-10 flex flex-col gap-1">
            {selectedSymbols.map((symbol, index) => (
              <div key={symbol} className="flex items-center gap-1 transition-all">
                <div
                  className="h-3 w-3 rounded-[3px]"
                  style={{ backgroundColor: getColorBySymbol(symbol) }}
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {labels[index]}
                </span>
              </div>
            ))}
          </div>
        )}

        <div
          ref={chartContainerRef}
          className={cn(
            "w-full h-full",
            selectedSymbols.length === 0 ? "opacity-0" : "opacity-100"
          )}
        />

        {!isChartLoading && selectedSymbols.length === 0 && <EmptyChartState />}

        <VerticalAxisLabel />
      </div>

      <p className="text-sm text-neutral-400 text-center mt-4">
        Select up to 4 companies in the table above to customize the chart view.
      </p>
    </section>
  );
}
