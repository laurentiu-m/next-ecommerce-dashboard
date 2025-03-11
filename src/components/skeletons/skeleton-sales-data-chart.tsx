import { Skeleton } from "../ui/skeleton";

export const SkeletonSalesDataChart = () => {
  return (
    <div className="w-full h-sales-chart rounded-xl p-3 border flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-between border-b px-8 py-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-50 h-5" />
          <Skeleton className="w-100 h-5" />
        </div>
        <Skeleton className="w-25 h-8" />
      </div>

      <div className="w-full h-full px-6 py-12">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};
