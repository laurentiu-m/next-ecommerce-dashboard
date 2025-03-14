import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ProductType } from "@/types/product";
import { Button } from "./ui/button";

type Props = {
  column: Column<ProductType, unknown>;
  title: string;
  className?: string;
};

export const SortButton = ({ column, title, className }: Props) => {
  const isSorted = column.getIsSorted();

  const handleSortIcon = () => {
    if (isSorted === "asc") {
      return <ArrowDown className="ml-2 h-4 w-4" />;
    }

    return isSorted === "desc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className={`${className}`}>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => column.toggleSorting()}
      >
        {title}
        {handleSortIcon()}
      </Button>
    </div>
  );
};
