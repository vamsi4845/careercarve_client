import { CalendarDays, Clock, MoveUpRight } from "lucide-react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Calendar } from "./calendar";
import { useState } from "react";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";

interface MeetingFormProps {
  mentor: any;
}

export default function MeetingForm({ mentor }: MeetingFormProps) {
  const { timeSlots, setDuration } = useTimeSlots(30);
  const[form,setForm] = useState({
    date:mentor.availableDate,
    timeSlot:mentor.availableTimeSlot,
    email:"",
    mentorname:mentor.name,
    name:"",
  })
  const handleChange = (e:any) => {
    setForm({...form,[e.target.id]:e.target.value})
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-lg">Book Now <MoveUpRight className="w-5 h-5 ml-2"/></Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Book Appointment with <span className="text-primary">{mentor.name}</span></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-3 md:gap-8">
                <div className="flex flex-col   gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => setForm({...form,date})}
                    disabled={(date)=>date<new Date()}
                    className="rounded-md border p-2"
                  />
                </div>
                <div>
                  <div className="flex flex-row items-center justify-between gap-3">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <Select defaultValue="30" onValueChange={(value) => setDuration(Number(value))}>
                      <SelectTrigger className="w-1/3 h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                          <SelectItem value="60">60</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div
                    className="grid grid-cols-1 gap-2 border 
                        rounded-lg p-4"
                  >
                    {timeSlots?.map((item) => (
                      <div
                        key={item}
                        onClick={()=>setForm({...form,timeSlot:item})}
                        className={`p-2 border cursor-pointer
                          text-center hover:bg-primary hover:text-white
                          rounded-full
                          ${item===form.timeSlot?"bg-primary text-white":"bg-white text-primary"}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
              <Input id="name" value={form.name} onChange={handleChange} placeholder="Enter your name" type="text"/>
              <Input id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email"className="w-[91%]"/>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
              <Button
                type="button"
                // disabled={!(date&&selectedTimeSlot)}
                onClick={() => alert("Booked")}
              >
                Book
              </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}