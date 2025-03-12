"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCustomersAgeCount } from "@/lib/chart";
import { CustomerAgeDataType } from "@/types/chart";
import { SkeletonCustomerBarChart } from "./skeletons";

const chartConfig = {
  age: {
    label: "Age",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const CustomersAgeChart = () => {
  const [chartData, setChartData] = useState<CustomerAgeDataType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getCustomersAgeCount();
      setChartData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <SkeletonCustomerBarChart />;

  return (
    <Card className="flex flex-col flex-1 h-[500px]">
      <CardHeader>
        <CardTitle className="text-xl">Customer Age Analysis</CardTitle>
        <CardDescription>
          An overview of customer counts categorized by age.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-[250px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="age"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--chart-1)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
