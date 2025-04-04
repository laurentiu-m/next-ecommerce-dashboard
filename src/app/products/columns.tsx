"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ImageComponent } from "@/components";
import { DropdownMenuTable } from "@/components/table";
import { DropdownMenuAction } from "@/components/table/dropdown-menu-action";
import { SortButton } from "@/components/table/sort-button";
import { format } from "@/lib";
import { CategoryType, ProductType } from "@/types";

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
    header: ({ table }) => (
      <DropdownMenuTable
        title="Category"
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
    cell: () => <DropdownMenuAction />,
  },
];
