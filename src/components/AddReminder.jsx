import { Button } from "@/components/ui/button";
import {Dialog,DialogTrigger,} from "@/components/ui/dialog";
import ReminderBox from "./ReminderBox";

const AddReminder = (props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-40 bg-darkorange hover:bg-darkerorange">
          Add Reminder
        </Button>
      </DialogTrigger>
      <ReminderBox pay={props.pay}/>
    </Dialog>
  );
};

export default AddReminder;

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import ReminderBox from "./ReminderBox";

// const AddReminder = ({ pay, isEdit = false }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="w-40 bg-darkorange hover:bg-darkerorange">Add Reminder</Button>
//       </DialogTrigger>
//       <ReminderBox pay={pay} isEdit={isEdit} />
//     </Dialog>
//   );
// };

// export default AddReminder;