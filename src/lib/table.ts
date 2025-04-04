"use server";

import { categoriesArr } from "@/constants";
import {
  rows,
  validSortFieldsProducts,
  validSortOrders,
} from "@/constants/table";
import { getProductsTableProps } from "@/types/table";

import { prisma } from "./prisma/prisma";

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

export const getTotalProductsCount = async (categories: string[]) => {
  const total = await prisma.product.count({
    where:
      categories.length > 0 ? { category: { slug: { in: categories } } } : {},
  });

  return total;
};

export const getProductsData = async ({
  sortBy,
  sortOrder,
  categories,
  currentPage,
  pageSize,
  search,
}: getProductsTableProps) => {
  const safeCategories = await handleSafeCategories(categories);

  const totalCount = await getTotalProductsCount(safeCategories);
  const totalPages = Math.ceil(totalCount / pageSize);

  const { safeCurrentPage, safePageSize } = await handleSafePage(
    pageSize,
    currentPage,
    totalPages
  );

  const skip = (safeCurrentPage - 1) * safePageSize;

  const {
    isValid,
    sortBy: safeSortBy,
    sortOrder: safeSortOrder,
  } = await handleSafeSorting(sortBy, sortOrder);

  const orderBy =
    isValid && safeSortBy && safeSortOrder
      ? { [safeSortBy]: safeSortOrder }
      : undefined;

  const products = await prisma.product.findMany({
    orderBy,
    where: {
      AND: [
        safeCategories.length > 0
          ? { category: { slug: { in: safeCategories } } }
          : {},
        search
          ? {
              title: { contains: search },
            }
          : {},
      ],
    },
    include: {
      category: true,
    },
    skip,
    take: safePageSize,
  });

  return {
    products,
    totalPages,
    currentPage: safeCurrentPage,
    pageSize: safePageSize,
    isValidSorting: isValid,
    safeCategories,
  };
};
