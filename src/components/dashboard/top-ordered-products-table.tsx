"use server";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

import { ImageComponent } from "../image-component";

import { DashboardCard } from "./dashboard-card";

export const TopOrderedProductsTable = async () => {
  const topOrderItems = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  const topProducts = (
    await Promise.all(
      topOrderItems.map(async (item) => {
        const product = await prisma.product.findUniqueOrThrow({
          where: {
            id: item.productId,
          },
          include: {
            category: true,
          },
        });

        return {
          ...product,
          totalQuantity: item._sum.quantity,
        };
      })
    )
  ).flat();

  return (
    <DashboardCard
      title="Top Ordered Products"
      description="Most purchased items by customers."
      className="h-[550px] w-full"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No.</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product, index) => (
            <TableRow key={product.slug}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <ImageComponent
                  src={product.thumbnail}
                  title={product.title}
                  width="50px"
                  height="50px"
                />
                <div className="flex flex-col gap-1">
                  <h3>{product.title}</h3>
                  <p className="text-xs text-ring">{product.category.name}</p>
                </div>
              </TableCell>
              <TableCell className="text-center">${product.price}</TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">
                {product.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
};
