import { Suspense } from "react";
import { CustomersAgeChart } from "@/components/customers-age-chart";
import { CustomersPieChart } from "@/components/customers-pie-chart";
import { LatestOrdersTable } from "@/components/latest-orders-table";
import { SalesDataChart } from "@/components/sales-data-chart";
import {
  SkeletonLatestOrder,
  SkeletonStats,
  SkeletonTopProductTable,
} from "@/components/skeletons";
import { Stats } from "@/components/stats";
import { TopOrderedProductsTable } from "@/components/top-ordered-products-table";
import { TopRatedProductsTable } from "@/components/top-rated-products-table";

export default function DashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-7">
        <Suspense fallback={<SkeletonStats />}>
          <Stats />
        </Suspense>
      </div>

      <SalesDataChart />

      <div className="flex items-center justify-between gap-6">
        <Suspense fallback={<SkeletonTopProductTable />}>
          <TopRatedProductsTable />
        </Suspense>
        <Suspense fallback={<SkeletonTopProductTable />}>
          <TopOrderedProductsTable />
        </Suspense>
      </div>

      <Suspense fallback={<SkeletonLatestOrder />}>
        <LatestOrdersTable />
      </Suspense>

      <div className="flex items-center gap-6">
        <CustomersPieChart />
        <CustomersAgeChart />
      </div>
    </div>
  );
}
