import type { ColumnSort, Row, RowData } from "@tanstack/react-table";
import type { DataTableConfig } from "@/lib/configs/data-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    displayFormat?: string;
    saveFormat?: string;
    dependOnColumn?: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnDefBase<TData> {
    fitContentCollumn?: boolean;
  }
}

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  [key: string]: unknown;
}

export type FilterVariant = DataTableConfig["filterVariants"][number];

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}

export interface DataTableRowAction<TData> {
  row?: Row<TData>;
  variant: string;
}
