"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ExpenseContext } from "@/context/ExpenseContext"
import { useMemo, useContext } from 'react'

const chartConfig = {
  desktop: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
}

export function BarGraph() {
  const { expenses } = useContext(ExpenseContext);

  const chartData = useMemo(() => {
    // Initialize all days with 0
    const daysOfWeek = {
      'Sun': 0,
      'Mon': 0,
      'Tue': 0,
      'Wed': 0,
      'Thu': 0,
      'Fri': 0,
      'Sat': 0
    };

    // Calculate total amount for each day
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      daysOfWeek[dayName] += expense.amount;
    });

    // Convert to array format needed by the chart
    return Object.entries(daysOfWeek).map(([day, amount]) => ({
      month: day,
      desktop: amount
    }));
  }, [expenses]);

  return (
    <Card className="w-full h-auto">
      <CardHeader className="pb-2 pt-4 space-y-0">
        <CardTitle className="text-sm font-medium">Daily expenses</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            className="w-full h-full"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={3}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Day
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.month}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Amount
                          </span>
                          <span className="font-bold">
                            ₹{payload[0].payload.desktop.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar 
              dataKey="desktop" 
              fill="hsl(var(--chart-1))" 
              radius={[8, 8, 0, 0]} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// "use client"
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// const chartData = [
//   { month: "Mon", desktop: 186 },
//   { month: "Tue", desktop: 305 },
//   { month: "Wed", desktop: 237 },
//   { month: "Thur", desktop: 73 },
//   { month: "Fri", desktop: 209 },
//   { month: "Sat", desktop: 214 },
//   { month: "Sun", desktop: 214 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// }

// export function BarGraph() {
//   return (
//     <Card className="w-full h-auto">
//       <CardHeader className="pb-2 pt-4 space-y-0">
//         <CardTitle className="text-sm font-medium">Daily expenses</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[200px]">
//         <ChartContainer config={chartConfig} className="w-full h-full">
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             className="w-full h-full"
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={3}
//               axisLine={false}
//               tickFormatter={(value) => value}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }