"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllProductsCategories } from "@/lib/table";

export const DropdownMenuTable = ({
  column,
  title,
  className,
  selectedCategories,
  onCategoryChange,
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

  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-60">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.id}
              checked={selectedCategories.has(category.slug)}
              onCheckedChange={() => onCategoryChange(category.slug)}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
