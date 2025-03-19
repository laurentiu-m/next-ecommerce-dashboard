"use server";

import { validSortFieldsProducts } from "@/constants/table";

import { prisma } from "./prisma/prisma";

export const getProductsData = async (
  sortBy: string,
  sortOrder: "asc" | "desc",
  categories: string[]
) => {
  const isValid = validSortFieldsProducts.includes(sortBy);

  const products = await prisma.product.findMany({
    orderBy: isValid ? { [sortBy]: sortOrder } : undefined,
    where:
      categories.length > 0 ? { category: { slug: { in: categories } } } : {},
    include: {
      category: true,
    },
  });

  return products;
};
