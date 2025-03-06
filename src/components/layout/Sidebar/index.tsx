import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { montserrat } from "@/components/ui/fonts";
import { MenuItems } from "./MenuItems";

export const Sidebar = () => {
  return (
    <div className="w-sidebar h-full fixed flex flex-col justify-between bg-background border-r border-surface p-8 text-foreground">
      <div className="flex flex-col gap-9">
        <h2
          className={`uppercase text-2xl tracking-wider font-bold cursor-default ${montserrat.className}`}
        >
          NextPanel
        </h2>

        <MenuItems />
      </div>

      <div className="flex gap-3 items-center text-secondary rounded-xl p-4 cursor-pointer transition-color duration-300 ease-in-out group hover:bg-surface hover:text-foreground">
        <ArrowLeftStartOnRectangleIcon className="size-6" />
        <h4 className="font-medium">Logout</h4>
      </div>
    </div>
  );
};
