"use server";

import { DataTable } from "@/components/data-table";
import { prisma } from "@/lib/prisma";
import { columns } from "./columns";

export default async function ProductsPage() {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div className="p-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
