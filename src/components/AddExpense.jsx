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
import { ExpenseContext } from "@/context/ExpenseContext";
import React, { useContext } from "react";
import axios from "axios";
  
const AddExpense = () => {
  const [formData, setFormData] = useState({
      amount: "",
      category: "",
      desc: "",
      date: null,
  });

  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);
  
  console.log("expenses fromat:  ",expenses)
  // const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      console.log("Form Data before submission:", formData);
      console.log("Form date ", formData.date);

      if (!formData.date) {
          console.log("Date is required");
          setLoading(false);
          return;
      }

       try {
        const response = await axios.post("/api/transaction", 
            {
                ...formData,
                date: new Date(formData.date).toISOString(), // ✅ Ensure correct date format
            },
            { withCredentials: true } // ✅ Ensure cookies are sent
        );

        console.log("API Response:", response.data);
        setExpenses([response.data.newTransaction, ...expenses]);
        

        setFormData({ amount: "", date: null, category: "", desc: "" });
    } catch (error) {
        console.error("Submission Error:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
    
  };

  return (
      <Dialog>
          <DialogTrigger asChild>
              <Button variant="default" className="w-40 bg-orange">
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
                      <Input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          id="amount"
                          className="col-span-3"
                          required
                      />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                          Date
                      </Label>
                      <DatePicker 
                        selected={formData.date} 
                        onChange={(date) => setFormData({ ...formData, date })} 
                    />
                      {/* <DatePicker 
                          value={formData.date} 
                          onChange={(date) => setFormData({ ...formData, date })} 
                      /> */}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                          Category
                      </Label>
                      <Input
                          type="string"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          id="category"
                          className="col-span-3"
                          required
                      />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="desc" className="text-right">
                          Description
                      </Label>
                      <Input
                          type="string"
                          name="desc"
                          value={formData.desc}
                          onChange={handleChange}
                          id="desc"
                          className="col-span-3"
                          required
                      />
                  </div>
              </div>
              <DialogFooter>
                  <Button type="submit" disabled={loading} onClick={handleSubmit}>
                      {loading ? "Adding..." : "Save"}
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
};

export default AddExpense;



