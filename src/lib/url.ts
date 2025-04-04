import { ReadonlyURLSearchParams } from "next/navigation";

import { SortingState, Updater } from "@tanstack/react-table";

import {
  Order,
  TableParam,
  validSortFieldsProducts,
  validSortOrders,
} from "@/constants";
import { UpdateSearchParamsProps } from "@/types/url";

export const getSorting = (searchParams: ReadonlyURLSearchParams) => {
  const sortBy = searchParams.get(TableParam.SortBy)?.trim();
  const sortOrder = searchParams
    .get(TableParam.SortOrder)
    ?.trim()
    .toLocaleLowerCase();

  if (!sortBy || !sortOrder || !validSortOrders.includes(sortOrder)) {
    return [];
  }

  return [
    {
      id: sortBy,
      desc: sortOrder === Order.DESC,
    },
  ];
};

export const getSelectedCategories = (
  searchParams: ReadonlyURLSearchParams
) => {
  const categories = searchParams.get(TableParam.Categories);
  return new Set(categories ? categories.split(",") : []);
};

export const getCurrentPage = (searchParams: ReadonlyURLSearchParams) => {
  const currentPage = searchParams.get(TableParam.CurrentPage);
  return currentPage ? Number(currentPage) : 1;
};

export const getPageSize = (searchParams: ReadonlyURLSearchParams) => {
  const pageSize = searchParams.get(TableParam.PageSize);
  return pageSize ? Number(pageSize) : 10;
};

export const getSearch = (searchParams: ReadonlyURLSearchParams) => {
  const search = searchParams.get(TableParam.Search);
  return search;
};

export const handleSortingChange = (
  searchParams: ReadonlyURLSearchParams,
  sorting: {
    id: string;
    desc: boolean;
  }[],
  updater: Updater<SortingState>
) => {
  const newSorting = typeof updater === "function" ? updater(sorting) : updater;

  const params = new URLSearchParams(searchParams.toString());

  if (newSorting.length > 0) {
    const { id, desc } = newSorting[0];
    params.set(TableParam.SortBy, id);
    params.set(TableParam.SortOrder, desc ? Order.DESC : Order.ASC);
  } else {
    params.delete(TableParam.SortBy);
    params.delete(TableParam.SortOrder);
  }

  return params;
};

export const handleCategoryChange = (
  searchParams: ReadonlyURLSearchParams,
  selectedCategories: Set<string>,
  category: string
) => {
  const updatedCategories = new Set(selectedCategories);

  if (updatedCategories.has(category)) {
    updatedCategories.delete(category);
  } else {
    updatedCategories.add(category);
  }

  const params = new URLSearchParams(searchParams.toString());

  if (updatedCategories.size && !updatedCategories.has("")) {
    params.set(TableParam.Categories, Array.from(updatedCategories).join(","));
  } else {
    params.delete(TableParam.Categories);
  }

  return params;
};

export const handleCurrentPageChange = (
  page: number,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set(TableParam.CurrentPage, String(page));

  return params;
};

export const handlePageSizeChange = (
  pageSize: number,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set(TableParam.PageSize, String(pageSize));

  return params;
};

export const handleSearchChange = (
  search: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set(TableParam.Search, search);

  return params;
};

export const handleSafeSortingParams = (
  sortBy: string | null,
  sortOrder: string | null
) => {
  if (!sortBy || !sortOrder) return true;

  const isValidSortBy = validSortFieldsProducts.includes(sortBy);
  const isValidSortOrder = validSortOrders.includes(sortOrder);

  if (!isValidSortBy || !isValidSortOrder) return false;
  return true;
};

export const updateSearchParams = ({
  isValidSorting,
  safeCategories,
  selectedCategories,
  newCurrentPage,
  currentPage,
  newPageSize,
  pageSize,
  search,
  searchParams,
}: UpdateSearchParamsProps) => {
  const params = new URLSearchParams(searchParams);
  let shouldUpdate = false;

  if (search === "") {
    params.delete(TableParam.Search);
    shouldUpdate = true;
  }

  const isValidSortingParams = handleSafeSortingParams(
    params.get(TableParam.SortBy),
    params.get(TableParam.SortOrder)
  );

  if (!isValidSorting || !isValidSortingParams) {
    params.delete(TableParam.SortBy);
    params.delete(TableParam.SortOrder);
    shouldUpdate = true;
  }

  if (safeCategories.length !== selectedCategories.size) {
    params.delete(TableParam.Categories);
    shouldUpdate = true;
  }

  if (newCurrentPage !== currentPage || newPageSize !== pageSize) {
    params.set(TableParam.CurrentPage, newCurrentPage.toString());
    params.set(TableParam.PageSize, newPageSize.toString());
    shouldUpdate = true;
  }

  return { shouldUpdate, params };
};
