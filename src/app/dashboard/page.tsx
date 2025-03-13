import { Suspense } from "react";
import {
  CustomersAgeChart,
  CustomersPieChart,
  LatestOrdersTable,
  SalesDataChart,
  SkeletonLatestOrder,
  SkeletonStats,
  SkeletonTopProductTable,
  Stats,
  TopOrderedProductsTable,
  TopRatedProductsTable,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-7">
        <Suspense fallback={<SkeletonStats />}>
          <Stats />
        </Suspense>
      </div>

      <SalesDataChart />

      <div className="flex flex-col gap-6 3xl:flex-row">
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
