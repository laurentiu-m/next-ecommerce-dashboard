"use client";

import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/16/solid";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { ROUTES } from "@/constants";

type RoutePath = keyof typeof ROUTES;

export const Topbar = () => {
  const pathname = usePathname() as RoutePath;

  const currentPath = ROUTES[pathname];

  return (
    <div className="fixed w-topbar-w h-topbar-h flex items-center justify-between  ml-sidebar px-8 py-4 bg-background border-b border-surface text-foreground">
      <h2 className="text-xl font-medium">{currentPath}</h2>

      <div className="flex gap-5 items-center">
        <ThemeSwitch />
        <div className="flex gap-2 items-center justify-between">
          <div className="bg-surface w-[35px] h-[35px] rounded-full flex items-center justify-center">
            <UserIcon className="size-4" />
          </div>

          <h4 className="text-sm font-medium">username</h4>
        </div>
      </div>
    </div>
  );
};
