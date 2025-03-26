import { Table as TableTanStack } from "@tanstack/react-table";

export type TableProps<TData> = {
  table: TableTanStack<TData>;
} & TablePaginationProps;

export type TablePaginationProps = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onCurrentPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export type getProductsTableProps = {
  sortBy: string;
  sortOrder: string;
  categories: string[];
  currentPage: number;
  pageSize: number;
};
