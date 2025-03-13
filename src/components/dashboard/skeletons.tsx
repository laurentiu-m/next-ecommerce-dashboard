import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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

export const SkeletonStatCard = () => {
  return (
    <Card className="h-[105px] w-stat p-6 flex justify-center">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-8 h-8" />
      </div>
    </Card>
  );
};

export const SkeletonStats = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonStatCard key={index + 1} />
      ))}
    </>
  );
};

export const SkeletonTopProductTable = () => {
  return (
    <Card className="flex flex-1 flex-col gap-5 h-top-products-h">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-50 h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-80 h-5" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full h-full">
        <Skeleton className="w-full h-full" />
      </CardContent>
    </Card>
  );
};

export const SkeletonCustomerPieChart = () => {
  return (
    <Card className="w-[400px] h-[500px] flex flex-col items-center justify-center px-7">
      <div className="flex flex-col gap-3 items-center">
        <Skeleton className="w-60 h-5" />
        <Skeleton className="w-50 h-5" />
      </div>
      <Skeleton className="w-full h-full" />
    </Card>
  );
};

export const SkeletonCustomerBarChart = () => {
  return (
    <Card className="h-[500px] flex flex-1 flex-col px-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-50 h-5" />
        <Skeleton className="w-80 h-5" />
      </div>

      <Skeleton className="w-full h-full" />
    </Card>
  );
};

export const SkeletonLatestOrder = () => {
  return (
    <Card className="flex flex-col gap-3 p-3 w-full h-[480px]">
      <div className="flex flex-col gap-2 border-b px-8 py-5">
        <Skeleton className="w-50 h-5" />
        <Skeleton className="w-70 h-5" />
      </div>

      <div className="w-full h-full p-6">
        <Skeleton className="w-full h-full" />
      </div>
    </Card>
  );
};
