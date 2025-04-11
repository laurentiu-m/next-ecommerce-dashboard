"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DropdownMenuTable } from "@/components/table";
import { DropdownMenuAction } from "@/components/table/dropdown-menu-action";
import { SortButton } from "@/components/table/sort-button";
import { CategoryType, CustomerType } from "@/types";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <SortButton column={column} title="First Name" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <SortButton column={column} title="Last Name" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <SortButton column={column} title="Age" className="text-center" />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ table }) => (
      <DropdownMenuTable
        title="Gender"
        className="text-center"
        selectedCategories={table.options.meta?.selectedCategories}
        onCategoryChange={table.options.meta?.onCategoryChange}
      />
    ),
    cell: ({ row }) => {
      const category: CategoryType = row.getValue("category");

      return <div className="text-center">{category.name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortButton column={column} title="Email" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <SortButton column={column} title="Username" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">Phone</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("phone")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => <DropdownMenuAction />,
  },
];
