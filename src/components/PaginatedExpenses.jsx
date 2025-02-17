import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';
import { ExpenseContext } from "@/context/ExpenseContext";
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
import renderPaginationButtons from "@/helper/renderPaginationButtons"
const ITEMS_PER_PAGE = 8;

const PaginatedExpenses = ({ selectedCategories = [] }) => {
    const { expenses, setExpenses } = useContext(ExpenseContext);
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
   
    // Filter expenses based on selected categories
    const filteredExpenses = expenses.filter(expense => 
        selectedCategories.length === 0 || 
        selectedCategories.includes(expense.category?.name || "Uncategorized")
    );

    const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

    // Reset to first page when category selection changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories]);

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

    const handleEdit = (id) => {
        console.log('Edit reminder:', id);
    };

    const handleDelete = (id) => {
        console.log("id of deleted item is:",id)
        const type = "transaction"; 
        deleteItem(id, type);
      };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const PaginationButtons = () => {
        return (
            <div className="flex gap-1">
                {renderPaginationButtons(currentPage, setCurrentPage, filteredExpenses, totalPages)}
            </div>
        );
    };
    

    return (
        <Card className="w-full h-full">
            <CardHeader className="pb-2">
               <CardTitle className="text-xl font-bold">Detailed Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-full flex flex-col  justify-between">
                    <div className="space-y-2 overflow-y-auto flex-1">
                        {currentExpenses.length > 0 ? (
                            currentExpenses.map((expense) => (
                                <SingleExpense
                                    key={expense.id}
                                    category={expense.category?.name}
                                    date={expense.date}
                                    amount={expense.amount}
                                    description={expense.description}
                                    onEdit={() => handleEdit(expense._id)}
                                    onDelete={() => handleDelete(expense._id)}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No expenses found
                            </div>
                        )}
                    </div>
                    {filteredExpenses.length > ITEMS_PER_PAGE && (
                        <div className="flex justify-center items-center gap-1 pt-4 ">
                            <PaginationButtons />
                        </div>
                    )}
                </div>
            </CardContent>
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
                                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
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