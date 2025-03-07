import { HomeIcon, ArchiveBoxIcon, UsersIcon } from "@heroicons/react/16/solid";
import { LogOutIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { montserrat } from "./ui/fonts";

const items = [
  {
    icon: <HomeIcon className="size-6" />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <ArchiveBoxIcon className="size-6" />,
    title: "Products",
    url: "/products",
  },
  {
    icon: <UsersIcon className="size-6" />,
    title: "Users",
    url: "/users",
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="p-8">
        <SidebarGroup className="p-0">
          <SidebarHeader
            className={`text-2xl uppercase font-semibold tracking-wide ${montserrat.className}`}
          >
            NextPanel
          </SidebarHeader>
          <SidebarGroupLabel className="font-normal">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-6 px-4" asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOutIcon className="size-10" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
