import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export function ExpenseContextProvider({ children }) {
    const [expenses, setExpenses] = useState([]);

    // Fetch from backend first and store in localStorage
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get("/api/transaction", { withCredentials: true });

                if (response.data && response.data.expenses) {
                    setExpenses(response.data.expenses);
                    localStorage.setItem("expenses", JSON.stringify(response.data.expenses)); // Save first-time fetch
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        // Only fetch if no local storage data exists
        // if (!localStorage.getItem("expenses")) {
            fetchExpenses();
        // } else {
        //     setExpenses(JSON.parse(localStorage.getItem("expenses"))); // Load from localStorage
        // }
    }, []);

    // Update localStorage whenever expenses change
    useEffect(() => {
        if (expenses.length > 0) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses]);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
}
