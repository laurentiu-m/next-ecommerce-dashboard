import { ReadonlyURLSearchParams } from "next/navigation";

export type UpdateSearchParamsProps = {
  isValidSorting: boolean;
  safeCategories: string[];
  selectedCategories: Set<string>;
  newCurrentPage: number;
  currentPage: number;
  newPageSize: number;
  pageSize: number;
  search: string | null;
  searchParams: ReadonlyURLSearchParams;
};
