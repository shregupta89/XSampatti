import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';

const updateItem = async (id, type, filterRemindersById) => {
  try {
    const response = await axios.patch(`/api/${type}/${id}`, { withCredentials: true });

    if (response.data.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        title: "Updated successfully",
        description: `${type} was Updated`,
      });

    //   type === "reminders" ? filterRemindersById(id) : console.log("deleted expense");
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error.response?.data?.error || error.message,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }
};

export default updateItem;