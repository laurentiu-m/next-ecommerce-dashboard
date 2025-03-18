import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { sortOrders } from "@/constants/table";
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
        <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
            {handleSortIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 z-20 bg-background border border-border rounded-md overflow-hidden">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup className="text-center hover:ring-0">
            {sortOrders.map((order) => (
              <DropdownMenuRadioItem
                key={order.value}
                value={order.value}
                onClick={() => handleSortOrder(order.value)}
                className="cursor-pointer p-2 outline-0 hover:bg-border hover:text-primary"
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
