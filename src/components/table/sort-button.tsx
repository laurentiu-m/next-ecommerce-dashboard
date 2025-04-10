import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Order, sortOrders } from "@/constants/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui";
import { Button } from "../ui/button";

type Props<TData = unknown> = {
  column: Column<TData, unknown>;
  title: string;
  className?: string;
};

export const SortButton = <TData,>({
  column,
  title,
  className,
}: Props<TData>) => {
  const isSorted = column.getIsSorted();

  const handleSortIcon = () => {
    if (isSorted === Order.ASC) {
      return <ArrowUp className="size-4" />;
    }

    return isSorted === Order.DESC ? (
      <ArrowDown className="size-4" />
    ) : (
      <ArrowUpDown className="size-4" />
    );
  };

  const handleSortOrder = (order: string) => {
    if (!order) return column.clearSorting();

    return order !== Order.ASC
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
          <DropdownMenuRadioGroup value={!isSorted ? "" : isSorted}>
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
