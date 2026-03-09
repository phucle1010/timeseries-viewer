export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  sortOrders: [
    { label: "Asc", value: "asc" as const },
    { label: "Desc", value: "desc" as const },
  ],
  filterVariants: [
    "text",
    "number",
    "range",
    "date",
    "dateRange",
    "boolean",
    "select",
    "multiSelect",
    "month",
  ] as const,
  pageSizeOptions: [20, 50, 100],
  pageSize: 20,
};
