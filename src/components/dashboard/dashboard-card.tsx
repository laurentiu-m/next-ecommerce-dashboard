import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
  className: string;
};

export const DashboardCard = ({
  title,
  description,
  action,
  children,
  className,
}: Props) => {
  return (
    <Card className={`flex flex-col p-8 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-1 border-b pb-6 px-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-0 flex items-center h-full">
        {children}
      </CardContent>
    </Card>
  );
};
