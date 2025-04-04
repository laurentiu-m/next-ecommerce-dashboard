"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoriesPrisma } from "@/constants";

type Props = {
  title: string;
  className: string;
  selectedCategories?: Set<string>;
  onCategoryChange?: (category: string) => void;
};

export const DropdownMenuTable = ({
  title,
  className,
  selectedCategories,
  onCategoryChange,
}: Props) => {
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-60">
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            checked={selectedCategories?.size === 0}
            onCheckedChange={() =>
              onCategoryChange ? onCategoryChange("") : null
            }
          >
            All
          </DropdownMenuCheckboxItem>
          {categoriesPrisma.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.slug}
              checked={
                selectedCategories
                  ? selectedCategories.has(category.slug)
                  : false
              }
              onCheckedChange={() =>
                onCategoryChange ? onCategoryChange(category.slug) : null
              }
              className="cursor-pointer"
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
