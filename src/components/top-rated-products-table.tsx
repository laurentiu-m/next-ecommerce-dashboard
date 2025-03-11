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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const TopRatedProductsTable = async () => {
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
    <Card className="flex flex-1 flex-col gap-3">
      <CardHeader>
        <CardTitle className="font-medium text-xl">
          Top Rated Products
        </CardTitle>
        <CardDescription>Highest-rated products by users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
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
                    <h3 className="w-[220px] truncate overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.title}
                    </h3>
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
      </CardContent>
    </Card>
  );
};
