import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const ReminderContext = createContext();

export function ReminderContextProvider({ children }) {
    const [reminder, setReminder] = useState([]);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get("/api/reminders"); // Adjust API endpoint as needed
                setReminder(response.data);
                localStorage.setItem("reminders", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching reminders:", error);
                const savedReminders = localStorage.getItem("reminders");
                if (savedReminders) {
                    setReminder(JSON.parse(savedReminders));
                }
            }
        };
        fetchReminders();
    }, []);

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(reminder));
    }, [reminder , setReminder]);

    const filterRemindersById = (id) => {
        console.log(id);
        setReminder(prevReminders => {
            const filteredReminders = prevReminders.filter(reminder => reminder._id !== id);
            localStorage.setItem("reminders", JSON.stringify(filteredReminders));
            return filteredReminders;
        });
    };

    return (
        <ReminderContext.Provider value={{ reminder, setReminder, filterRemindersById }}>
            {children}
        </ReminderContext.Provider>
    );
}
