// import React, { useContext, useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2 } from "lucide-react";
// import { useToast } from '@/hooks/use-toast';
// import { ToastAction } from '@radix-ui/react-toast';
// import axios from 'axios';
// import { ExpenseContext } from "@/context/ExpenseContext";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import deleteItem from '@/helper/deleteItem';
// import renderPaginationButtons from "@/helper/renderPaginationButtons";
// import ExpenseFormDialog from './ExpenseFormDialog';

// const ITEMS_PER_PAGE = 8;

// const PaginatedExpenses = ({ selectedCategories = [], selectedDate }) => {
//     const { expenses, setExpenses } = useContext(ExpenseContext);
//     const { toast } = useToast();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [currentExpenseData, setCurrentExpenseData] = useState(null);

//     // Function to check if a date matches the selected date
//     const isDateMatch = (expenseDate, selectedDate) => {
//         if (!selectedDate) return true; // If no date selected, include all dates
        
//         const expenseLocalDate = new Date(expenseDate).toLocaleDateString();
//         const selectedLocalDate = new Date(selectedDate).toLocaleDateString();
//         return expenseLocalDate === selectedLocalDate;
//     };

//     // Filter expenses based on both selected categories and date
//     const filteredExpenses = expenses.filter(expense => {
//         const categoryMatch = selectedCategories.length === 0 || 
//             selectedCategories.includes(expense.category?.name || "Uncategorized");
//         const dateMatch = isDateMatch(expense.date, selectedDate);
//         return categoryMatch && dateMatch;
//     });

//     const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

//     // Reset to first page when category or date selection changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedCategories, selectedDate]);

//     //get all expenses and sort by date 
//     useEffect(() => {
//         const getExpense = async () => {
//             try {
//                 const response = await axios.get("/api/transaction", { withCredentials: true });
//                 if (response.data.error) {
//                     navigate("/login");
//                     return;
//                 }
//                 const sortedTransactions = [...response.data.transactions].sort((a, b) =>
//                     new Date(b.date) - new Date(a.date)
//                 );
//                 setExpenses(sortedTransactions);
//             } catch (error) {
//                 toast({
//                     variant: "destructive",
//                     title: "Uh oh! Something went wrong.",
//                     description: error.response.data.error,
//                     action: <ToastAction altText="Try again">Try again</ToastAction>,
//                 });
//                 if (error.response.status === 401) {
//                     navigate("/login");
//                 }
//             }
//         };
//         getExpense();
//     }, []);

//     const handleEdit = (expense, id) => {
//         // Format the date for the input field (YYYY-MM-DD)
//         console.log("date before formatting :",expense.date)
//         const formattedDate = expense.date ? new Date(expense.date).toISOString().split('T')[0] : '';
//         console.log("date after formatting :",formattedDate)
//         // Set the current expense data with its ID for updating later
//         setCurrentExpenseData({
//             id: id,
//             amount: expense.amount,
//             category: expense.category?.name || '',
//             description: expense.description || '',
//             date: formattedDate
//         });
        
//         // Open the dialog
//         setDialogOpen(true);
//     };

//     const handleDelete = (expense, id) => {
//         const type = "transaction";
//         deleteItem(id, type);
//     };

//     const handleExpenseFormSubmit = async (formData, isEdit) => {
//         // console.log("category in ideted fromat is:",formData.category)
//         console.log("formdata is:",formData)
//         try {
//           if (isEdit && currentExpenseData?.id) {
//             // Handle edit - send PATCH request with the correct structure
//             const response = await axios.patch(
//               "/api/transaction",
//               {
//                 transactionId: currentExpenseData.id,
//                 amount: formData.amount,
//                 category: formData.category,
//                 description: formData.description,
//                 date: new Date(formData.date).toISOString(),
//               },
//               { withCredentials: true }
//             );
           
            
//             if (response.data.error) {
//               throw new Error(response.data.error);
//             }
            
//             // Refresh expenses after update since the API doesn't return the updated transaction
//             const refreshResponse = await axios.get("/api/transaction", { withCredentials: true });
//             const sortedTransactions = [...refreshResponse.data.transactions].sort((a, b) =>
//               new Date(b.date) - new Date(a.date)
//             );
//             setExpenses(sortedTransactions);
            
//             toast({
//               title: "Success",
//               description: response.data.success || "Expense updated successfully",
//             });
//           } else {
//             // Handle add - send POST request
//             const response = await axios.post(
//               "/api/transaction",
//               {
//                 ...formData,
//                 date: new Date(formData.date).toISOString(),
//               },
//               { withCredentials: true }
//             );
            
//             if (response.data.error) {
//               throw new Error(response.data.error);
//             }
            
//             // Add new expense to the state
//             setExpenses(prevExpenses => [response.data.newTransaction, ...prevExpenses]);
            
//             toast({
//               title: "Success",
//               description: "Expense added successfully",
//             });
//           }
//           // Reset form and close dialog
//           setCurrentExpenseData(null);
//           setDialogOpen(false);
//         } catch (error) {
//           toast({
//             variant: "destructive",
//             title: "Error",
//             description: error.message || "Something went wrong",
//             action: <ToastAction altText="Try again">Try again</ToastAction>,
//           });
//         }
//       };

//     const PaginationButtons = () => {
//         return (
//             <div className="flex gap-1">
//                 {renderPaginationButtons(currentPage, setCurrentPage, filteredExpenses, totalPages)}
//             </div>
//         );
//     };

//     return (
//         <Card className="w-full h-full">
//             <CardHeader className="pb-2">
//                 <CardTitle className="text-xl font-bold">Detailed Expenses</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="h-full flex flex-col justify-between">
//                     <div className="space-y-2 overflow-y-auto flex-1">
//                         {currentExpenses.length > 0 ? (
//                             currentExpenses.map((expense) => (
//                                 <SingleExpense
//                                     key={expense._id}
//                                     category={expense.category?.name}
//                                     date={expense.date}
//                                     amount={expense.amount}
//                                     description={expense.description}
//                                     onEdit={() => handleEdit(expense, expense._id)}
//                                     onDelete={() => handleDelete(expense, expense._id)}
//                                 />
//                             ))
//                         ) : (
//                             <div className="flex items-center justify-center h-full text-muted-foreground">
//                                 No expenses found
//                             </div>
//                         )}
//                     </div>
//                     {filteredExpenses.length > ITEMS_PER_PAGE && (
//                         <div className="flex justify-center items-center gap-1 pt-4">
//                             <PaginationButtons />
//                         </div>
//                     )}
//                 </div>
//             </CardContent>
            
//             {/* ExpenseFormDialog for both adding and editing */}
//             <ExpenseFormDialog 
//                 open={dialogOpen} 
//                 setOpen={setDialogOpen}
//                 isEdit={!!currentExpenseData}
//                 initialData={currentExpenseData}
//                 handleExpenseFormSubmit={handleExpenseFormSubmit}
//             />
//         </Card>
//     );
// };

// const SingleExpense = ({ category, date, amount, description, onEdit, onDelete }) => {
//     return (
//         <Card className="p-2.5">
//             <div className="flex flex-col">
//                 <div className="flex items-center justify-between">
//                     <div className="flex-1 flex justify-between">
//                         <h3 className="font-medium text-sm">{category || "Uncategorized"}</h3>
//                         <div className="flex gap-8 pr-8 text-sm text-gray-500">
//                             <span>₹{amount}</span>
//                             <span>{new Date(date).toLocaleDateString()}</span>
//                         </div>
//                     </div>
//                     <div className="flex gap-2">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={onEdit}
//                         >
//                             <Pencil className="h-4 w-4" />
//                         </Button>
//                         <AlertDialog>
//                             <AlertDialogTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="h-8 w-8 text-red-500 hover:text-red-600"
//                                 >
//                                     <Trash2 className="h-4 w-4" />
//                                 </Button>
//                             </AlertDialogTrigger>
//                             <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                     <AlertDialogTitle>Are you sure you want to delete this expense?</AlertDialogTitle>
//                                     <AlertDialogDescription>
//                                         This action cannot be undone.
//                                     </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                     <AlertDialogAction className='bg-darkorange hover:bg-darkerorange' onClick={onDelete}>Delete</AlertDialogAction>
//                                 </AlertDialogFooter>
//                             </AlertDialogContent>
//                         </AlertDialog>
//                     </div>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                     {description || "No description"}
//                 </div>
//             </div>
//         </Card>
//     );
// };

// export default PaginatedExpenses;


import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';
import { ExpenseContext } from "@/context/ExpenseContext";
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteItem from '@/helper/deleteItem';
import renderPaginationButtons from "@/helper/renderPaginationButtons";
import ExpenseFormDialog from './ExpenseFormDialog';

const ITEMS_PER_PAGE = 8;

const PaginatedExpenses = ({ selectedCategories = [], selectedDate }) => {
    const { expenses, setExpenses } = useContext(ExpenseContext);
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [currentExpenseData, setCurrentExpenseData] = useState(null);
    const navigate=useNavigate();

    // Function to check if a date matches the selected date
    const isDateMatch = (expenseDate, selectedDate) => {
        if (!selectedDate) return true; // If no date selected, include all dates
        
        const expenseLocalDate = new Date(expenseDate).toLocaleDateString();
        const selectedLocalDate = new Date(selectedDate).toLocaleDateString();
        return expenseLocalDate === selectedLocalDate;
    };

    // Filter expenses based on both selected categories and date
    const filteredExpenses = expenses.filter(expense => {
        const categoryMatch = selectedCategories.length === 0 || 
            selectedCategories.includes(expense.category?.name || "Uncategorized");
        const dateMatch = isDateMatch(expense.date, selectedDate);
        return categoryMatch && dateMatch;
    });

    const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

    // Reset to first page when category or date selection changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedDate]);

    //get all expenses and sort by date 
    useEffect(() => {
        const getExpense = async () => {
            try {
                const response = await axios.get("/api/transaction", { withCredentials: true });
                if (response.data.error) {
                    navigate("/login");
                    return;
                }
                const sortedTransactions = [...response.data.transactions].sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                );
                setExpenses(sortedTransactions);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.response.data.error,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                if (error.response.status === 401) {
                    navigate("/login");
                }
            }
        };
        getExpense();
    }, []);

    // const handleEdit = (expense,id) => {
    //     console.log('Edit reminder:', id);
    //     <ExpenseFormDialog open={open} setOpen={setOpen} category={expense.category} amount={expense.amount} description={expense.description} date={expense.date} />
    // };
    const handleEdit = (expense, id) => {
        // Format the date for the input field (YYYY-MM-DD)
        console.log("date before formatting :",expense.date)
        const formattedDate = expense.date ? new Date(expense.date).toISOString().split('T')[0] : '';
        console.log("date after formatting :",formattedDate)
        // Set the current expense data with its ID for updating later
        setCurrentExpenseData({
            id: id,
            amount: expense.amount,
            // category: expense.category?.name || '',
            category: expense.category || '',
            description: expense.description || '',
            date: formattedDate
        });
        console.log("category of expense",expense.category)
        // Open the dialog
        setOpen(true);
    };


    const handleDelete = (expense,id) => {
        console.log("id of deleted item is:", id);
        console.log("deleted expense is", expense);
        const type = "transaction";
        deleteItem(id, type,null,setExpenses);
    };

    const PaginationButtons = () => {
        return (
            <div className="flex gap-1">
                {renderPaginationButtons(
                    currentPage, 
                    setCurrentPage, 
                    filteredExpenses, 
                    totalPages)}
            </div>
        );
    };

    return (
        <Card className="w-full h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Detailed Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-full flex flex-col justify-between">
                    <div className="space-y-2 overflow-y-auto flex-1">
                        {currentExpenses.length > 0 ? (
                            currentExpenses.map((expense) => (
                                <SingleExpense
                                    key={expense.id}
                                    category={expense.category?.name}
                                    date={expense.date}
                                    amount={expense.amount}
                                    description={expense.description}
                                    onEdit={() => handleEdit(expense,expense._id)}
                                    onDelete={() => handleDelete(expense,expense._id)}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No expenses found
                            </div>
                        )}
                    </div>
                    {filteredExpenses.length > ITEMS_PER_PAGE && (
                        <div className="flex justify-center items-center gap-1 pt-4">
                            <PaginationButtons />
                        </div>
                    )}
                </div>
            </CardContent>
            <ExpenseFormDialog 
                open={open} 
                setOpen={setOpen}
                isEdit={!!currentExpenseData}
                currentExpenseData={currentExpenseData}
                setCurrentExpenseData={setCurrentExpenseData}
                
            />
            {/*If currentExpenseData exists,
isedit becomes → true, meaning the form is in edit mode.initialData is set to currentExpenseData, so the form pre-fills with existing expense details. */}
        </Card>
    );
};

const SingleExpense = ({ category, date, amount, description, onEdit, onDelete }) => {
    return (
        <Card className="p-2.5">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between">
                        <h3 className="font-medium text-sm">{category || "Uncategorized"}</h3>
                        <div className="flex gap-8 pr-8 text-sm text-gray-500">
                            <span>₹{amount}</span>
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete this expense?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-darkorange hover:bg-darkerorange' onClick={onDelete}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    {description || "No description"}
                </div>
            </div>
        </Card>
    );
};

export default PaginatedExpenses;
