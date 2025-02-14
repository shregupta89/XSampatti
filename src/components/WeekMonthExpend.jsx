import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const WeekMonthExpend = ({heading,amt,desc}) => {
  return (
    <div>
      <Card className=" h-25 w-full ">
      <CardHeader className="pb-2 pt-4 space-y-0">
        <CardTitle className="text-md font-bold">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="">
            <h3>{amt}</h3>
            <p>{desc}</p>
      </CardContent>
    </Card>
      
    </div>
  )
}

export default WeekMonthExpend
