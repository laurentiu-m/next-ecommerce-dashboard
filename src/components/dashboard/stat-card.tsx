import { JSX } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title: string;
  result: number | string;
  icon: JSX.Element;
};

export const StatCard = ({ title, result, icon }: Props) => {
  return (
    <Card className="w-stat">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <CardDescription className="text-sm">{title}</CardDescription>
          <CardTitle className="text-2xl font-medium w-10">{result}</CardTitle>
        </div>

        <div className="border border-border p-2 rounded-lg">{icon}</div>
      </CardHeader>
    </Card>
  );
};
