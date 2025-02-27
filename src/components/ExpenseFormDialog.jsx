// import React, { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ExpenseFormDialog = ({ open, setOpen, isEdit = false, initialData = null, handleExpenseFormSubmit }) => {
//   // console.log(onSubmit)

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     amount: '',
//     category: '',
//     description: '',
//     date: ''
//   });

//   // Update form data when initialData changes (for edit mode)
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         amount: initialData.amount || '',
//         category: initialData.category || '',
//         description: initialData.description || '',
//         date: initialData.date || ''
//       });
//     } else {
//       // Reset form when adding new expense
//       setFormData({
//         amount: '',
//         category: '',
//         description: '',
//         date: ''
//       });
//     }
//   }, [initialData, open]);

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
//       await handleExpenseFormSubmit(formData, isEdit);
      
//       // Reset form after successful submission
//       setFormData({
//         amount: '',
//         category: '',
//         description: '',
//         date: ''
//       });
//     } catch (error) {
//       console.error("Submission Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setOpen(false);
//     setFormData({
//       amount: '',
//       category: '',
//       description: '',
//       date: ''
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{isEdit ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
//           <DialogDescription>
//             {isEdit ? 'Update the expense details below' : 'Fill in the expense details below'}
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
//               required
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
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//             <Button className='bg-darkorange hover:bg-darkerorange' type="submit" disabled={loading}>
//               {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Expense" : "Add Expense")}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ExpenseFormDialog;

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseContext } from '@/context/ExpenseContext';

const ExpenseFormDialog = ({ 
  open, 
  setOpen, 
  isEdit = false, 
  currentExpenseData = null,
  setCurrentExpenseData = () => {} // Provide default empty function
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    if (isEdit && currentExpenseData) {
      setFormData({
        amount: currentExpenseData.amount || '',
        category: currentExpenseData.category || '',
        description: currentExpenseData.description || '',
        date: currentExpenseData.date || ''
      });
    } else {
      // Reset form when adding new expense
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: ''
      });
    }
  }, [currentExpenseData, isEdit, open]);

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
      if (isEdit && currentExpenseData?.id) {
        // Handle edit
        const response = await axios.patch(
          "/api/transaction",
          {
            transactionId: currentExpenseData.id,
            amount: formData.amount,
            category: formData.category,
            description: formData.description,
            date: new Date(formData.date).toISOString(),
          },
          { withCredentials: true }
        );
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        const refreshResponse = await axios.get("/api/transaction", { withCredentials: true });
        const sortedTransactions = [...refreshResponse.data.transactions].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
        setExpenses(sortedTransactions);
        
        toast({
          title: "Success",
          description: "Expense updated successfully",
        });
      } else {
        // Handle add
        const response = await axios.post(
          "/api/transaction",
          {
            ...formData,
            date: new Date(formData.date).toISOString(),
          },
          { withCredentials: true }
        );
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        setExpenses(prevExpenses => [response.data.newTransaction, ...prevExpenses]);
        
        toast({
          title: "Success",
          description: "Expense added successfully",
        });
      }

      // Reset form and close dialog
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: ''
      });
      if (setCurrentExpenseData) {
        setCurrentExpenseData(null);
      }
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: ''
    });
    if (setCurrentExpenseData) {
      setCurrentExpenseData(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the expense details below' : 'Fill in the expense details below'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields remain the same */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="Enter amount" 
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              type="text" 
              placeholder="Enter category" 
              value={formData.category?.name}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              className='bg-darkorange hover:bg-darkerorange' 
              type="submit" 
              disabled={loading}
            >
              {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Expense" : "Add Expense")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseFormDialog;