import React, { useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ReminderContext } from '@/context/ReminderContext';
import { UserContext, UserContextProvider } from '@/context/UserContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import AddReminder from '@/components/AddReminder';
import deleteItem from '@/helper/deleteItem';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const ReminderCard = ({ title, date, amount, description, onEdit, onDelete }) => {
  const today = new Date();

  // Get the current month and year
  const currentMonth = today.getMonth(); // Months are 0-indexed (0 = January)
  const currentYear = today.getFullYear();
  
  // Create a new date using the current month and year, and the given day
  const customDate = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
  
  
  console.log(customDate)
  return (
    <Card className="mb-2 p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>{customDate}</span>
            <span>₹{amount}</span>
          </div>
          {description && (
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete this expense?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
        </div>
      </div>
    </Card>
  );
};



const ReminderPage = () => {
  
  const {reminder,filterRemindersById,setReminder}= useContext(ReminderContext)
  const {toast} = useToast()

  const handleEdit = (id) => {
    console.log('Edit reminder:', id);
  };

  const handleDelete = async(id) => {
    console.log("id of deleted item is:",id)
    const type = "reminder"; 
    deleteItem(id, type,filterRemindersById);
  };

  
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
        // console.log(reminder);
        
        
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error in fetching reminders",
            description: error.response.data.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }
},[])

  // console.log(reminder)


  return (

    <Card className=" h-full w-full p-1 overflow-hidden">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">Set Reminders</CardTitle>
      </CardHeader>
      <CardContent className=" h-full ">
        <div className="flex gap-6 flex-col h-5/6 md:flex-row">
          {/* Payment Reminder Card */}
          <Card className="flex-1 p-3 ">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-normal">
                all payment reminder
              </CardTitle>
            </CardHeader>
            <CardContent className=" space-y-4 flex flex-col">
              <ScrollArea>

              <div className="min-h-[100px] flex h-72 flex-col gap-3">
              {reminder.map((r) => (
                r.toBePaid ? (
                  <ReminderCard
                    key={r._id}
                    title={r.category.name}
                    date={r.dayOfMonth}
                    amount={r.amount}
                    description={r.description} // Add description here
                    onEdit={() => handleEdit(r._id)}
                    onDelete={() => handleDelete(r._id)}
                  />
                ) : (
                  <span key={r._id}></span>
                )
              ))}
            </div>
              </ScrollArea>

              {/* <Button 
                variant="outline" 
                className="w-full self-end"
                onClick={() => handleAdd('payment')}
              >
                add
              </Button> */}
              <div className=' self-center'>
              <AddReminder pay={true}/>
              </div>
            </CardContent>
          </Card>

          {/* Payment Receiving Reminders Card */}
          <Card className="flex-1 p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal">
                payment receiving reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col">
              <div className="min-h-[100px] h-72">
                {reminder.map((r) => (
                  r.toBePaid?<></>:<ReminderCard
                  key={r._id}
                  title={r.category.name}
                  date={r.dayOfMonth}
                  amount={r.amount}
                  description={r.description} // Add description here
                  onEdit={() => handleEdit(r._id)}
                  onDelete={() => handleDelete(r._id)}
                />
                ))}
              </div>
              <div className=' self-center'>
              <AddReminder pay={false}/>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderPage;