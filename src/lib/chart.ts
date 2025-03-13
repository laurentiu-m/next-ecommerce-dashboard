"use server";

import { years, yearsArr } from "@/constants/chart";
import { format } from "./format";
import { prisma } from "./prisma";

type YearKey = keyof typeof years;

export const getSalesData = async (timeRange: YearKey) => {
  const year = years[timeRange];

  const data = await prisma.order.findMany({
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

  const result = data.map((order) => ({
    date: format.dateShort(order.createdAt),
    revenue: order.total,
  }));

  return result;
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

export const getCustomersAgeCount = async () => {
  const customerAgeCount = new Map<number, number>();

  const customers = await prisma.customer.findMany({
    orderBy: {
      age: "asc",
    },
  });

  for (const customer of customers) {
    customerAgeCount.set(
      customer.age,
      (customerAgeCount.get(customer.age) ?? 0) + 1
    );
  }

  const result = [];

  for (const [key, value] of customerAgeCount) {
    result.push({ age: String(key), count: value });
  }

  return result;
};
