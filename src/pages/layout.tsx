import { SearchProvider } from "@/context/search-context";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Header } from "@/components/layout/header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";

  return (
    <section>
      <SearchProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div id="content" className={cn("ml-auto w-full max-w-full", "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]", "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]", "transition-[width] duration-200 ease-linear", "flex h-svh flex-col", "group-data-[scroll-locked=1]/body:h-full", "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh")}>
            <Header>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>
            <Outlet />
          </div>
        </SidebarProvider>
      </SearchProvider>
    </section>
  );
}
