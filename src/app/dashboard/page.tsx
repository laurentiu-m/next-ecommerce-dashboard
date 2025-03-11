import { SalesDataChart } from "@/components/sales-data-chart";
import { Stats } from "@/components/stats";
import { TopProductsTable } from "@/components/top-products-table";

export default function DashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-7">
        <Stats />
      </div>

      <SalesDataChart />

      <div className="flex items-center justify-between gap-8">
        <TopProductsTable />
      </div>
    </div>
  );
}
