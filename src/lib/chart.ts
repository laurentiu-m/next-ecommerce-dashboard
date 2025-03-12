"use server";

import { years, yearsArr } from "@/constants/chart";
import { prisma } from "./prisma";

type YearKey = keyof typeof years;

export const getSalesData = async (timeRange: YearKey) => {
  const year = years[timeRange];

  return await prisma.order.findMany({
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
};

export const getCustomersCount = async () => {
  const result = await Promise.all(
    yearsArr.map(async (year, index) => {
      const currYear = years[year as YearKey];

      const count = await prisma.customer.count({
        where: {
          createdAt: {
            gte: currYear.start,
            lte: currYear.end,
          },
        },
      });

      return { count, year: year, fill: `var(--chart-${index + 1})` };
    })
  );

  return result;
};
