import React, { useEffect, useState } from "react"
import { createContext } from "react"
import axios from "axios"

export const ExpenseContext = createContext({});

export function ExpenseContextProvider({children}){
    const [expenses,setExpenses]= useState([])

    return(
        <ExpenseContext.Provider value={{expenses,setExpenses}} >
        {children}
        </ExpenseContext.Provider>
    )
}