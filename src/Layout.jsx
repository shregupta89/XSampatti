import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
const Layout = () => {
  return (
    <div className='grid grid-cols-12 h-svh w-svw'>
            <div className=' h-svh col-span-1 '>
            <SidebarProvider
                    style={
                      {
                        "--sidebar-width": "350px",
                      } 
                    }
                  >
                    <AppSidebar/>
            </SidebarProvider>
            </div>
            <div className=' h-svh col-span-11'>
                <Outlet/>
            </div>

           
    </div>
  )
}

export default Layout
