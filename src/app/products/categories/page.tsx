"use server";

import { SkeletonTable } from "@/components/table/skeleton";

export default async function CategoriesPage() {
  return (
    <div className="p-8">
      <SkeletonTable />
    </div>
  );
}
