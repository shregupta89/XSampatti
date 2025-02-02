import RecentExpenses from '@/components/RecentExpenses'

import React, { useContext, useEffect } from 'react'


import { BarGraph } from '@/components/BarGraph'
import { DonutChart } from '@/components/DonutChart'
import DisplayReminder from '@/components/DisplayReminder'
import { Profile } from '@/components/Profile'
const Dashboard = () => {
    
  return (
    // <div>
      <div className='grid grid-cols-12 h-svh w-svw '>
        <div className=' h-svh col-span-1 '>
         sidebar 
        </div>
        <div className=' h-svh col-span-3 '>
         <RecentExpenses/>
        </div>
        <div className='h-svh  col-span-8 grid grid-rows-3 '>
          {/* upper green component */}
          <div className='row-span-2 grid grid-cols-3'>
            {/* left blue component */}
            <div className='col-span-2 grid grid-rows-2'>
              <div className='row-span-1 p-3 '>
                <BarGraph/>
              </div>
              <div className='row-span-1 grid grid-cols-2 '>
                <div className='cols-span-1 '>
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
                    <Profile/>
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
              <DisplayReminder outgoing = {true}/>
            </div>
            <div className='col-span-1'>
              <DisplayReminder outgoing = {false}/>

            </div>
          </div>
      
        </div>
      </div>
  
    // </div>

  )
}

export default Dashboard