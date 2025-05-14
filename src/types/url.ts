import { ReadonlyURLSearchParams } from "next/navigation";

export type UpdateSearchParamsProps = {
  isValidSorting: boolean;
  validSortFields: string[];
  safeCategories?: string[];
  selectedCategories?: Set<string>;
  selectedGender?: string | null;
  newCurrentPage: number;
  currentPage: number;
  newPageSize: number;
  pageSize: number;
  search: string | null;
  searchParams: ReadonlyURLSearchParams;
};
