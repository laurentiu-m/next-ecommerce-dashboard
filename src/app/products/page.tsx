"use server";

import ProductsTable from "./table";

export default async function ProductsPage() {
  return (
    <div className="p-8">
      <ProductsTable />
    </div>
  );
}
