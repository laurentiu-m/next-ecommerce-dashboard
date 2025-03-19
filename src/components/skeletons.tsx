import { Skeleton } from "./ui";

export const SkeletonThemeSwitch = () => {
  return (
    <div className="w-14 h-7 bg-secondary rounded-xl flex justify-center items-center relative">
      <Skeleton className="absolute left-1 w-5 h-5 rounded-full" />
    </div>
  );
};

export const SkeletonImage = () => {
  return <Skeleton className="w-full h-full" />;
};
