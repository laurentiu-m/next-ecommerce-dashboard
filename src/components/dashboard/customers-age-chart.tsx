"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCustomersAgeCount } from "@/lib/chart";
import { CustomerAgeDataType } from "@/types/chart";
import { DashboardCard } from "./dashboard-card";
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
      const data = await getCustomersAgeCount();
      setChartData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <SkeletonCustomerBarChart />;

  return (
    <DashboardCard
      title="Customer Age Analysis"
      description="An overview of customer counts categorized by age."
      className="w-full h-[500px]"
    >
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
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
    </DashboardCard>
  );
};
