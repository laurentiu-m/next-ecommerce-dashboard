"use client";

import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCustomersCount } from "@/lib/chart";
import { CustomerCountType } from "@/types/chart";
import { SkeletonCustomerPieChart } from "./skeletons";

const chartConfig = {
  2024: {
    label: "2024",
    color: "var(--chart-1)",
  },
  2025: {
    label: "2025",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const CustomersPieChart = () => {
  const [chartData, setChartData] = useState<CustomerCountType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getCustomersCount();
      setChartData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <SkeletonCustomerPieChart />;

  const totalCustomers = chartData?.reduce((acc, val) => acc + val.count, 0);

  return (
    <Card className="flex flex-col w-[400px] h-[500px]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">Customer Registration by Year</CardTitle>
        <CardDescription>Comparison of customer registrations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="year"
              innerRadius={105}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {totalCustomers?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Customers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
