"use server";

import { validSortFieldsProducts } from "@/constants/table";

import { prisma } from "./prisma/prisma";

export const getProductsData = async (
  sortBy: string,
  sortOrder: "asc" | "desc",
  categories: string[],
  currentPage: number,
  pageSize: number
) => {
  const isValid = validSortFieldsProducts.includes(sortBy);

  const skip = (currentPage - 1) * pageSize;

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      orderBy: isValid ? { [sortBy]: sortOrder } : undefined,
      where:
        categories.length > 0 ? { category: { slug: { in: categories } } } : {},
      include: {
        category: true,
      },
      skip,
      take: pageSize,
    }),
    prisma.product.count({
      orderBy: isValid ? { [sortBy]: sortOrder } : undefined,
      where:
        categories.length > 0 ? { category: { slug: { in: categories } } } : {},
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return { products, totalPages };
};
