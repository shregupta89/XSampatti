import React, { useEffect, useState } from "react"
import { createContext } from "react"
import axios from "axios"

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [email,setEmail]= useState(null)
    const [firstname,setFirstname]= useState(null)
    const [lastname,setLastname]= useState(null)

    return(
        <UserContext.Provider value={{email,setEmail,firstname,setFirstname,lastname,setLastname}} >
        {children}
        </UserContext.Provider>
    )
}