"use server";

import { categoriesArr, rows, validSortOrders } from "@/constants";

import { prisma } from "./prisma";

export const handleSafePage = async (
  pageSize: number,
  currentPage: number,
  totalPages: number
) => {
  const safePageSize = rows.includes(pageSize) ? pageSize : 10;
  const safeCurrentPage =
    currentPage > 1 && currentPage <= totalPages ? currentPage : 1;

  return { safePageSize, safeCurrentPage };
};

export const handleSafeSorting = async (
  sortBy: string,
  sortOrder: string,
  validSortFields: string[]
) => {
  if (!sortBy || !sortOrder)
    return { isValid: true, sortBy: null, sortOrder: null };

  const isValidSort = validSortFields.includes(sortBy);
  const isValidSortOrder = validSortOrders.includes(sortOrder);

  if (isValidSort && isValidSortOrder) {
    return { isValid: true, sortBy, sortOrder };
  }

  return { isValid: false, sortBy: null, sortOrder: null };
};

export const handleSafeCategories = async (categories: string[]) => {
  return categories.length > 0 &&
    categories.every((category) => categoriesArr.includes(category))
    ? categories
    : [];
};

export const getTotalProductsCount = async (
  categories: string[],
  search: string | null
) => {
  return await prisma.product.count({
    where: {
      AND: [
        categories.length > 0 ? { category: { slug: { in: categories } } } : {},
        search
          ? {
              title: { contains: search },
            }
          : {},
      ],
    },
  });
};

export const getTotalCategoriesCount = async (search: string | null) => {
  const where = search ? { name: { contains: search } } : {};

  return await prisma.category.count({ where });
};

export const getTotalCustomersCount = async (
  search: string | null,
  gender: string | null
) => {
  const where = {
    ...(search ? { name: { contains: search } } : {}),
    ...(gender ? { gender } : {}),
  };

  return await prisma.customer.count({ where });
};
