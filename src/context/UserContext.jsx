import React, { useEffect, useState, createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [email, setEmail] = useState(() => {
        const savedEmail = localStorage.getItem("email");
        return savedEmail ? JSON.parse(savedEmail) : null;
    });

    const [firstname, setFirstname] = useState(() => {
        const savedFirstname = localStorage.getItem("firstname");
        return savedFirstname ? JSON.parse(savedFirstname) : null;
    });

    const [lastname, setLastname] = useState(() => {
        const savedLastname = localStorage.getItem("lastname");
        return savedLastname ? JSON.parse(savedLastname) : null;
    });

    useEffect(() => {
        localStorage.setItem("email", JSON.stringify(email));
    }, [email]);

    useEffect(() => {
        localStorage.setItem("firstname", JSON.stringify(firstname));
    }, [firstname]);

    useEffect(() => {
        localStorage.setItem("lastname", JSON.stringify(lastname));
    }, [lastname]);

    return (
        <UserContext.Provider value={{ email, setEmail, firstname, setFirstname, lastname, setLastname }}>
            {children}
        </UserContext.Provider>
    );
}
