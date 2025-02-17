import React, { useContext ,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import axios from 'axios'
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExpenseContext } from "@/context/ExpenseContext";
const PaginatedExpenses = () => {
     const { expenses, setExpenses } = useContext(ExpenseContext); 
    console.log("expenses from paginated expense:",expenses)
    expenses.forEach(expense => {
        console.log('Full Expense Object:', expense);
        console.log('Expense Type:', expense.type);
    });

    const { toast } = useToast()
    // const navigate = useNavigate()
  
    useEffect(() => {
      const getExpense = async () => {
        try {
          const response = await axios.get("/api/transaction", { withCredentials: true })
          if (response.data.error) {
            navigate("/login")
            return
          }
          // Sort transactions by date in descending order (newest first)
          const sortedTransactions = [...response.data.transactions].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
          );
          setExpenses(sortedTransactions)
          console.log(response.data);
  
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.response.data.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
          if (error.response.status == 401) {
            navigate("/login")
          }
        }
      }
      getExpense()
    }, [])

     const handleEdit = (id) => {
        console.log('Edit reminder:', id);
      };
    
      const handleDelete = (id) => {
        console.log('Delete reminder:', id);
      };
    
      const handleAdd = (type) => {
        console.log('Add new', type, 'reminder');
      };
  return (
    <div>
        <Card className='w-full h-screen m-2'>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal">
                All expenses
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="min-h-[100px]">
                {expenses.map((expense) => (
                   <SingleExpense
                   key={expense.id}
                   category={expense.category?.name}  // ✅ Passing only the category name
                   date={expense.date}
                   amount={expense.amount}
                   description={expense.description}
                   onEdit={() => handleEdit(expense.id)}
                   onDelete={() => handleDelete(expense.id)}
               />               
                ))}
                </div>
             
            </CardContent>
        </Card>
      
    </div>
  )
}

export default PaginatedExpenses

const SingleExpense = ({ category, date, amount,description, onEdit, onDelete }) => {
    return (
      <Card className="mb-2 p-3">
        <div className='flex flex-col'>
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between ">
            <h3 className="font-medium text-sm">{category || "Uncategorized"}</h3> {/* ✅ Ensure it's a string */}
            <div className="flex gap-8 pr-8 text-sm text-gray-500">
              <span>${amount}</span>
              <span>{new Date(date).toLocaleDateString()}</span> 
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
        <div className='text-sm text-gray-500'>
            {description}
        </div>

        </div>

      </Card>
    );
};
