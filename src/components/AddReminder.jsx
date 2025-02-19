import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ReminderContext } from "@/context/ReminderContext";
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
