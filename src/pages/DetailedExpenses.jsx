import React,{useState} from 'react'
import {DatePicker} from "../components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import PaginatedExpenses from '@/components/PaginatedExpenses'

const DetailedExpenses = () => {
    
   
    const [date,setDate]=useState();
  return (
    <div className='grid grid-cols-4  gap-2 h-full w-full'>
        <div className='col-span-1 grid  grid-rows-4 h-full '>
            <Card className="  w-full h-full row-span-2">
                <div className=' flex items-center justify-center mt-4'>
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow h-full"
                    />
                </div>
                <div className='row-span-3  w-full h-full'>
                   <Card className=''>
                    <div className='row-span-2 m-2  w-full h-full'>

                    </div>
                    </Card>
                </div>
            </Card>
        </div>
        <div className='col-span-3'>
           
            <PaginatedExpenses/>
           

        </div>
    </div>
  )
}

export default DetailedExpenses
