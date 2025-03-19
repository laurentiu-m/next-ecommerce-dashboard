import { LogOutIcon } from "lucide-react";

import {
  montserrat,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "../ui";

import { AppSidebarMenu } from "./app-sidebar-menu";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="px-8 py-5 bg-background">
        <SidebarGroup className="p-0 gap-8">
          <SidebarHeader
            className={`text-2xl uppercase font-semibold tracking-wide ${montserrat.className}`}
          >
            NextPanel
          </SidebarHeader>
          <SidebarGroupContent className="flex flex-col gap-3">
            <SidebarGroupLabel className="font-normal">
              Main Menu
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
              <AppSidebarMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 bg-background">
        <SidebarMenu>
          <button className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-sidebar-ring transition-colors hover:bg-sidebar-border hover:text-sidebar-foreground">
            <LogOutIcon className="size-5" />
            <span className="text-sm">Logout</span>
          </button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
