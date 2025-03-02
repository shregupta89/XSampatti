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
// const Dashboard = () => {
    
//   return (    
    
//       <div className='grid grid-cols-11 h-full w-full'>
//         <div className=' h-full col-span-3 '>
//          <RecentExpenses />
//         </div>
//         <div className='h-full  col-span-8 grid grid-rows-3 '>
//           {/* upper green component */}
//           <div className='row-span-2 grid grid-cols-3'>
//             {/* left blue component */}
//             <div className='col-span-2 grid grid-rows-2'>
//               <div className='row-span-1 p-2 flex justify-center items-center '>
//                 <BarGraph/>
//               </div>
//               <div className='row-span-1 p-2 grid grid-cols-2 gap-2 items-center justify-center  '>
//                 <div className='cols-span-1 '>
//                 <DonutChart/>
//                 </div>
//                 <div className='cols-span-1 grid grid-rows-2 gap-2'>
//                   <div className='row-span-1'>
//                    <WeekMonthExpend heading="Weekly Expenditure" amt="₹1200" desc="This weeks expenses" type='weekSum'/>
//                   </div>
//                   <div className='row-span-1'>
//                   <WeekMonthExpend heading="Monthly Expenditure" amt="₹20200" desc="This months expenses" type='monthSum'/>
//                   </div>
//                 </div>
//               </div>

//             </div>
//             {/* right blue component */}
//             <div className='col-span-1 grid grid-rows-12 p-2'>
//               <div className='row-span-1 grid grid-cols-3'>
//                 <div className='col-span-2'>
//                   <AddExpense/>
//                 </div>
//                 <div className='col-span-1'>
//                     <Profile/>
//                 </div>

//               </div>
//               <div className='row-span-11'>
//                 <QuickActions/>
//               </div>
//             </div>
//           </div>
//           {/* lower green component */}
//           <div className='row-span-1 grid grid-cols-2 p-2 gap-2'>
//             <div className='col-span-1'>
//               <DisplayReminder outgoing = {true}/>
//             </div>
//             <div className='col-span-1'>
//               <DisplayReminder outgoing = {false}/>

//             </div>
//           </div>
      
//         </div>
//       </div>

//   )
// }

// export default Dashboard

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-11 h-full w-full">
      {/* Sidebar */}
      <div className="h-full md:col-span-2 lg:col-span-3">
        <RecentExpenses />
      </div>

      {/* Main Content */}
      <div className="h-full md:col-span-6 lg:col-span-8 grid grid-rows-3">
        {/* Upper Section */}
        <div className="row-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Left Component */}
          <div className="md:col-span-1 lg:col-span-2 grid grid-rows-2">
            <div className="row-span-1 p-2 flex justify-center items-center">
              <BarGraph />
            </div>
            <div className="row-span-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <DonutChart />
              <div className="grid grid-rows-2 gap-2">
                <WeekMonthExpend heading="Weekly Expenditure" amt="₹1200" desc="This week's expenses" type="weekSum" />
                <WeekMonthExpend heading="Monthly Expenditure" amt="₹20200" desc="This month's expenses" type="monthSum" />
              </div>
            </div>
          </div>

          {/* Right Component */}
          <div className="md:col-span-1 lg:col-span-1 grid grid-rows-12 p-2">
            <div className="row-span-1 flex justify-between">
              <AddExpense />
              <Profile />
            </div>
            <div className="row-span-11">
              <QuickActions />
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
          <DisplayReminder outgoing={true} />
          <DisplayReminder outgoing={false} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
