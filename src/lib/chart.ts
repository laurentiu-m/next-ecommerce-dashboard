"use server";

import { years } from "@/constants/chart";
import { prisma } from "./prisma";

type YearKey = keyof typeof years;

export const getSalesData = async (timeRange: YearKey) => {
  const year = years[timeRange];

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: year.start,
        lte: year.end,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      createdAt: true,
      total: true,
    },
  });

  return orders;
};
