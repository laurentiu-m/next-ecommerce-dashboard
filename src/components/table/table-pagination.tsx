import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { rows } from "@/constants";
import { TablePaginationProps } from "@/types";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui";

export const TablePagination = ({
  currentPage,
  pageSize,
  totalPages,
  onCurrentPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-sm text-primary/40">
        Showing {currentPage}-{pageSize} of {totalPages}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-primary/50">Rows per page:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-10">
              <Button variant="outline" className="cursor-pointer">
                {pageSize}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {rows.map((row) => (
                <DropdownMenuCheckboxItem
                  key={row}
                  checked={row === pageSize}
                  className="cursor-pointer"
                  onClick={() => onPageSizeChange(row)}
                >
                  {row}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={() => onCurrentPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={() => onCurrentPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
