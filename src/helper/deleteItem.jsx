import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';

const deleteItem = async (id, type, filterRemindersById, setExpenses = null,setReminder=null) => {
  try {
    const response = await axios.delete(`/api/${type}/${id}`, { withCredentials: true });

    if (response.data.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return false;
    } 

    toast({
      title: "Deleted successfully",
      description: `${type} was deleted`,
    });

    // Handle different types of deletions
    if (type === "reminder") {
      filterRemindersById(id);
      // setReminder(prevReminders => prevReminders.filter(reminder => reminder._id !== id));
    } else if (type === "transaction" && setExpenses) {
      // Update expenses state by filtering out the deleted transaction
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
    }

    return true;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error.response?.data?.error || error.message,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
    return false;
  }
};

export default deleteItem;