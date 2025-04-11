"use client";

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { SkeletonTable, TableComponent } from "@/components/table";
import { validSortFieldsCategories } from "@/constants";
import { useSearchParamsHandlers, useSearchParamsValues } from "@/hooks";
import { format, getCategoriesData, updateSearchParams } from "@/lib";
import { CategoryType } from "@/types";

import { columns } from "./columns";

export default function CategoriesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<CategoryType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { currentPage, pageSize, search, sorting } =
    useSearchParamsValues(searchParams);

  const {
    onCurrentPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortingChange,
  } = useSearchParamsHandlers({ searchParams, sorting });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { sortBy, sortOrder } = format.sorting(sorting);

      const result = await getCategoriesData({
        sortBy,
        sortOrder,
        currentPage,
        pageSize,
        search,
      });

      const { shouldUpdate, params } = updateSearchParams({
        isValidSorting: result.isValidSorting,
        newCurrentPage: result.currentPage,
        currentPage,
        newPageSize: result.pageSize,
        pageSize,
        search,
        searchParams,
        validSortFields: validSortFieldsCategories,
      });

      if (shouldUpdate) {
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        setData(result.categories);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sorting, currentPage, pageSize, router, searchParams, search]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    enableMultiSort: false,
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
