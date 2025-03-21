import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { sortOrders } from "@/constants/table";
import { ProductType } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui";
import { Button } from "../ui/button";

type Props = {
  column: Column<ProductType, unknown>;
  title: string;
  className?: string;
};

export const SortButton = ({ column, title, className }: Props) => {
  const isSorted = column.getIsSorted();

  const getSortValue = () => {
    if (isSorted === "asc") {
      return "asc";
    }

    return isSorted === "desc" ? "desc" : "";
  };

  const handleSortIcon = () => {
    if (isSorted === "asc") {
      return <ArrowDown className="size-4" />;
    }

    return isSorted === "desc" ? (
      <ArrowUp className="size-4" />
    ) : (
      <ArrowUpDown className="size-4" />
    );
  };

  const handleSortOrder = (order: string) => {
    if (!order) return column.clearSorting();

    return order !== "asc"
      ? column.toggleSorting(true)
      : column.toggleSorting(false);
  };

  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
            {handleSortIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={getSortValue()}>
            {sortOrders.map((order) => (
              <DropdownMenuRadioItem
                key={order.value}
                value={order.value}
                onClick={() => handleSortOrder(order.value)}
                className="cursor-pointer"
              >
                {order.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
