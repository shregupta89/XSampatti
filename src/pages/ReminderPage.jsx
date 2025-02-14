import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ReminderContext } from '@/context/ReminderContext';
import { UserContext, UserContextProvider } from '@/context/UserContext';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  
  const {reminder}= useContext(ReminderContext)
  const {email}=useContext(UserContext)
  const receivingReminders = [
    { id: 1, title: "Client Payment", date: "2025-02-10", amount: 2500 },
    { id: 2, title: "Freelance Work", date: "2025-02-25", amount: 800 }
  ];

  const handleEdit = (id) => {
    console.log('Edit reminder:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete reminder:', id);
  };

  const handleAdd = (type) => {
    console.log('Add new', type, 'reminder');
  };

  
  

  console.log(reminder)
  console.log(email)

  return (

    <Card className=" h-screen w-screen p-1 overflow-hidden">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">Set Reminders</CardTitle>
      </CardHeader>
      <CardContent className=" h-full ">
        <div className="flex gap-6 flex-col h-5/6 md:flex-row">
          {/* Payment Reminder Card */}
          <Card className="flex-1 p-1 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-normal">
                all payment reminder
              </CardTitle>
            </CardHeader>
            <CardContent className=" flex h-5/6 flex-col ">
              <ScrollArea>

              <div className="min-h-[100px] flex h-full flex-col gap-3">
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
                className="w-full justify-self-end"
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
            <CardContent className="space-y-4">
              <div className="min-h-[100px]">
                {receivingReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    title={reminder.title}
                    date={reminder.date}
                    amount={reminder.amount}
                    onEdit={() => handleEdit(reminder.id)}
                    onDelete={() => handleDelete(reminder.id)}
                  />
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full"
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