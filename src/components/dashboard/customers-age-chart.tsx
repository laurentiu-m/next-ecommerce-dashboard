"use client";

import { useEffect, useState } from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { customersAgeChartConfig } from "@/constants";
import { getCustomersAgeCount } from "@/lib/charts";
import { CustomerAgeDataType } from "@/types";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui";

import { DashboardCard } from "./dashboard-card";
import { SkeletonCustomerBarChart } from "./skeletons";

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
      <ChartContainer
        config={customersAgeChartConfig}
        className="h-[350px] w-full"
      >
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
