import { ReadonlyURLSearchParams } from "next/navigation";

import { SortingState, Updater } from "@tanstack/react-table";

export const getSorting = (searchParams: ReadonlyURLSearchParams) => {
  const sortBy = searchParams.get("sortBy")?.trim();
  const sortOrder = searchParams.get("sortOrder")?.trim();

  if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
    return [];
  }

  return [{ id: sortBy, desc: sortOrder === "desc" }];
};

export const getSelectedCategories = (
  searchParams: ReadonlyURLSearchParams
) => {
  const categories = searchParams.get("categories");
  return new Set(categories ? categories.split(",") : []);
};

export const getCurrentPage = (searchParams: ReadonlyURLSearchParams) => {
  const currentPage = searchParams.get("currentPage");
  return currentPage ? Number(currentPage) : 1;
};

export const getPageSize = (searchParams: ReadonlyURLSearchParams) => {
  const pageSize = searchParams.get("pageSize");
  return pageSize ? Number(pageSize) : 10;
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
    params.set("sortBy", id);
    params.set("sortOrder", desc ? "desc" : "asc");
  } else {
    params.delete("sortBy");
    params.delete("sortOrder");
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

  if (updatedCategories.size) {
    params.set("categories", Array.from(updatedCategories).join(","));
  } else {
    params.delete("categories");
  }

  return params;
};

export const handleCurrentPageChange = (
  page: number,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set("currentPage", String(page));

  return params;
};
