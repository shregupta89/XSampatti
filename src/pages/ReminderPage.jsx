import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ReminderContext } from '@/context/ReminderContext';
import { UserContext, UserContextProvider } from '@/context/UserContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const ReminderCard = ({ title, date, amount, onEdit, onDelete }) => {
  return (
    <Card className="mb-2 p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>{date}</span>
            <span>${amount}</span>
          </div>
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 hover:text-red-600" 
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ReminderPage = () => {
  
  const {reminder,filterRemindersById}= useContext(ReminderContext)
  const toast = useToast()

  const handleEdit = (id) => {
    console.log('Edit reminder:', id);
  };

  const handleDelete = async(id) => {
  try {
        const response = await axios.delete(`/api/reminder/${id}`,{withCredentials:true})
        console.log(response);
        
        if(response.data.error){
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: response.data.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }else{
          toast({
            title: "Deleted succesfully",
            description: "Reminder was deleted",
          })
          filterRemindersById(id)
          console.log(reminder);
          
        }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error.response.data.error,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }
  };

  const handleAdd = (type) => {
    console.log('Add new', type, 'reminder');
  };

  
  

  console.log(reminder)


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
                  r.toBePaid?<ReminderCard
                    key={r._id}
                    title={r.category.name}
                    date={r.dayOfMonth}
                    amount={r.amount}
                    onEdit={() => handleEdit(r._id)}
                    onDelete={() => handleDelete(r._id)}
                  />:<span></span>
                ))}
              </div>
              </ScrollArea>

              <Button 
                variant="outline" 
                className="w-full self-end"
                onClick={() => handleAdd('payment')}
              >
                add
              </Button>
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
                    title={r.title}
                    date={r.date}
                    amount={r.amount}
                    onEdit={() => handleEdit(r._id)}
                    onDelete={() => handleDelete(r._id)}
                  />
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full self-end"
                onClick={() => handleAdd('receiving')}
              >
                add
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderPage;