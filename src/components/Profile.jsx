"use client"

import {useContext, useEffect} from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from "@/context/UserContext"
import { Avatar, AvatarFallback } from "./ui/avatar"
import axios from "axios"


export function Profile() {

    const {firstname,setFirstname , setLastname , setEmail , lastname,email}=useContext(UserContext)
    console.log(firstname,lastname,email);
    useEffect(()=>{
        const getProfile = async()=>{
            const response = await axios.get('/api/profile',{withCredentials:true})
            console.log(response.data);
            
            if(response.data.username){
                setEmail(response.data.username)
                setFirstname(response.data.firstname)
                setLastname(response.data.lastname)
            }
        }
        try {
            getProfile()
        } catch (error) {
            console.log(error.response.data.error);
            
        }
    },[])
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
            <AvatarFallback>{`${firstname && firstname[0]}${lastname && lastname[0]}`}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2">
      <div className="p-2 border-b">
          <p className="font-semibold">{firstname} {lastname}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
