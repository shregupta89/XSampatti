import RecentExpenses from '@/components/RecentExpenses'
import React, { useContext, useEffect } from 'react'
import { BarGraph } from '@/components/BarGraph'
import { DonutChart } from '@/components/DonutChart'
// import { AppSidebar } from '@/components/app-sidebar'
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
import DisplayReminder from '@/components/DisplayReminder'
import { Profile } from '@/components/Profile'
import WeekMonthExpend from '@/components/WeekMonthExpend'
import QuickActions from '@/components/QuickActions'
import AddExpense from '@/components/AddExpense'
const Dashboard = () => {
    
  return (    
    
      <div className='grid grid-cols-11 h-full w-full'>
        <div className=' h-full col-span-3 '>
         <RecentExpenses />
        </div>
        <div className='h-full  col-span-8 grid grid-rows-3 '>
          {/* upper green component */}
          <div className='row-span-2 grid grid-cols-3'>
            {/* left blue component */}
            <div className='col-span-2 grid grid-rows-2'>
              <div className='row-span-1 p-2 flex justify-center items-center '>
                <BarGraph/>
              </div>
              <div className='row-span-1 p-2 grid grid-cols-2 gap-2 items-center justify-center  '>
                <div className='cols-span-1 '>
                <DonutChart/>
                </div>
                <div className='cols-span-1 grid grid-rows-2 gap-2'>
                  <div className='row-span-1'>
                   <WeekMonthExpend heading="Weekly Expenditure" amt="$1200" desc="This weeks expenses"/>
                  </div>
                  <div className='row-span-1'>
                  <WeekMonthExpend heading="Monthly Expenditure" amt="$20200" desc="This months expenses"/>
                  </div>
                </div>
              </div>

            </div>
            {/* right blue component */}
            <div className='col-span-1 grid grid-rows-12 p-2'>
              <div className='row-span-1 grid grid-cols-3'>
                <div className='col-span-2'>
                  <AddExpense/>
                </div>
                <div className='col-span-1'>
                    <Profile/>
                </div>

              </div>
              <div className='row-span-11'>
                <QuickActions/>
              </div>
            </div>
          </div>
          {/* lower green component */}
          <div className='row-span-1 grid grid-cols-2 p-2 gap-2'>
            <div className='col-span-1'>
              <DisplayReminder outgoing = {true}/>
            </div>
            <div className='col-span-1'>
              <DisplayReminder outgoing = {false}/>

            </div>
          </div>
      
        </div>
      </div>

  )
}

export default Dashboard