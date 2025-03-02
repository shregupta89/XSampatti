// import { Button } from "@/components/ui/button";
// import {Dialog,DialogTrigger,} from "@/components/ui/dialog";
// import ReminderBox from "./ReminderBox";

// const AddReminder = (props) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" className="w-40 bg-darkorange hover:bg-darkerorange">
//           Add Reminder
//         </Button>
//       </DialogTrigger>
//       <ReminderBox pay={props.pay}/>
//     </Dialog>
//   );
// };

// export default AddReminder;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReminderBox from "./ReminderBox";

const AddReminder = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-40 bg-darkorange hover:bg-darkerorange"
          onClick={() => setOpen(true)}
        >
          Add Reminder
        </Button>
      </DialogTrigger>
      <ReminderBox pay={props.pay} setOpen={setOpen} />
    </Dialog>
  );
};

export default AddReminder;
