import * as React from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, Command, File, Inbox, Send, Trash2 ,BellRing,HandCoins} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { Label } from "@/components/ui/label"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Switch } from "@/components/ui/switch"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: HandCoins,
      isActive: false,
    },
    {
      title: "Remainder",
      url: "/reminders",
      icon: BellRing,
      isActive: false,
    },

  ],

}

export function AppSidebar({
  ...props
}) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()
  const navigate = useNavigate();

  return (
    <Sidebar
    collapsible="none"
    className="overflow-hidden h-screen [&>[data-sidebar=sidebar]]:flex-row border-r">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
            <a href="/dashboard">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">XSampatti</span>
                <span className="truncate text-xs"></span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="px-1.5 md:px-0 ">
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={{
                    children: item.title,
                    hidden: false,
                  }}
                  onClick={() => {
                    setActiveItem(item)
                    navigate(item.url)
                    
                    setOpen(true)
                  }}
                  isActive={activeItem.title === item.title}
                  className="px-2.5 md:px-2">
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
    </Sidebar>

    // (<Sidebar
    //   collapsible="icon"
    //   className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    //   {...props}>
    //   {/* This is the first sidebar */}
    //   {/* We disable collapsible and adjust width to icon. */}
    //   {/* This will make the sidebar appear as icons. */}
     

    // </Sidebar>)
  
  );
}
