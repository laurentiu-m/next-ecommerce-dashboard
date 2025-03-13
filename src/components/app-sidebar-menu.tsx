"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArchiveIcon, HomeIcon, UsersIcon } from "lucide-react";

const items = [
  {
    icon: <HomeIcon className="size-6" />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <ArchiveIcon className="size-6" />,
    title: "Products",
    url: "/products",
  },
  {
    icon: <UsersIcon className="size-6" />,
    title: "Users",
    url: "/users",
  },
];

export const AppSidebarMenu = () => {
  const pathname = usePathname();

  return items.map((item) => (
    <Link
      key={item.title}
      href={item.url}
      className={`${pathname === item.url ? "bg-sidebar-border text-sidebar-foreground pointer-events-none" : "text-sidebar-ring hover:bg-sidebar-border hover:text-sidebar-foreground"} flex items-center gap-3 p-4 rounded-lg transition-colors`}
    >
      {item.icon}
      <span className="text-base">{item.title}</span>
    </Link>
  ));
};
