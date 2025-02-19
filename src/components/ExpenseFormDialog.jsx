import React, { useContext, useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseContext } from '@/context/ExpenseContext';

const  ExpenseFormDialog = ({ open, setOpen,category}) => {
 
  
  const [loading, setLoading] = useState(false);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: category || '',
    description: '',
    date: ''
  });
  useEffect(() => {
    console.log("category from use effect :",category)
    if (category) {
      setFormData(prev => ({ 
        ...prev,
        category   //Merges the new category into formData while keeping the other properties unchanged.so using the previous state (prev) ensures we don’t lose any existing values.
      }));
    }
  }, [category]);
 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/transaction",
        {
          ...formData,
          date: new Date(formData.date).toISOString(),
        },
        { withCredentials: true }
      );

      setExpenses([response.data.newTransaction, ...expenses]);
      console.log("Form submitted successfully:", response.data);

      // Reset form after successful submission
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: ''
      });
      setOpen(false);
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Fill in the expense details below
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="Enter amount" 
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              type="text" 
              placeholder="Enter category" 
              value={formData.category }
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              type="text" 
              placeholder="Enter description" 
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date" 
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setOpen(false);
                setFormData({
                  amount: '',
                  category: '',
                  description: '',
                  date: ''
                });
              }}
            >
              Cancel
            </Button>
            <Button className='bg-darkorange hover:bg-darkerorange' type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseFormDialog