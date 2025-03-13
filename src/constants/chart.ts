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
