"use server";

import {
  rows,
  validSortFieldsProducts,
  validSortOrders,
} from "@/constants/table";

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
  const isValidSort = validSortFieldsProducts.includes(sortBy);
  const isValidSortOrder = validSortOrders.includes(sortOrder);

  return isValidSort && isValidSortOrder;
};

export const getTotalProductsCount = async (categories?: string[]) => {
  const total = await prisma.product.count({
    where:
      categories && categories.length > 0
        ? { category: { slug: { in: categories } } }
        : {},
  });

  return total;
};

export const getProductsData = async (
  sortBy: string,
  sortOrder: "asc" | "desc",
  categories: string[],
  currentPage: number,
  pageSize: number
) => {
  const totalCount = await getTotalProductsCount(categories);
  const totalPages = Math.ceil(totalCount / pageSize);

  const { safeCurrentPage, safePageSize } = await handleSafePage(
    pageSize,
    currentPage,
    totalPages
  );

  const isValidSorting = await handleSafeSorting(sortBy, sortOrder);

  const skip = (safeCurrentPage - 1) * safePageSize;

  const products = await prisma.product.findMany({
    orderBy: isValidSorting ? { [sortBy]: sortOrder } : undefined,
    where:
      categories.length > 0 ? { category: { slug: { in: categories } } } : {},
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
    isValidSorting,
  };
};
