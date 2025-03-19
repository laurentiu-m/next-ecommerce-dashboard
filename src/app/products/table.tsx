"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { TableComponent } from "@/components/table";
import { getProductsData } from "@/lib/table";
import { ProductType } from "@/types/product";

import { columns } from "./columns";

export default function ProductsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialSorting = useMemo(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    return sortBy && sortOrder
      ? [{ id: sortBy, desc: sortOrder === "desc" }]
      : [];
  }, [searchParams]);

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(updater);

    const params = new URLSearchParams(searchParams.toString());

    if (newSorting.length > 0) {
      const { id, desc } = newSorting[0];
      params.set("sortBy", id);
      params.set("sortOrder", desc ? "desc" : "asc");
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sortBy = sorting[0]?.id ?? "";
      const sortOrder = sorting[0]?.desc ?? "";

      const fetchedData = await getProductsData(
        sortBy,
        sortOrder,
        selectedCategories
      );
      setData(fetchedData);
      setIsLoading(false);
    };

    fetchData();
  }, [sorting, selectedCategories]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    enableMultiSort: false,
    meta: {
      selectedCategories,
      setSelectedCategories,
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return <TableComponent table={table} />;
}
