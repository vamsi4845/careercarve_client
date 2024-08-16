import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMentorContext } from '../contexts/Context';
import { Schedule } from '../types/index';

export default function Activity() {
  const { fetchUserSchedules, schedules, user } = useMentorContext();
  
  useEffect(() => {
    fetchUserSchedules();
  }, []);

  const renderSchedule = (schedule: Schedule) => (
    <div key={schedule.id} className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-2">{schedule.studentName}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><span className="font-medium">Date:</span> {new Intl.DateTimeFormat('default', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(schedule.startTime))}</p>
        <p><span className="font-medium">Time:</span> {new Intl.DateTimeFormat('default', { timeStyle: 'short', timeZone: 'UTC' }).format(new Date(schedule.startTime))}</p>
        <p><span className="font-medium">Mentor:</span> {schedule.mentor.name}</p>
        <p><span className="font-medium">Duration:</span> {schedule.duration} min</p>
      </div>
    </div>
  );

  const renderScheduleList = (schedules: Schedule[]) => (
    <div className="w-full min-h-[300px]">
      {schedules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schedules.map(renderSchedule)}
        </div>
      ) : (
        <p className="text-lg text-center py-8">No Appointments</p>
      )}
    </div>
  );

  return (
    <div className='px-4 sm:px-10 m-10 max-w-6xl mx-auto'>
      <h2 className='font-bold text-2xl text-center mb-2'>Appointment History</h2>
      <p className='text-center text-gray-600 mb-6'>
        Showing appointments for{' '}
        <span className='text-primary font-semibold'>
          {user?.primaryEmailAddress?.emailAddress || 'Unknown User'}
        </span>
      </p>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="expired" className="flex-1">Past Appointments</TabsTrigger>
        </TabsList>
        <div className="min-h-[300px]">
          <TabsContent value="upcoming">
            {renderScheduleList(schedules.filter(schedule => new Date(schedule.startTime) > new Date()))}
          </TabsContent>
          <TabsContent value="expired">
            {renderScheduleList(schedules.filter(schedule => new Date(schedule.startTime) <= new Date()))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}