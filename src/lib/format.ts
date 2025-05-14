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

  fullDate: (date: Date) => {
    return date.toLocaleString("default", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  },

  sorting: (
    sorting: {
      id: string;
      desc: boolean;
    }[]
  ) => {
    return {
      sortBy: sorting[0]?.id ?? "",
      sortOrder: sorting.length === 0 ? "" : sorting[0]?.desc ? "desc" : "asc",
    };
  },

  fullName: (firstName: string, lastName: string) => {
    return [firstName, lastName].filter(Boolean).join(" ");
  },
};
