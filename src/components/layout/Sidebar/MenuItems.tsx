"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ArchiveBoxIcon, UsersIcon } from "@heroicons/react/16/solid";

export const menuItems = [
  {
    icon: <HomeIcon className="size-6" />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <ArchiveBoxIcon className="size-6" />,
    text: "Products",
    link: "/products",
  },
  {
    icon: <UsersIcon className="size-6" />,
    text: "Users",
    link: "/users",
  },
];

export const MenuItems = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-sm font-light text-secondary">Main Menu</h5>

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link
              key={item.text}
              href={item.link}
              className={`${isActive ? "pointer-events-none bg-surface text-foreground" : "text-secondary cursor-pointer hover:bg-surface hover:text-foreground"} p-4 flex items-center gap-3 rounded-xl group transition-colors duration-300`}
              aria-disabled={isActive}
            >
              {item.icon}
              <h4 className="font-medium">{item.text}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
