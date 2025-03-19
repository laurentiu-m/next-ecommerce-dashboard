import { ReadonlyURLSearchParams } from "next/navigation";

import { SortingState, Updater } from "@tanstack/react-table";

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
