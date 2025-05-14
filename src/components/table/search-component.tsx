import { ChangeEvent, FormEvent, useState } from "react";

import { Search } from "lucide-react";

import { Button, Input } from "../ui";

type Props = {
  search: string | null;
  onSearchChange: (search: string) => void;
};

export const SearchComponent = ({ search, onSearchChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>(search ?? "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!search && searchTerm === "") return;

    onSearchChange(searchTerm);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") onSearchChange("");

    setSearchTerm(value);
  };

  return (
    <form onSubmit={onSubmit} className="relative w-100">
      <Input
        id="search"
        type="text"
        autoComplete="off"
        placeholder="Search"
        className="w-full"
        defaultValue={searchTerm}
        onChange={onChange}
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
