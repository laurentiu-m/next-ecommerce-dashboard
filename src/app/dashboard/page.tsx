import { Suspense } from "react";
import { SalesDataChart } from "@/components/sales-data-chart";
import { SkeletonStats } from "@/components/skeletons";
import { Stats } from "@/components/stats";
import { TopProductsTable } from "@/components/top-products-table";

export default function DashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-7">
        <Suspense fallback={<SkeletonStats />}>
          <Stats />
        </Suspense>
      </div>

      <SalesDataChart />

      <div className="flex items-center justify-between gap-8">
        <TopProductsTable />
      </div>
    </div>
  );
}
