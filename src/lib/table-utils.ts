"use server";

import {
  categoriesArr,
  rows,
  validSortFieldsProducts,
  validSortOrders,
} from "@/constants";

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

export const handleSafeSorting = async (sortBy: string, sortOrder: string) => {
  if (!sortBy || !sortOrder)
    return { isValid: true, sortBy: null, sortOrder: null };

  const isValidSort = validSortFieldsProducts.includes(sortBy);
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
  const total = await prisma.product.count({
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

  return total;
};

export const getTotalCategoriesCount = async (search: string | null) => {
  const where = search ? { name: { contains: search } } : {};

  const total = await prisma.category.count({ where });

  return total;
};
