"use client";

import { useEffect, useMemo, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { SkeletonTable, TableComponent } from "@/components/table";
import { validSortFieldsCategories } from "@/constants";
import {
  getCategoriesData,
  getCurrentPage,
  getPageSize,
  getSearch,
  getSorting,
  handleCurrentPageChange,
  handlePageSizeChange,
  handleSearchChange,
  handleSortingChange,
  updateSearchParams,
} from "@/lib";
import { CategoryType } from "@/types";

import { columns } from "./columns";

export default function CategoriesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<CategoryType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const sorting = useMemo(() => getSorting(searchParams), [searchParams]);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const sortBy = sorting[0]?.id ?? "";
      const sortOrder =
        sorting.length === 0 ? "" : sorting[0]?.desc ? "desc" : "asc";

      const {
        categories,
        isValidSorting,
        currentPage: newCurrentPage,
        pageSize: newPageSize,
        totalPages,
      } = await getCategoriesData({
        sortBy,
        sortOrder,
        currentPage,
        pageSize,
        search,
      });

      const { shouldUpdate, params } = updateSearchParams({
        isValidSorting,
        newCurrentPage,
        currentPage,
        newPageSize,
        pageSize,
        search,
        searchParams,
        validSortFields: validSortFieldsCategories,
      });

      if (!shouldUpdate) {
        setData(categories);
        setTotalPages(totalPages);
        setIsLoading(false);
      } else {
        router.replace(`?${params.toString()}`, { scroll: false });
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
