"use client"
import React,{useState,useEffect,useContext} from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ExpenseContext } from "@/context/ExpenseContext";

// Define colors for different categories
const categoryColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

export function DonutChart() {
  const { expenses } = useContext(ExpenseContext);

  // Calculate category counts and prepare chart data
  const chartData = React.useMemo(() => {
    const categoryCounts = expenses.reduce((acc, expense) => {
      const category = expense.category?.name || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCounts).map(([category, count], index) => ({
      category,
      count,
      fill: categoryColors[index % categoryColors.length]
    }));
  }, [expenses]);

  // Create chart config dynamically
  const chartConfig = React.useMemo(() => {
    const config = {
      count: {
        label: "Count",
      }
    };

    chartData.forEach((item, index) => {
      config[item.category] = {
        label: item.category,
        color: categoryColors[index % categoryColors.length]
      };
    });

    return config;
  }, [chartData]);

  // Calculate total expenses
  const totalExpenses = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-60 items-center justify-center">
      <CardContent className="h-full flex-row w-full flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-full"
        >
          <PieChart className="pt-2">
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Category
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.category}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Count
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm font-bold">
        Category wise distribution
      </CardFooter>
    </Card>
  )
}