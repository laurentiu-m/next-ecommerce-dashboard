"use server";

import { SortingState } from "@tanstack/react-table";

import { prisma } from "./prisma";

export const getProductsData = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

export const getSortedProductsData = async (sorting: SortingState) => {
  const orderByArray = sorting.map((option) => ({
    [option.id]: option.desc ? "desc" : "asc",
  }));
  console.log("Order by array:", orderByArray);

  return await prisma.product.findMany({
    orderBy: orderByArray,
    include: {
      category: true,
    },
  });
};
