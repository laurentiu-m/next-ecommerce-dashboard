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
  getCurrentPage,
  getPageSize,
  getSelectedCategories,
  getSorting,
  handleCategoryChange,
  handleCurrentPageChange,
  handlePageSizeChange,
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const sortBy = sorting[0]?.id ?? "";
      const sortOrder = sorting[0]?.desc ? "desc" : "asc";
      const categories = Array.from(selectedCategories);

      const {
        products,
        totalPages,
        currentPage: newCurrentPage,
        pageSize: newPageSize,
        isValidSorting,
      } = await getProductsData(
        sortBy,
        sortOrder,
        categories,
        currentPage,
        pageSize
      );

      if (!isValidSorting) {
        const params = new URLSearchParams(searchParams);
        params.delete("sortBy");
        params.delete("sortOrder");
        router.replace(`?${params.toString()}`, { scroll: false });
      }

      if (newCurrentPage !== currentPage || newPageSize !== pageSize) {
        const params = new URLSearchParams(searchParams);
        params.set("currentPage", newCurrentPage.toString());
        params.set("pageSize", newPageSize.toString());
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        setData(products);
        setTotalPages(totalPages);
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <TableComponent
      table={table}
      currentPage={currentPage}
      pageSize={pageSize}
      totalPages={totalPages}
      onCurrentPageChange={onCurrentPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
