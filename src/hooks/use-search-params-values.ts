import { useMemo } from "react";

import { ReadonlyURLSearchParams } from "next/navigation";

import {
  getCurrentPage,
  getPageSize,
  getSearch,
  getSelectedCategories,
  getSelectedGender,
  getSorting,
} from "@/lib";

export const useSearchParamsValues = (
  searchParams: ReadonlyURLSearchParams
) => {
  return useMemo(() => {
    return {
      sorting: getSorting(searchParams),
      selectedCategories: getSelectedCategories(searchParams),
      selectedGender: getSelectedGender(searchParams),
      currentPage: getCurrentPage(searchParams),
      pageSize: getPageSize(searchParams),
      search: getSearch(searchParams),
    };
  }, [searchParams]);
};
