import { useState, useEffect } from 'react';

export function useTimeSlots(duration:number) {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const createTimeSlots = (interval: number) => {
      const startTime = 19 * 60; // 8 AM in minutes
      const endTime = 22 * 60; // 10 PM in minutes
      const totalSlots = Math.floor((endTime - startTime) / interval);

      const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours % 12 || 12;
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
      });

      setTimeSlots(slots);
    };

    createTimeSlots(duration);
  }, [duration]);

  return { timeSlots};
}