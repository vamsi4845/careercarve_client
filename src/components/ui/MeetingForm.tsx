import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import { CalendarDays, Clock, MoveUpRight } from "lucide-react";
import { useMentorContext } from "@/contexts/Context";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { useNavigate } from 'react-router-dom';
import { Mentor } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function MeetingForm({ mentor }: { mentor: Mentor }) {
  const navigate = useNavigate();
  const [duration, setDuration] = useState<number>(30);
  const { addSchedule } = useMentorContext();
  const { timeSlots } = useTimeSlots(duration);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormState = () => ({
    date: new Date(),
    timeSlot: "",
    email: "",
    name: "",
    duration: duration,
  });

  const [form, setForm] = useState(initialFormState());

  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    setIsFormValid(
      !!form.date && !!form.timeSlot && !!form.email && !!form.name
    );
  }, [form]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      const newDuration = Number(e);
      setDuration(newDuration);
      setForm(prevForm => ({ ...prevForm, duration: newDuration }));
    } else {
      setForm({ ...form, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = toast.loading('Booking your appointment...');

    // Format the date
    const formattedDate = form.date.toLocaleDateString('en-CA'); // This will format the date as YYYY-MM-DD

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
      // Redirect to activity page after a short delay
      setTimeout(() => {
        navigate('/activity');
      }, 1500); // 1.5 seconds delay to allow the user to see the success message
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-3 rounded-lg">
          Book Now <MoveUpRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Book Appointment with{" "}
              <span className="text-primary font-bold">{mentor.name}</span>
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="flex items-center text-sm font-medium">
                      <CalendarDays className="text-primary h-4 w-4 mr-2" />
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(date) => setForm({ ...form, date: date || new Date() })}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                      className="rounded-md border p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-0">
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center text-sm font-medium">
                        <Clock className="text-primary h-4 w-4 mr-2" />
                        Select Time Slot
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Select
                              onValueChange={handleFormChange}
                              value={duration.toString()}
                            >
                              <SelectTrigger className="w-24 h-8">
                                <SelectValue placeholder={duration.toString()} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="30">30 min</SelectItem>
                                  <SelectItem value="45">45 min</SelectItem>
                                  <SelectItem value="60">60 min</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select meeting duration</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 gap-2 border rounded-lg p-[15px]  overflow-y-auto">
                      {timeSlots?.length > 0 ? (
                        timeSlots.map((item) => (
                          <div
                            key={item}
                            onClick={() => setForm({ ...form, timeSlot: item })}
                            className={`p-2 border cursor-pointer text-center text-sm
                              hover:bg-primary hover:text-white rounded-md transition-colors
                              ${item === form.timeSlot ? "bg-primary text-white" : "bg-white text-primary"}`}
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-center text-gray-500">No available time slots for this date.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-7">
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    type="text"
                    required
                    className="w-[93%]"
                  />
                  <Input
                    id="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    type="email"
                    required
                    className="w-[93%]"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}