"use server";

import { OnChangeFn, SortingState } from "@tanstack/react-table";

import { validSortFieldsProducts } from "@/constants/table";

import { prisma } from "./prisma";

export const getProductsData = async (
  sortBy: string,
  sortOrder: boolean,
  categories
) => {
  const isValid = validSortFieldsProducts.includes(sortBy);

  const products = await prisma.product.findMany({
    orderBy: isValid
      ? {
          [sortBy]: sortOrder ? "desc" : "asc",
        }
      : undefined,
    where:
      categories.length > 0 ? { category: { slug: { in: categories } } } : {},
    include: {
      category: true,
    },
  });

  return products;
};

export const getAllProductsCategories = async () => {
  return await prisma.category.findMany();
};
