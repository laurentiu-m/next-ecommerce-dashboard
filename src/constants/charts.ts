import { ChartConfig } from "@/components/ui";

export const yearsArr = ["2025", "2024"];

export const years = {
  "2024": {
    start: new Date("2024-01-01T00:00:00Z"),
    end: new Date("2024-12-31T23:59:59Z"),
  },
  "2025": {
    start: new Date("2025-01-01T00:00:00Z"),
    end: new Date(),
  },
} as const;

export const customersAgeChartConfig = {
  age: {
    label: "Age",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const customersPieChartConfig = {
  2024: {
    label: "2024",
    color: "var(--chart-1)",
  },
  2025: {
    label: "2025",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const salesDataChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
