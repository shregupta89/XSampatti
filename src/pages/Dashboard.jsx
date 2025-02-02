import React from 'react'
import { BarGraph } from '@/components/BarGraph'
import { DonutChart } from '@/components/DonutChart'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
const Dashboard = () => {
  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='col-span-1'>
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
        <div className='col-span-3'>
         recent activity 
        </div>
        <div className='col-span-8 grid grid-rows-3'>
          {/* upper green component */}
          <div className='row-span-2 grid grid-cols-3'>
            {/* left blue component */}
            <div className='col-span-2 grid grid-rows-2'>
              <div className='row-span-1'>
                <BarGraph/>
              </div>
              <div className='row-span-1 grid grid-cols-2'>
                <div className='cols-span-1'>
                <DonutChart/>
                </div>
                <div className='cols-span-1 grid grid-rows-2'>
                  <div className='row-span-1'>
                   total spend this week
                  </div>
                  <div className='row-span-1'>
                   total spend this month
                  </div>
                </div>
              </div>

            </div>
            {/* right blue component */}
            <div className='col-span-1 grid grid-rows-4'>
              <div className='row-span-1 grid grid-cols-3'>
                <div className='col-span-2'>
                  add expense button
                </div>
                <div className='col-span-1'>
                  profile
                </div>

              </div>
              <div className='row-span-3'>
                quick actions
              </div>


            </div>
          </div>
          {/* lower green component */}
          <div className='row-span-1 grid grid-cols-2'>
            <div className='col-span-1'>
              reminers for spenditure
            </div>
            <div className='col-span-1'>
              reminers for acceptance
            </div>
          </div>
      
        </div>
      </div>
  
    </div>

  )
}

export default Dashboard