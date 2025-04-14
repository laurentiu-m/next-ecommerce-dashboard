"use server";

import { validSortFields } from "@/constants";
import {
  CategoriesTableProps,
  CustomersTableProps,
  ProductsTableProps,
} from "@/types";

import { prisma } from "./prisma/prisma";
import {
  getTotalCategoriesCount,
  getTotalCustomersCount,
  getTotalProductsCount,
  handleSafeCategories,
  handleSafePage,
  handleSafeSorting,
} from "./table-utils";

export const getProductsData = async ({
  sortBy,
  sortOrder,
  categories,
  currentPage,
  pageSize,
  search,
}: ProductsTableProps) => {
  const safeCategories = await handleSafeCategories(categories);

  const totalCount = await getTotalProductsCount(safeCategories, search);
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
  } = await handleSafeSorting(sortBy, sortOrder, validSortFields.products);

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

export const getCategoriesData = async ({
  sortBy,
  sortOrder,
  currentPage,
  pageSize,
  search,
}: CategoriesTableProps) => {
  const totalCount = await getTotalCategoriesCount(search);
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
  } = await handleSafeSorting(sortBy, sortOrder, validSortFields.categories);

  const orderBy =
    isValid && safeSortBy && safeSortOrder
      ? { [safeSortBy]: safeSortOrder }
      : undefined;

  const categories = await prisma.category.findMany({
    orderBy,
    where: search ? { name: { contains: search } } : {},
    skip,
    take: safePageSize,
  });

  return {
    categories,
    totalPages,
    currentPage: safeCurrentPage,
    pageSize: safePageSize,
    isValidSorting: isValid,
  };
};

export const getCustomersData = async ({
  sortBy,
  sortOrder,
  currentPage,
  pageSize,
  search,
}: CustomersTableProps) => {
  const totalCount = await getTotalCustomersCount(search);
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
  } = await handleSafeSorting(sortBy, sortOrder, validSortFields.customers);

  const orderBy =
    isValid && safeSortBy && safeSortOrder
      ? { [safeSortBy]: safeSortOrder }
      : undefined;

  const customers = await prisma.customer.findMany({
    orderBy,
    where: search ? { name: { contains: search } } : {},
    skip,
    take: safePageSize,
  });

  return {
    customers,
    totalPages,
    currentPage: safeCurrentPage,
    pageSize: safePageSize,
    isValidSorting: isValid,
  };
};
