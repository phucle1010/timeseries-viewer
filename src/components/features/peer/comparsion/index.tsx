import type { Table } from "@tanstack/react-table";

import type { StockData } from "@/types/stock-data";

import { DataTable } from "@/components/common/data-table";

interface PeerComparisonTableProps {
  table: Table<StockData>;
}

export function PeerComparisonTable({ table }: PeerComparisonTableProps) {
  return (
    <section className="rounded-lg bg-card p-6 shadow-none">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">Peer Comparison Table</h2>
      </div>

      <DataTable
        table={table}
        showFooter={false}
        headerClassName="!bg-[#f8f8f9] text-muted-foreground"
        tableWrapperClassName="rounded-none border-0"
        className="gap-3"
      />
    </section>
  );
}
