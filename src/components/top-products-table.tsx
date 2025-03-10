"use server";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { prisma } from "@/lib/prisma";

export const TopProductsTable = async () => {
  const topProducts = await prisma.product.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 5,
    include: {
      category: true,
    },
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="font-medium text-xl">Top Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No.</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product, index) => (
            <TableRow key={product.slug}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-1">
                  <h3>{product.title}</h3>
                  <p className="text-xs text-ring">{product.category.name}</p>
                </div>
              </TableCell>
              <TableCell className="text-center">${product.price}</TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">{product.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
