"use client";

import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import {
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { SkeletonTable, TableComponent } from "@/components/table";
import {
  getCurrentPage,
  getPageSize,
  getSearch,
  getSelectedCategories,
  getSorting,
  handleCategoryChange,
  handleCurrentPageChange,
  handlePageSizeChange,
  handleSearchChange,
  handleSortingChange,
} from "@/lib";
import { ProductType } from "@/types";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    selectedCategories: Set<string>;
    onCategoryChange: (category: string) => void;
  }
}

export default function CategoriesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const sorting = useMemo(() => getSorting(searchParams), [searchParams]);
  const selectedCategories = useMemo(
    () => getSelectedCategories(searchParams),
    [searchParams]
  );
  const currentPage = useMemo(
    () => getCurrentPage(searchParams),
    [searchParams]
  );
  const pageSize = useMemo(() => getPageSize(searchParams), [searchParams]);
  const search = useMemo(() => getSearch(searchParams), [searchParams]);

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

  const onCurrentPageChange = (page: number) => {
    const updatedParams = handleCurrentPageChange(page, searchParams);
    router.replace(`?${updatedParams.toString()}`, { scroll: false });
  };

  const onPageSizeChange = (pageSize: number) => {
    const updatedParams = handlePageSizeChange(pageSize, searchParams);
    router.replace(`?${updatedParams.toString()}`, { scroll: false });
  };

  const onSearchChange = (search: string) => {
    const updatedParams = handleSearchChange(search, searchParams);
    router.replace(`?${updatedParams.toString()}`, { scroll: false });
  };

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
