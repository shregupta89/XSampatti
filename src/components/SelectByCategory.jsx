import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ExpenseContext } from "@/context/ExpenseContext";

export const CategorySelector = ({ selectedCategories, onCategoryToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { expenses } = useContext(ExpenseContext);

  // Extract unique categories from expenses
  const uniqueCategories = [...new Set(expenses.map(expense =>
    expense.category?.name || "Uncategorized"
  ))].sort();

  // Filter categories based on search query
  const filteredCategories = uniqueCategories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full shadow-sm h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Select by Category</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid gap-2 overflow-y-auto max-h-[calc(100vh-250px)]">
          {filteredCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent/50'
              }`}
            >
              <span className="text-sm font-medium capitalize">{category}</span>
            </button>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No categories found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelector;