"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { salesDataChartConfig, years, yearsArr } from "@/constants";
import { format } from "@/lib";
import { getSalesData } from "@/lib/charts";
import { SalesDataType } from "@/types";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui";

import { DashboardCard } from "./dashboard-card";
import { SkeletonSalesDataChart } from "./skeletons";

type YearKey = keyof typeof years;

export function SalesDataChart() {
  const [timeRange, setTimeRange] = useState(yearsArr[0]);
  const [chartData, setChartData] = useState<SalesDataType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getSalesData(timeRange as YearKey);
      setChartData(data);
      setIsLoading(false);
    };
    getData();
  }, [timeRange]);

  if (isLoading) return <SkeletonSalesDataChart />;

  return (
    <DashboardCard
      title="Sales Overview"
      description={`A detailed breakdown of total revenue for the year ${timeRange}.`}
      className="h-[500px]"
      action={
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[100px] rounded-lg ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {yearsArr.map((year) => (
              <SelectItem key={year} value={year} className="rounded-lg">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <ChartContainer
        config={salesDataChartConfig}
        className="h-[350px] w-full"
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
          />
          <ChartTooltip
            cursor
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex min-w-[100px] gap-1 items-center text-xs text-muted-foreground">
                    <div className="bg-chart-1 w-2 h-2 rounded-xs" />
                    {salesDataChartConfig[
                      name as keyof typeof salesDataChartConfig
                    ]?.label || name}
                    :
                    <div className="ml-auto flex items-baseline font-mono font-medium tabular-nums text-foreground">
                      ${format.number(value as number)}
                    </div>
                  </div>
                )}
              />
            }
          />
          <Area
            dataKey="revenue"
            type="monotone"
            fill="var(--chart-1)"
            stroke="var(--chart-1)"
          />
        </AreaChart>
      </ChartContainer>
    </DashboardCard>
  );
}
