import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const LatestOrdersTable = async () => {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <Card className="flex flex-col gap-3 p-3 h-[480px]">
      <CardHeader className="border-b py-5">
        <CardTitle className="text-xl">Latest Orders</CardTitle>
        <CardDescription>Latest orders made by customers.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-full p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-center">Order Date</TableHead>
              <TableHead className="text-center">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="py-4">
                  {order.customer.firstName} {order.customer.lastName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-1 items-center">
                        <p className="cursor-pointer hover:text-primary/60 hover:underline">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-ring">({item.quantity})</p>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {format.fullDate(order.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  ${format.number(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
