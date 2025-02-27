import React, { useState, useContext,useEffect } from 'react';
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
  IndianRupee
} from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import ExpenseFormDialog from './ExpenseFormDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const QuickActions = () => {
  let [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { expenses } = useContext(ExpenseContext);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    console.log("hi there from quick actions");
  
    let uniqueCategories = [...new Set(expenses.map(expense => 
      expense.category.name
    ))].sort();
    
    console.log("Unique Categories:", uniqueCategories);
  
    // Filter based on search query
    let filtered = uniqueCategories.filter(category =>
      category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setFilteredCategories(filtered); // ✅ Update state properly
  
  }, [expenses, searchQuery]); // ✅ Re-run when expenses or searchQuery change
  
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

    const IconComponent = bestMatch ? categoryMap[bestMatch] : IndianRupee;
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
        <div className="grid grid-cols-3 gap-4 h-full overflow-y-auto ">
          {filteredCategories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <div key={category} className="aspect-square">
                <Dialog>
                <DialogTrigger asChild>
                <button
                  className="w-full h-full flex items-center justify-center rounded-xl hover:bg-accent/50 transition-colors border border-border "
                  onClick={() => {
                    setOpen(true)
                    setSelectedCategory(category);
                    console.log("selected category",selectedCategory)
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-1  ">
                    <div className="p-2 m-2 rounded-lg bg-yellow/30 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-darkorange" />
                    </div>
                    <span className=" truncate text-sm font-medium capitalize text-center mb-1">
                      {category}
                    </span>
                  </div>
                </button>
                </DialogTrigger>
                <ExpenseFormDialog open={open} setOpen={setOpen} category={selectedCategory} />
              </Dialog>
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