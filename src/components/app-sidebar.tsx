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
} from "@/components/ui/sidebar";
import { AppSidebarMenu } from "./app-sidebar-menu";
import { montserrat } from "./ui/fonts";

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
          <button className="flex items-center gap-3 p-4 rounded-lg cursor-pointer text-sidebar-ring transition-colors hover:bg-sidebar-border hover:text-sidebar-foreground">
            <LogOutIcon className="size-6" />
            <span>Logout</span>
          </button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
