"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

import { TableComponent, SkeletonTable } from "@/components/table";
import { validSortFields } from "@/constants";
import { useSearchParamsValues, useSearchParamsHandlers } from "@/hooks";
import { format, updateSearchParams } from "@/lib";
import { getProductsData } from "@/lib/table";
import { ProductType } from "@/types";

import { columns } from "./columns";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    selectedCategories?: Set<string>;
    onCategoryChange?: (category: string) => void;
  }
}

export default function ProductsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { currentPage, pageSize, search, selectedCategories, sorting } =
    useSearchParamsValues(searchParams);

  const {
    onSortingChange,
    onCategoryChange,
    onCurrentPageChange,
    onPageSizeChange,
    onSearchChange,
  } = useSearchParamsHandlers({ searchParams, selectedCategories, sorting });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { sortBy, sortOrder } = format.sorting(sorting);
      const categories = Array.from(selectedCategories);

      const result = await getProductsData({
        sortBy,
        sortOrder,
        categories,
        currentPage,
        pageSize,
        search,
      });

      const { shouldUpdate, params } = updateSearchParams({
        isValidSorting: result.isValidSorting,
        safeCategories: result.safeCategories,
        selectedCategories,
        newCurrentPage: result.currentPage,
        currentPage,
        newPageSize: result.pageSize,
        pageSize,
        search,
        searchParams,
        validSortFields: validSortFields.products,
      });

      if (shouldUpdate) {
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        setData(result.products);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    sorting,
    selectedCategories,
    currentPage,
    pageSize,
    router,
    searchParams,
    search,
  ]);

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

  if (isLoading) return <SkeletonTable />;

  return (
    <TableComponent
      table={table}
      currentPage={currentPage}
      pageSize={pageSize}
      totalPages={totalPages}
      onCurrentPageChange={onCurrentPageChange}
      onPageSizeChange={onPageSizeChange}
      search={search}
      onSearchChange={onSearchChange}
    />
  );
}
