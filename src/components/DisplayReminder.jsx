import React, { useContext, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReminderContext } from '@/context/ReminderContext';
import axios from 'axios';

const DisplayReminder = (props) => {
  const{reminder ,setReminder} =useContext(ReminderContext)
  const {outgoing} = props
  let check = useRef(true)
  useEffect(()=>{
    const getReminders = async()=>{
        const response = await axios.get('/api/reminder',{withCredentials:true})
        if(response.data.reminders){
            response.data.reminders.sort((a, b) => a.dayOfMonth - b.dayOfMonth);
            setReminder(response.data.reminders)
        }
    }
    try {
        getReminders()
        console.log(reminder);
        
        
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error in fetching reminders",
            description: error.response.data.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }
},[])

  return (
    <Card className="w-full h-full overflow-clip ">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{outgoing?'Payment Reminders':'Receipts'}</CardTitle>
        <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
          View All
        </span>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              {/* <TableHead>Description</TableHead> */}
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
            {reminder.map((r, index) => {
                if(r.toBePaid===outgoing){
                    check=false
                    return(
                        <TableRow key={r._id}>
                          <TableCell className="font-medium">
                            {r.category.name}
                          </TableCell>
                          {/* <TableCell>
                            {r.description.length!=0 && <span >{r.description.length>50?`${r.description.substring(0,50)}...`:`${r.description}`}</span>}
                            {r.description.length===0 && <span >empty</span>}
                          </TableCell> */}
                          <TableCell>{r.dayOfMonth}</TableCell>
                          <TableCell className={`${r.toBePaid?'text-red-500':'text-green-400'} text-right`}>{r.amount}</TableCell>
                        </TableRow>
                      )
                }
            })}

          </TableBody>
        </Table>
            {check && <div className=' flex flex-col w-full h-10 items-center justify-center '><p>No data to display</p></div>}
      </CardContent>
    </Card>
  );
};

export default DisplayReminder;