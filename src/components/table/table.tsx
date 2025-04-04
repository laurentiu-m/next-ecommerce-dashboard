import { flexRender } from "@tanstack/react-table";

import { TableProps } from "@/types/table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

import { SearchComponent } from "./search-component";
import { TablePagination } from "./table-pagination";

export const TableComponent = <TData,>({
  table,
  currentPage,
  pageSize,
  totalPages,
  onCurrentPageChange,
  onPageSizeChange,
  search,
  onSearchChange,
}: TableProps<TData>) => {
  return (
    <div className="flex flex-col gap-5">
      <SearchComponent search={search} onSearchChange={onSearchChange} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
