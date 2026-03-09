import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { dataTableConfig } from "@/lib/configs/data-table";
import { cn } from "@/lib/helpers/style";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = dataTableConfig.pageSizeOptions,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getRowCount();

  // Check if the table state is properly initialized
  const isTableReady = isHydrated && pageIndex >= 0 && table.getPageCount() > 0;

  const paginationInfo = useMemo(() => {
    if (!isTableReady) return null;

    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
    return `${startRow}-${endRow}/${totalRows}`;
  }, [isTableReady, pageIndex, pageSize, totalRows]);

  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
            <SelectValue
              placeholder={
                isTableReady ? table.getState().pagination.pageSize : dataTableConfig.pageSize
              }
            />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="text-muted-foreground flex-1 text-sm whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} /{" "}
            {table.getFilteredRowModel().rows.length} rows selected.
          </div>
        )}
        {paginationInfo && (
          <div
            className="flex items-center justify-center text-sm font-medium"
            suppressHydrationWarning
          >
            {paginationInfo}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={isTableReady && !table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={isTableReady && !table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <div className="text-sm font-medium">
            {isHydrated ? table.getState().pagination.pageIndex + 1 : 1}
          </div>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={isTableReady && !table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={isTableReady && !table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
