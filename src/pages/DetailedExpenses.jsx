import React,{useState} from 'react'
import {DatePicker} from "../components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
                <div className='row-span-2'>
                    {/* filter by category */}
                    nybtbtb
                </div>
            </Card>
        </div>
        <div className='col-span-3 p-1 h-full '>
           <Card className='h-5/6 w-full '>
            <CardContent className='w-full h-full'>

            </CardContent>
           </Card>

        </div>
    </div>
  )
}

export default DetailedExpenses
