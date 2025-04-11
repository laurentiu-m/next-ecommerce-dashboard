"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DropdownMenuAction } from "@/components/table/dropdown-menu-action";
import { SortButton } from "@/components/table/sort-button";
import { CategoryType } from "@/types";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortButton column={column} title="Name" />,
    cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => <DropdownMenuAction />,
  },
];
