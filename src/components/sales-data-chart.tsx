"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years, yearsArr } from "@/constants/chart";
import { getSalesData } from "@/lib/chart";
import { format } from "@/lib/format";
import { SalesDataType } from "@/types/chart";
import { SkeletonSalesDataChart } from "./skeletons";

type YearKey = keyof typeof years;

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SalesDataChart() {
  const [timeRange, setTimeRange] = useState(yearsArr[0]);
  const [orders, setOrders] = useState<SalesDataType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      const data = await getSalesData(timeRange as YearKey);
      setOrders(data);
    };
    getData();
  }, [timeRange]);

  if (isLoading) return <SkeletonSalesDataChart />;

  const chartData = orders.map((order) => ({
    date: format.dateShort(order.createdAt),
    revenue: order.total,
  }));

  return (
    <Card className="p-3 w-full h-sales-chart flex flex-col justify-center">
      <CardHeader className="flex items-center gap-1 space-y-0 border-b py-5 flex-row">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle className="text-xl">Sales Overview</CardTitle>
          <CardDescription>
            A detailed breakdown of total revenue for the year {timeRange}.
          </CardDescription>
        </div>
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
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
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
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
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
      </CardContent>
    </Card>
  );
}
