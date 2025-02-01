import React, { useContext, useEffect } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import { Card, CardContent } from "@/components/ui/card";
import { trimToRecent10 } from "@/helper/recentExpensehelper";
import { formatDate } from "@/helper/formatDate";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const RecentExpenses = () => {
  const { expenses , setExpenses} = useContext(ExpenseContext);
  const {toast} = useToast()
  const navigate = useNavigate()
  useEffect(()=>{
          const getExpense = async()=>{
                  try {
                          const response = await axios.get("/api/transaction",{withCredentials:true})
                          if(response.data.error){
                              navigate("/login")
                              return
                          }
                          setExpenses([...response.data.transactions])
                          console.log(response.data);
                          
                  } catch (error) {
                      toast({
                          variant: "destructive",
                          title: "Uh oh! Something went wrong.",
                          description: error.response.data.error,
                          action: <ToastAction altText="Try again">Try again</ToastAction>,
                      })
                      if(error.response.status==401){
                          navigate("/login")
                      }
                  }
          }
      getExpense()

  },[])
  useEffect(()=>{
      let tempexpenses = [...expenses]
      tempexpenses = trimToRecent10(tempexpenses)
      setExpenses([...tempexpenses])

  },[])
  

  return (
    <div className="w-full h-full mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
      <Card>
        <CardContent className="p-4">
          <ul className="space-y-3">
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{expense.category.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                  </div>
                  <p className="text-lg font-semibold text-red-600">₹{expense.amount}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">No expenses recorded.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentExpenses;
