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
    <div className='grid grid-cols-4'>
        <div className='col-span-1 grid  row-span-3 gap-2'>
            <Card className=" m-2 w-full h-screen">
                <div className='row-span-1 flex items-center justify-center mt-4'>
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                    />
                </div>
                <div className='row-span-3'>
                    {/* filter by category */}
                </div>
            </Card>


        </div>
        <div className='col-span-3'>
           <Card className='max-w-full max-h-screen m-2'>

           </Card>

        </div>
    </div>
  )
}

export default DetailedExpenses
