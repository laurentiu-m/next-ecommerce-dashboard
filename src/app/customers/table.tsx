"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { SkeletonTable, TableComponent } from "@/components/table";
import { useSearchParamsHandlers, useSearchParamsValues } from "@/hooks";
import { format, getProductsData, updateSearchParams } from "@/lib";
import { CustomerType } from "@/types";

import { columns } from "./columns";

export default function CustomersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<CustomerType[]>([]);
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
        validSortFields: validSortFieldsProducts,
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
