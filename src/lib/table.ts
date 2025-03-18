"use server";

import { validSortFieldsProducts } from "@/constants/table";

import { prisma } from "./prisma";

export const getProductsData = async (
  sortBy: string,
  sortOrder: boolean,
  selectedCategories
) => {
  const isValid = validSortFieldsProducts.includes(sortBy);

  console.log(selectedCategories);

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

export const getAllProductsCategories = async () => {
  return await prisma.category.findMany();
};
