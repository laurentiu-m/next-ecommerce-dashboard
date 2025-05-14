import { sortGenderOrders } from "@/constants";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui";

type Props = {
  title: string;
  className?: string;
  selectedGender?: string | null;
  onGenderChange?: (gender: string) => void;
};

export const SortGenderButton = ({
  title,
  className,
  selectedGender,
  onGenderChange,
}: Props) => {
  console.log(selectedGender);
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={selectedGender ?? ""}>
            {sortGenderOrders.map((gender) => (
              <DropdownMenuRadioItem
                key={gender.value}
                value={gender.value}
                className="cursor-pointer"
                onClick={() =>
                  onGenderChange ? onGenderChange(gender.value) : null
                }
              >
                {gender.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
