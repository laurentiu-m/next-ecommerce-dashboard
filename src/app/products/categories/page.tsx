"use server";

import CategoriesTable from "./table";

export default async function CategoriesPage() {
  return (
    <div className="p-8">
      <CategoriesTable />
    </div>
  );
}
