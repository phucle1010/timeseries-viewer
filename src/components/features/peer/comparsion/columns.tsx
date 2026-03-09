import type { ColumnDef } from "@tanstack/react-table";

import type { StockData } from "@/types/stock-data";

import { Checkbox } from "@/components/ui/checkbox";

import { Company } from "./company";

import { formatMarketCap, formatNumber, formatPercent } from "@/lib/helpers/format";
import { cn } from "@/lib/helpers/style";

export const MAX_SELECTED = 4;

function percentClass(value: number | null | undefined) {
  if (value === null || value === undefined) return "text-muted-foreground";
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  if (value < 0) return "text-rose-600 dark:text-rose-400";
  return "text-muted-foreground";
}

export function createPeerComparisonColumns(): ColumnDef<StockData>[] {
  return [
    {
      id: "select",
      size: 44,
      fitContentCollumn: true,
      header: ({ table }) => (
        <span className="text-xs font-medium text-muted-foreground">
          ({Object.values(table.getState().rowSelection).filter(Boolean).length}/{MAX_SELECTED})
        </span>
      ),
      cell: ({ row, table }) => {
        const selectedCount = Object.values(table.getState().rowSelection).filter(Boolean).length;
        const disableBecauseLimit = !row.getIsSelected() && selectedCount >= MAX_SELECTED;

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              disabled={disableBecauseLimit}
              onCheckedChange={(value) => {
                if (!row.getIsSelected() && selectedCount >= MAX_SELECTED) return;
                row.toggleSelected(Boolean(value));
              }}
              aria-label={`Select ${row.original.symbolCode}`}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "company",
      accessorKey: "companyName",
      size: 300,
      header: () => (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Company</span>
        </div>
      ),
      cell: ({ row }) => <Company row={row.original} />,
      enableSorting: false,
    },
    {
      id: "marketCap",
      accessorKey: "marketCapitalization",
      size: 140,
      header: () => <span className="text-sm font-medium text-foreground">Market Cap</span>,
      cell: ({ row }) => (
        <span className="text-sm text-foreground">
          {formatMarketCap(row.original.marketCapitalization)}
        </span>
      ),
      enableSorting: false,
    },
    {
      id: "peTTM",
      accessorKey: "peTtm",
      size: 110,
      header: () => <span className="text-sm font-medium text-foreground">PE TTM</span>,
      cell: ({ row }) => (
        <span className="text-sm text-foreground">{formatNumber(row.original.peTtm, 2)}</span>
      ),
      enableSorting: false,
    },
    {
      id: "revGrowthTTM",
      accessorKey: "revenueGrowthTtmYoy",
      size: 160,
      header: () => <span className="text-sm font-medium text-foreground">Rev Growth TTM</span>,
      cell: ({ row }) => (
        <span
          className={cn("text-sm tabular-nums", percentClass(row.original.revenueGrowthTtmYoy))}
        >
          {formatPercent(row.original.revenueGrowthTtmYoy, 1)}
        </span>
      ),
      enableSorting: false,
    },
    {
      id: "divYieldTTM",
      accessorKey: "currentDividendYieldTtm",
      size: 150,
      header: () => <span className="text-sm font-medium text-foreground">Div Yield TTM</span>,
      cell: ({ row }) => (
        <span
          className={cn("text-sm tabular-nums", percentClass(row.original.currentDividendYieldTtm))}
        >
          {formatPercent(row.original.currentDividendYieldTtm, 1)}
        </span>
      ),
      enableSorting: false,
    },
  ];
}
