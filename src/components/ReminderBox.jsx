// import React from 'react'
// import { useContext, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { ReminderContext } from "@/context/ReminderContext";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const ReminderBox = ({ pay, isEdit, initialData }) => {
//   const [category, setCategory] = useState(initialData?.category || "");
//   const [amount, setAmount] = useState(initialData?.amount || "");
//   const [description, setDescription] = useState(initialData?.description || "");
//   const [date, setDate] = useState(initialData?.date ? new Date(initialData.date) : new Date());
//   const [toBePaid, setToBePaid] = useState(pay);

//   const { reminder, setReminder } = useContext(ReminderContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await axios.post('/api/reminder', {
//         amount,
//         date,
//         toBePaid,
//         description,
//         category: category.toLowerCase()
//       }, { withCredentials: true });

//       setReminder([response.data.findrem, ...reminder]);
//       setLoading(false);
//     } catch (error) {
//       setError(error.response?.data?.message || "An error occurred");
//       setLoading(false);
//     }
//   };

//   return (
//     <DialogContent className="sm:max-w-[425px]">
//       <DialogHeader>
//         <DialogTitle>{isEdit ? 'Edit Reminder' : 'Add Reminder'}</DialogTitle>
//         <DialogDescription>
//           {isEdit ? 'Update the reminder details below' : 'Fill in the reminder details below'}
//         </DialogDescription>
//       </DialogHeader>

//       <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="amount" className="text-right">Amount</Label>
//           <Input
//             type="number"
//             name="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="col-span-3"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="category" className="text-right">Category</Label>
//           <Input
//             type="text"
//             name="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="col-span-3"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="description" className="text-right">Description</Label>
//           <Input
//             name="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="col-span-3"
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label className="text-right">Date</Label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className={cn(
//                   "col-span-3 justify-start text-left font-normal",
//                   !date && "text-muted-foreground"
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {date ? format(date, "PPP") : <span>Pick a date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//         </div>

//         {error && (
//           <div className="text-red-500 text-sm">{error}</div>
//         )}

//         <DialogFooter>
//           <Button type="button" variant="secondary" className="mr-2">
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading}>
//             {loading 
//               ? (isEdit ? "Updating..." : "Adding...") 
//               : (isEdit ? "Update Reminder" : "Add Reminder")
//             }
//           </Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   );
// };

// export default ReminderBox;


import React from 'react'
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ReminderContext } from "@/context/ReminderContext";
const ReminderBox = (props) => {
    const [category,setCategory]=useState(props.category ? props.category : "")
    const [amount,setAmount]=useState(props.amount ? props.amount : null)
    const [description,setDescription]=useState(props.description ? props.description : "")
    const [day,setDay]=useState(props.day ? props.day : null)
    const [toBePaid,setToBePaid]=useState(props?.pay)

    const {reminder,setReminder}=useContext(ReminderContext)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleDayChange = (e) => {
    const dayValue = parseInt(e.target.value);
  
    // Check if the value is not a valid number or is outside the range 1 to 31
    if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
      setError("Please enter a valid day between 1 and 31.");
      setDay(null); // Reset the day value
    } else {
      setError(null); // Clear error if day is valid
      setDay(dayValue); // Update the day value
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(day);
    console.log(amount);
    console.log(description);
    console.log(category);
    console.log(toBePaid);
    const response = await axios.post('/api/reminder',{
      amount,dayOfMonth:day,toBePaid,description,category:category.toLowerCase()
    },{withCredentials:true})

    setReminder([response.data.findrem,...reminder])

    

    // Add the reminder logic here (API call or local storage, etc.)

    setLoading(false);
    // setReminderData({ title: "", description: "" });
  };
  return (
    <>
<DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Reminder</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              type="text"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="category"
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              id="description"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              name="amount"
              value={amount}
              onChange={(e)=>setAmount(parseInt(e.target.value))}
              id="amount"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="day" className="text-right">
              Date
            </Label>
            <Input
              name="day"
              value={day}
              onChange={handleDayChange}
              id="day"
              className="col-span-3"
              required
              />
          </div>
              {error && <span className=" text-xs">{error}</span>}
        </div>

        <DialogFooter>
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save Reminder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default ReminderBox