import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./ui/date-picker"
import { useState } from "react"

  

const AddExpense = () => {
    const [formData,setFormData]=useState({
    amount:"",
    category:"",
    desc:"",
    date:""
    })
    // const [transactions, setTransactions] = useState([]); // Store recent transactions
    const [loading, setLoading] = useState(false);
  
    // Handle input change
    const handleChange = () => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    // Submit form data to backend
    const handleSubmit = async () => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await fetch("/api/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          withCredentials:true
        });
  
        if (!response.ok) throw new Error("Failed to add expenditure");
  
        // const newTransaction = await response.json();
        
        // Update recent transactions list
        // setTransactions([newTransaction, ...transactions]); 
        setFormData({ amount: "", date: "", category: "", description: "" }); // Reset form
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };


  return (
    <div>
        <Dialog>
      <DialogTrigger asChild>
      <Button variant="default"  className="w-40 bg-orange" >
                  Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add the expenditure here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} id="amount"  className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
                Date
            </Label>
            {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
            <DatePicker value={formData.date}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input type="string" name="category" value={formData.category} onChange={handleChange} id="category"  className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input type="string" name="desc" value={formData.desc} onChange={handleChange} id="desc" className="col-span-3" required/>
          </div>
        </div>
        <DialogFooter>
          
          <Button type="submit" disabled={loading} >Save </Button>
          {/* {loading ? "Adding..." : "Add Expenditure"} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
       
      
    </div>
  )
}

export default AddExpense
