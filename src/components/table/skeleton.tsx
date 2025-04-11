import { Skeleton } from "../ui";

export const SkeletonTable = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-100 h-8" />

      <Skeleton className="w-full h-200" />
    </div>
  );
};
