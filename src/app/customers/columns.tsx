"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DropdownMenuAction } from "@/components/table/dropdown-menu-action";
import { SortButton } from "@/components/table/sort-button";
import { CustomerType } from "@/types";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortButton column={column} title="Name" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
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
    header: ({ column }) => (
      <SortButton column={column} title="Gender" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("gender")}</div>
    ),
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
