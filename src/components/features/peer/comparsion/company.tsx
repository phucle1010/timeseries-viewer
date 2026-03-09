import type { StockData } from "@/types/stock-data";

export function Company({ row }: { row: StockData }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-7 shrink-0 overflow-hidden rounded-full">
        <img src={row.logo} alt={row.companyName} sizes="28px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-foreground">{row.companyName}</div>
        <div className="truncate text-xs text-muted-foreground">{row.symbolCode}</div>
      </div>
    </div>
  );
}
