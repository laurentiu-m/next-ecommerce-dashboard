"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  ArchiveIcon,
  ChevronDown,
  ChevronUp,
  HomeIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";
import { SidebarMenuItem, SidebarMenuSub } from "./ui/sidebar";

const items = [
  {
    icon: <HomeIcon className="size-5" />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <ArchiveIcon className="size-5" />,
    title: "Products",
    children: [
      { title: "All Products", url: "/products" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
  {
    icon: <PackageIcon className="size-5" />,
    title: "Orders",
    url: "/orders",
  },
  {
    icon: <UsersIcon className="size-5" />,
    title: "Customers",
    url: "/customers",
  },
];

export const AppSidebarMenu = () => {
  const pathname = usePathname();

  const initOpenState = () => {
    const openState: Record<string, boolean> = {};

    items.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((subItem) =>
          pathname.includes(subItem.url)
        );
        openState[item.title] = isChildActive;
      }
    });

    return openState;
  };

  const [openStates, setOpenStates] = useState(initOpenState);

  useEffect(() => {
    const newOpenStates = { ...openStates };
    let hasChanges = false;

    items.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((subItem) =>
          pathname.startsWith(subItem.url)
        );
        if (isChildActive && !newOpenStates[item.title]) {
          newOpenStates[item.title] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setOpenStates(newOpenStates);
    }
  }, [pathname, openStates]);

  return items.map((item) => {
    const isChildActive = item.children?.some((subItem) =>
      pathname.startsWith(subItem.url)
    );

    const isOpen = openStates[item.title] || false;

    const getButtonStyle = () => {
      if (isOpen) {
        return "text-sidebar-foreground";
      }

      return isChildActive
        ? "bg-sidebar-border text-sidebar-foreground"
        : "text-sidebar-ring hover:bg-sidebar-border hover:text-sidebar-foreground";
    };

    return item.children ? (
      <Collapsible
        key={item.title}
        open={isOpen}
        onOpenChange={(open) =>
          setOpenStates((prev) => ({
            ...prev,
            [item.title]: open,
          }))
        }
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <button
              className={`flex items-center justify-between w-full p-3 rounded-md transition-colors cursor-pointer ${getButtonStyle()}`}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </span>
              {isOpen ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="gap-2">
              {item.children.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.url}
                  className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                    pathname === subItem.url
                      ? "bg-sidebar-border text-sidebar-foreground pointer-events-none"
                      : "text-sidebar-ring hover:bg-sidebar-border hover:text-sidebar-foreground"
                  }`}
                >
                  {subItem.title}
                </Link>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    ) : (
      <Link
        key={item.title}
        href={item.url}
        className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
          pathname === item.url
            ? "bg-sidebar-border text-sidebar-foreground pointer-events-none"
            : "text-sidebar-ring hover:bg-sidebar-border hover:text-sidebar-foreground"
        }`}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    );
  });
};
