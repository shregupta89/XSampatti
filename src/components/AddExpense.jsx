// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogPortal,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { useState, useContext } from "react";
// import { ExpenseContext } from "@/context/ExpenseContext";
// import axios from "axios";

// const AddExpense = () => {
//   const [date, setDate] = useState(new Date());
//   const [formData, setFormData] = useState({
//     amount: "",
//     category: "",
//     desc: "",
//   });

//   const { expenses, setExpenses } = useContext(ExpenseContext);
//   const [loading, setLoading] = useState(false);
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDateSelect = (newDate) => {
//     if (newDate) {
//       setDate(newDate);
//       // Only close the calendar after successful date selection
//       setTimeout(() => setCalendarOpen(false), 100);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "/api/transaction",
//         {
//           ...formData,
//           date: date.toISOString(),
//         },
//         { withCredentials: true }
//       );

//       setExpenses([response.data.newTransaction, ...expenses]);
//       setFormData({
//         amount: "",
//         category: "",
//         desc: "",
//       });
//       setDate(new Date());
//       setDialogOpen(false);
//     } catch (error) {
//       console.error("Submission Error:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="default" className="w-40 bg-orange">
//           Add Expense
//         </Button>
//       </DialogTrigger>
//       <DialogPortal>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add Expense</DialogTitle>
//             <DialogDescription>
//               Add the expenditure here. Click save when you're done.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="amount" className="text-right">
//                 Amount
//               </Label>
//               <Input
//                 type="number"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 id="amount"
//                 className="col-span-3"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="date" className="text-right">
//                 Date
//               </Label>
//               <div className="col-span-3">
//                 <Popover 
//                   open={calendarOpen} 
//                   onOpenChange={setCalendarOpen}
//                 >
//                   <PopoverTrigger asChild>
//                     <Button
//                       id="date"
//                       type="button"
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !date && "text-muted-foreground"
//                       )}
//                       onClick={() => setCalendarOpen(true)}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "PPP") : "Pick a date"}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent 
//                     className="w-auto p-0" 
//                     align="start"
//                     side="bottom"
//                     sideOffset={4}
//                   >
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={handleDateSelect}
//                       initialFocus
//                       className="rounded-md border bg-white"
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="category" className="text-right">
//                 Category
//               </Label>
//               <Input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 id="category"
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="desc" className="text-right">
//                 Description
//               </Label>
//               <Input
//                 type="text"
//                 name="desc"
//                 value={formData.desc}
//                 onChange={handleChange}
//                 id="desc"
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <DialogFooter>
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Adding..." : "Save"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   );
// };

// export default AddExpense;



// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ExpenseContext } from '@/context/ExpenseContext';

// const AddExpense = () => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { expenses, setExpenses } = useContext(ExpenseContext);
  

//   const [formData, setFormData] = useState({
//     amount: '',
//     category: '',
//     description: '',
//     date: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "/api/transaction",
//         {
//           ...formData,
//           date: new Date(formData.date).toISOString(),
//         },
//         { withCredentials: true }
//       );

//       setExpenses([response.data.newTransaction, ...expenses]);


//       console.log("Form submitted successfully:", response.data);

//       // Reset form after successful submission
//       setFormData({
//         amount: '',
//         category: '',
//         description: '',
//         date: ''
//       });
//       setOpen(false);
//     } catch (error) {
//       console.error("Submission Error:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className=" bg-darkorange">Add New Expense</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Expense</DialogTitle>
//           <DialogDescription>
//             Fill in the expense details below
//           </DialogDescription>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="amount">Amount</Label>
//             <Input 
//               id="amount" 
//               type="number" 
//               placeholder="Enter amount" 
//               value={formData.amount}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="category">Category</Label>
//             <Input 
//               id="category" 
//               type="text" 
//               placeholder="Enter category" 
//               value={formData.category}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Input 
//               id="description" 
//               type="text" 
//               placeholder="Enter description" 
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="date">Date</Label>
//             <Input 
//               id="date" 
//               type="date" 
//               value={formData.date}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={() => {
//                 setOpen(false);
//                 setFormData({
//                   amount: '',
//                   category: '',
//                   description: '',
//                   date: ''
//                 });
//               }}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Adding..." : "Add Expense"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddExpense;





// AddExpense.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import ExpenseFormDialog from './ExpenseFormDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const AddExpense = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Dialog>
    <DialogTrigger asChild>
        <Button className="bg-darkorange" onClick={() => setOpen(true)}>
          Add New Expense
        </Button>
      </DialogTrigger>
      <ExpenseFormDialog open={open} setOpen={setOpen} />
    </Dialog>
    
    </>
  );
};

export default AddExpense;

// // Example of using the dialog with a different trigger
// // AnotherComponent.jsx
// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import ExpenseFormDialog from './ExpenseFormDialog';

// const AnotherComponent = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpen(true)}>
//         Quick Add Expense
//       </Button>
//       <ExpenseFormDialog open={open} setOpen={setOpen} />
//     </>
//   );
// };

// export default AnotherComponent;