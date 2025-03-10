"use server";

import { UsersIcon, PackageIcon, CoinsIcon, PiggyBankIcon } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import { prisma } from "@/lib/prisma";
import { StatCard } from "./stat-card";

export const Stats = async () => {
  const totalCustomers = formatNumber(await prisma.customer.count());
  const totalProducts = formatNumber(await prisma.product.count());

  const revenue =
    (
      await prisma.order.aggregate({
        _sum: { total: true },
      })
    )._sum.total ?? 0;
  const totalRevenue = formatNumber(revenue);

  const productsSold =
    (
      await prisma.orderItem.aggregate({
        _sum: { quantity: true },
      })
    )._sum.quantity ?? 0;
  const totalProductsSold = formatNumber(productsSold);

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
