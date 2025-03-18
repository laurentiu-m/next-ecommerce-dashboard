"use server";

import { validSortFieldsProducts } from "@/constants/table";

import { prisma } from "./prisma";

export const getProductsData = async (sortBy: string, sortOrder: boolean) => {
  const isValid = validSortFieldsProducts.includes(sortBy);

  const products = await prisma.product.findMany({
    orderBy: isValid
      ? {
          [sortBy]: sortOrder ? "desc" : "asc",
        }
      : undefined,
    include: {
      category: true,
    },
  });

  return products;
};
