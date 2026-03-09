import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "@/components/common/data-table/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { getCommonPinningStyles } from "@/lib/helpers/data-table";
import { cn } from "@/lib/helpers/style";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  loading?: boolean;
  showFooter?: boolean;
  headerClassName?: string;
  tableWrapperClassName?: string;
  noDataLabel?: string;
}

export function DataTable<TData>({
  table,
  children,
  className,
  loading = false,
  showFooter = true,
  headerClassName,
  tableWrapperClassName,
  noDataLabel = "No results.",
  ...props
}: DataTableProps<TData>) {
  const hasData = table.getRowModel().rows?.length > 0;
  const showSkeleton = loading && !hasData;

  return (
    <div className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)} {...props}>
      {children}
      <div className={cn("relative overflow-auto", tableWrapperClassName)}>
        <Table>
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      minWidth: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.size,
                      ...getCommonPinningStyles({ column: header.column }),
                    }}
                    className={cn(headerClassName)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {hasData ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.fitContentCollumn
                          ? "fit-content"
                          : cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.fitContentCollumn
                          ? "fit-content"
                          : cell.column.columnDef.size,
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : showSkeleton ? (
              // Show skeleton rows during initial loading
              Array.from({
                length: Math.max(5, table.getRowModel().rows.length),
              }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="h-[calc(3.25rem+1px)]">
                  {table.getVisibleLeafColumns().map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.columnDef.size,
                        maxWidth: column.columnDef.size,
                        ...getCommonPinningStyles({ column }),
                      }}
                    >
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  {noDataLabel}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showFooter && (
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
