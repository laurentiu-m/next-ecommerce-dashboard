"use client";

import { useEffect, useState } from "react";

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { TableComponent } from "@/components/table";
import { getProductsData, getSortedProductsData } from "@/lib/table";
import { ProductType } from "@/types/product";

import { columns } from "./columns";

export default function ProductsTable() {
  const [data, setData] = useState<ProductType[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const fetchedData = sorting.length
        ? await getSortedProductsData(sorting)
        : await getProductsData();
      setData(fetchedData);
      setIsLoading(false);
    };

    getData();
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    enableMultiSort: true,
    manualSorting: true,
    isMultiSortEvent: () => true,
  });
  if (isLoading) return <div>Loading...</div>;

  return <TableComponent table={table} />;
}
