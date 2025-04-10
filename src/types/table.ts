import { Table as TableTanStack } from "@tanstack/react-table";

export type TableProps<TData> = {
  table: TableTanStack<TData>;
  search: string | null;
  onSearchChange: (search: string) => void;
} & TablePaginationProps;

export type TablePaginationProps = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onCurrentPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export type ProductsTableProps = {
  sortBy: string;
  sortOrder: string;
  categories: string[];
  currentPage: number;
  pageSize: number;
  search: string | null;
};

export type CategoriesTableProps = {
  sortBy: string;
  sortOrder: string;
  currentPage: number;
  pageSize: number;
  search: string | null;
};
