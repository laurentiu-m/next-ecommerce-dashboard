import { useCallback } from "react";

import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

import { OnChangeFn, SortingState } from "@tanstack/react-table";

import {
  handleCategoryChange,
  handleCurrentPageChange,
  handlePageSizeChange,
  handleSearchChange,
  handleSortingChange,
} from "@/lib";

type Props = {
  searchParams: ReadonlyURLSearchParams;
  sorting: {
    id: string;
    desc: boolean;
  }[];
  selectedCategories: Set<string>;
};

export const useSearchParamsHandlers = ({
  searchParams,
  sorting,
  selectedCategories,
}: Props) => {
  const router = useRouter();

  const updateParams = useCallback(
    (newParams: URLSearchParams) => {
      router.replace(`?${newParams.toString()}`, { scroll: false });
    },
    [router]
  );

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const updatedParams = handleSortingChange(searchParams, sorting, updater);
    updateParams(updatedParams);
  };

  const onCategoryChange = (category: string) => {
    const updatedParams = handleCategoryChange(
      searchParams,
      selectedCategories,
      category
    );
    updateParams(updatedParams);
  };

  const onCurrentPageChange = (page: number) => {
    const updatedParams = handleCurrentPageChange(page, searchParams);
    updateParams(updatedParams);
  };

  const onPageSizeChange = (pageSize: number) => {
    const updatedParams = handlePageSizeChange(pageSize, searchParams);
    updateParams(updatedParams);
  };

  const onSearchChange = (search: string) => {
    const updatedParams = handleSearchChange(search, searchParams);
    updateParams(updatedParams);
  };

  return {
    onSortingChange,
    onCategoryChange,
    onCurrentPageChange,
    onPageSizeChange,
    onSearchChange,
  };
};
