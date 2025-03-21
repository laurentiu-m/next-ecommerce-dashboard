import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "../ui";

type Props = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onCurrentPageChange: (page: number) => void;
};

export const TablePagination = ({
  currentPage,
  pageSize,
  totalPages,
  onCurrentPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-2 py-4">
      <p className="text-sm text-primary/40">
        Showing {currentPage}-{pageSize} of {totalPages}
      </p>
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
  );
};
