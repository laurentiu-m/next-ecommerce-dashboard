export const format = {
  number: (num: number) => {
    return Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  },

  dateShort: (date: Date) => {
    return date.toLocaleString("default", { month: "short", day: "2-digit" });
  },
};
