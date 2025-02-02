import React, { useEffect, useState } from "react"
import { createContext } from "react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast";

export const ReminderContext = createContext({});

export function ReminderContextProvider({children}){
    const {toast} = useToast()

    const [reminder,setReminder]= useState([])

    return(
        <ReminderContext.Provider value={{reminder,setReminder}} >
        {children}
        </ReminderContext.Provider>
    )
}