import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"; // ✅ Format date properly
import { cn } from "@/lib/utils"; // ✅ ShadCN utility for styling
import { useState, useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import axios from "axios";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    desc: "",
    date: null,
  });

  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.date) {
      console.log("Date is required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/transaction",
        {
          ...formData,
          date: new Date(formData.date).toISOString(), // ✅ Ensure correct date format
        },
        { withCredentials: true } // ✅ Ensure cookies are sent
      );

      setExpenses([response.data.newTransaction, ...expenses]);

      setFormData({ amount: "", date: null, category: "", desc: "" });
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-40 bg-orange">
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add the expenditure here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              id="amount"
              className="col-span-3"
              required
            />
          </div>

          {/* ✅ FIXED DATE PICKER COMPONENT */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              type="string"
              name="category"
              value={formData.category}
              onChange={handleChange}
              id="category"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              type="string"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              id="desc"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Adding..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;
