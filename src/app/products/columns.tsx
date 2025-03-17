"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { ImageComponent } from "@/components/image-component";
import { SortButton } from "@/components/sort-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "@/lib/format";
import { CategoryType } from "@/types/category";
import { ProductType } from "@/types/product";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortButton column={column} title="Product" />,
    cell: ({ row }) => {
      const title: string = row.getValue("title");

      const rowData = row.original;
      const thumbnail: string = rowData.thumbnail;

      return (
        <div className="flex gap-2 items-center">
          <ImageComponent
            src={thumbnail}
            title={title}
            width="70px"
            height="70px"
          />
          <p>{title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      const category: CategoryType = row.getValue("category");

      return <div className="text-center">{category.name}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <SortButton column={column} title="Stock" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("stock")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <SortButton column={column} title="Rating" className="text-center" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("rating")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <SortButton column={column} title="Price" className="text-center" />
    ),
    cell: ({ row }) => {
      const priceFormatted = format.number(row.getValue("price"));

      return <div className="text-center font-medium">${priceFormatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => (
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
