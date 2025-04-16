"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DropdownMenuAction } from "@/components/table/dropdown-menu-action";
import { SortButton } from "@/components/table/sort-button";
import { SortGenderButton } from "@/components/table/sort-gender-button";
import { CustomerType } from "@/types";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortButton column={column} title="Name" />,
    cell: ({ row }) => <div className="p-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortButton column={column} title="Email" />,
    cell: ({ row }) => <div className="p-3">{row.getValue("email")}</div>,
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
    accessorKey: "age",
    header: ({ column }) => (
      <SortButton column={column} title="Age" className="text-center" />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ table }) => (
      <SortGenderButton
        title="Gender"
        className="text-center"
        selectedGender={table.options?.meta?.selectedGender}
        onGenderChange={table.options?.meta?.onGenderChange}
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("gender")}</div>
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
