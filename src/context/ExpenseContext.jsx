import React, { useEffect, useState, createContext } from "react";

export const ExpenseContext = createContext();

export function ExpenseContextProvider({ children }) {
    const [expenses, setExpenses] = useState(() => {
        // Try to get expenses from localStorage on initial load
        const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    // Whenever expenses change, save to localStorage
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
}
