"use client";

import { useEffect, useState } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllProductsCategories } from "@/lib/table";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const DropdownMenuTable = ({
  column,
  title,
  className,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProductsCategories();
      setCategories(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log(selectedCategories);

  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-60">
          {categories.map((category, index) => (
            <DropdownMenuCheckboxItem
              key={category.id}
              checked={selectedCategories.has(category.name)}
              onCheckedChange={() => {
                setSelectedCategories((prev) => {
                  const newSet = new Set(prev);
                  newSet.has(category.slug)
                    ? newSet.delete(category.slug)
                    : newSet.add(category.slug);
                  return newSet;
                });
              }}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
