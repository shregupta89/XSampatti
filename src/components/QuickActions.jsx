import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddExpense from './AddExpense';
import { ExpenseContext } from "@/context/ExpenseContext";
import {
  Music2,
  Car,
  Home,
  ShoppingCart,
  Plane,
  GamepadIcon,
  Film,
  Book,
  Shield,
  Wrench,
  Lightbulb,
  Utensils,
  CreditCard,
  Gift,
  Laptop,
  Shirt,
  DollarSign
} from "lucide-react";

const QuickActions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { expenses } = useContext(ExpenseContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract unique categories from expenses
  const uniqueCategories = [...new Set(expenses.map(expense => 
    expense.category.name
  ))].sort();

  const filteredCategories = uniqueCategories.filter(category =>
    category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get icon based on category name
  const getCategoryIcon = (categoryName) => {
    const categoryMap = {
      concert: Music2,
      travel: Plane,
      car: Car,
      home: Home,
      shopping: ShoppingCart,
      games: GamepadIcon,
      entertainment: Film,
      books: Book,
      security: Shield,
      service: Wrench,
      utilities: Lightbulb,
      food: Utensils,
      bills: CreditCard,
      gifts: Gift,
      electronics: Laptop,
      clothing: Shirt
    };

    const bestMatch = Object.keys(categoryMap).find(key => 
      categoryName.toLowerCase().includes(key.toLowerCase())
    );

    const IconComponent = bestMatch ? categoryMap[bestMatch] : DollarSign;
    return IconComponent;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  return (
    <Card className="w-full h-full shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
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
        <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-250px)]">
          {filteredCategories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <div key={category} className="aspect-square">
                <button
                  className="w-full h-full flex items-center justify-center rounded-xl hover:bg-accent/50 transition-colors border border-border "
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex flex-col items-center justify-center gap-1  ">
                    <div className="p-2 m-2 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium capitalize text-center px-2">
                      {category}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* <AddExpense
          initialCategory={selectedCategory}
          onClose={() => {
            setSelectedCategory(null);
            setIsDialogOpen(false);
          }}
          open={isDialogOpen}
        /> */}
      </CardContent>
    </Card>
  );
};

export default QuickActions;