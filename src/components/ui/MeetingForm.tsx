

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import { CalendarDays, Clock, MoveUpRight } from "lucide-react";
import { useMentorContext } from "@/contexts/Context";
import { useTimeSlots } from "@/hooks/useTimeSlots";

interface MeetingFormProps {
  mentor: any;
}

export default function MeetingForm({ mentor }: MeetingFormProps) {
  const [duration, setDuration] = useState<number>(30);
  const { addSchedule } = useMentorContext();
  const { timeSlots } = useTimeSlots(duration);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormState = () => ({
    date: new Date(),
    timeSlot: "",
    email: "",
    mentorname: mentor.name,
    name: "",
    duration: duration,
  });

  const [form, setForm] = useState(initialFormState());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = toast.loading('Booking your appointment...');

    // Format the date
    const formattedDate = form.date.toISOString().split('T')[0];

    // Format the time slot
    const [time, period] = form.timeSlot.split(' ');
    let [hours, minutes] = time.split(':');
    if (period === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12);
    } else if (period === 'AM' && hours === '12') {
      hours = '00';
    }
    const formattedTimeSlot = `${hours}:${minutes}:00`;

    const scheduleData = {
      ...form,
      date: formattedDate,
      timeSlot: formattedTimeSlot,
      mentorId: mentor.id,
    };

    try {
      await addSchedule(scheduleData);
      toast.success('Appointment booked successfully! Check your email', { id: toastId });
      setForm(initialFormState());
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-lg">
          Book Now <MoveUpRight className="w-5 h-5 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Book Appointment with{" "}
              <span className="text-primary">{mentor.name}</span>
            </DialogTitle>
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
                      onSelect={(date) => setForm({ ...form, date:date || new Date() })}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border p-2"
                    />
                  </div>
                  <div>
                    <div className="flex flex-row items-center justify-between gap-3">
                      <h2 className="flex gap-2 items-center mb-3">
                        <Clock className="text-primary h-5 w-5" />
                        Select Time Slot
                      </h2>
                      <Select
                        onValueChange={(value) => setDuration(Number(value))}
                      >
                        <SelectTrigger className="w-1/3 h-8">
                          <SelectValue placeholder="30" />
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
                      className="grid grid-cols-2 md:grid-cols-1 gap-2 border 
                    rounded-lg p-4"
                    >
                      {timeSlots?.map((item) => (
                        <div
                          key={item}
                          onClick={() => setForm({ ...form, timeSlot: item })}
                          className={`p-2 border cursor-pointer
                        text-center hover:bg-primary hover:text-white
                        rounded-full
                        ${
                          item === form.timeSlot
                            ? "bg-primary text-white"
                            : "bg-white text-primary"
                        }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    type="text"
                  />
                  <Input
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    type="email"
                    className="w-[91%]"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-3">
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Book'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}