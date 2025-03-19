"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { TableComponent } from "@/components/table";
import {
  getSelectedCategories,
  getSorting,
  handleCategoryChange,
  handleSortingChange,
} from "@/lib";
import { getProductsData } from "@/lib/table";
import { ProductType } from "@/types";

import { columns } from "./columns";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    selectedCategories: Set<string>;
    onCategoryChange: (category: string) => void;
  }
}

export default function ProductsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sorting = useMemo(() => getSorting(searchParams), [searchParams]);
  const selectedCategories = useMemo(
    () => getSelectedCategories(searchParams),
    [searchParams]
  );

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const updatedParams = handleSortingChange(searchParams, sorting, updater);
    router.replace(`?${updatedParams.toString()}`, { scroll: false });
  };

  const onCategoryChange = (category: string) => {
    const updatedParams = handleCategoryChange(
      searchParams,
      selectedCategories,
      category
    );
    router.replace(`?${updatedParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const sortBy = sorting[0]?.id ?? "";
      const sortOrder = sorting[0]?.desc ? "desc" : "asc";
      const categories = Array.from(selectedCategories);

      const fetchedData = await getProductsData(sortBy, sortOrder, categories);
      setData(fetchedData);

      setIsLoading(false);
    };

    fetchData();
  }, [sorting, selectedCategories]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    enableMultiSort: false,
    meta: {
      selectedCategories,
      onCategoryChange,
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return <TableComponent table={table} />;
}
