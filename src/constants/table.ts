export const validSortFieldsProducts = ["title", "stock", "rating", "price"];
export const validSortFieldsCategories = ["name"];
export const validSortOrders = ["asc", "desc"];

export const sortOrders = [
  { name: "Default", value: "" },
  { name: "Asc", value: "asc" },
  { name: "Desc", value: "desc" },
];

export const actions = ["Edit", "Delete"];

export const rows = [10, 20, 30, 40, 50];

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export enum TableParam {
  SortBy = "sortBy",
  SortOrder = "sortOrder",
  CurrentPage = "currentPage",
  PageSize = "pageSize",
  Categories = "categories",
  Search = "search",
}
