import { FormEvent, useState } from "react";

import { Search } from "lucide-react";

import { Button, Input } from "../ui";

type Props = {
  onSearchChange: (search: string) => void;
};

export const SearchComponent = ({ onSearchChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSearchChange(searchTerm);
  };

  return (
    <form onSubmit={onSubmit} className="relative w-100">
      <Input
        id="search"
        type="text"
        placeholder="Search"
        className="w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        className="absolute top-0 right-0 cursor-pointer hover:bg-transparent"
      >
        <Search />
      </Button>
    </form>
  );
};
