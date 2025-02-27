import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { useNavigate } from 'react-router-dom'
  import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { ExpenseContext } from "@/context/ExpenseContext";

const WeekMonthExpend = ({heading,amt,desc,type}) => {
  const [totalSum,setTotalSum]=useState()
  const navigate=useNavigate()
  const { toast } = useToast();
  const { expenses } = useContext(ExpenseContext);
 
  useEffect(()=>{
    const getAmount=async()=>{
        try{
          const response=await axios.get(`/api/transaction/${type}`,{withCredentials:true});
          if(response.data.error){
            navigate("/login");
            return;
          }
          setTotalSum(response.data.totalAmount)
          // console.log("in weekly and monthly expenditure",response.data.totalAmount);

        }catch (error) {
          toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong in fetching the weekly and monthly total expenditure.",
              description: error.response.data.error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          if (error.response.status === 401) {
              navigate("/login");
          }
      }
    }
    // console.log("Expenses updated, fetching new data", expenses);
    getAmount();
  },[expenses])
  return (
    <div>
      <Card className=" h-25 w-full ">
      <CardHeader className="pb-2 pt-4 space-y-0">
        <CardTitle className="text-md font-bold">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="">
            <h3>₹ {totalSum}</h3>
            <p className='text-sm text-gray-500 pt-1'>{desc}</p>
      </CardContent>
    </Card>
      
    </div>
  )
}

export default WeekMonthExpend
