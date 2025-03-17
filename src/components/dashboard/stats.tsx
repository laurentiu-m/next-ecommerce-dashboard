"use server";

import { UsersIcon, PackageIcon, CoinsIcon, PiggyBankIcon } from "lucide-react";

import { format } from "@/lib/format";
import { prisma } from "@/lib/prisma";

import { StatCard } from "./stat-card";

export const Stats = async () => {
  const totalCustomers = format.number(await prisma.customer.count());
  const totalProducts = format.number(await prisma.product.count());

  const revenue =
    (
      await prisma.order.aggregate({
        _sum: { total: true },
      })
    )._sum.total ?? 0;
  const totalRevenue = format.number(revenue);

  const productsSold =
    (
      await prisma.orderItem.aggregate({
        _sum: { quantity: true },
      })
    )._sum.quantity ?? 0;
  const totalProductsSold = format.number(productsSold);

  const items = [
    {
      title: "Total Customer",
      result: totalCustomers,
      icon: <UsersIcon className="size-5" />,
    },
    {
      title: "Total Product",
      result: totalProducts,
      icon: <PackageIcon className="size-5" />,
    },
    {
      title: "Revenue",
      result: `$${totalRevenue}`,
      icon: <PiggyBankIcon className="size-5" />,
    },
    {
      title: "Product Sold",
      result: totalProductsSold,
      icon: <CoinsIcon className="size-5" />,
    },
  ];

  return items.map((item) => (
    <StatCard
      key={item.title}
      title={item.title}
      result={item.result}
      icon={item.icon}
    />
  ));
};
