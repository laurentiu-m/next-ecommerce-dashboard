"use server";

import { prisma } from "./prisma";

export const getSortedProducts = async ({
  orderBy
  page,
  pageSize = 10,
}) => {
  return prisma.product.findMany({
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {category: true}
  });
};
