import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "../ui";

export const SkeletonSalesDataChart = () => {
  return (
    <div className="w-full h-[500px] rounded-xl p-3 border flex flex-col items-center justify-between">
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
    <Card className="flex w-full flex-col p-8 h-[550px]">
      <CardHeader className="flex gap-1 border-b pb-6 px-0">
        <CardTitle>
          <Skeleton className="w-50 h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-80 h-5" />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex items-center  h-full">
        <Skeleton className="w-full h-full" />
      </CardContent>
    </Card>
  );
};

export const SkeletonCustomerPieChart = () => {
  return (
    <Card className="w-[400px] h-[500px] flex flex-col p-8">
      <div className="flex flex-col gap-1 border-b pb-6 px-0">
        <Skeleton className="w-60 h-5" />
        <Skeleton className="w-50 h-5" />
      </div>
      <Skeleton className="p-0 flex items-center h-full" />
    </Card>
  );
};

export const SkeletonCustomerBarChart = () => {
  return (
    <Card className="h-[500px] flex flex-1 flex-col p-8">
      <div className="flex flex-col gap-1 border-b pb-6 px-0">
        <Skeleton className="w-50 h-5" />
        <Skeleton className="w-80 h-5" />
      </div>

      <Skeleton className="p-0 flex items-center h-full" />
    </Card>
  );
};

export const SkeletonLatestOrder = () => {
  return (
    <Card className="flex flex-col gap-3 p-3 w-full h-[500px]">
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
