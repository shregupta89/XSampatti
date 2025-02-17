import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <div className="grid grid-cols-12 h-screen w-screen overflow-auto">
      {/* Sidebar taking 1 column */}
      <div className="col-span-1 h-full">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>

      {/* Main Content taking 11 columns */}
      <div className="col-span-11 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
