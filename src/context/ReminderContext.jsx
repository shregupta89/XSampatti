// import React, { useEffect, useState } from "react"
// import { createContext } from "react"
// import axios from "axios"
// import { useToast } from "@/hooks/use-toast";

// export const ReminderContext = createContext();

// export function ReminderContextProvider({children}){
//     const [reminder,setReminder]= useState([])
//     return(
//         <ReminderContext.Provider value={{reminder,setReminder}} >
//         {children}
//         </ReminderContext.Provider>
//     )
// }

import React, { useEffect, useState } from "react"
import { createContext } from "react"
import axios from "axios"

export const ReminderContext = createContext();

export function ReminderContextProvider({children}){
    const [reminder, setReminder] = useState(() => {
        // Try to get reminders from localStorage on initial load
        const savedReminders = localStorage.getItem('reminders');
        return savedReminders ? JSON.parse(savedReminders) : [];
    });

    // Whenever reminder changes, save to localStorage
    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminder));
    }, [reminder]);

    return(
        <ReminderContext.Provider value={{reminder, setReminder}}>
            {children}
        </ReminderContext.Provider>
    )
}