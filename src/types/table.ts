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
