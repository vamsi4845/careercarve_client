import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Mentor, Schedule } from '../types'; // Adjust the import path as needed

interface MentorContextType {
  mentors: Mentor[];
  filteredMentors: Mentor[];
  schedules: Schedule[];
  addSchedule: (schedule:any) => void;
  setSearchQuery: (query: string) => void;
  fetchUserSchedules: () => Promise<void>;
  user: ReturnType<typeof useUser>['user'];
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VERCEL_RENDER_API}/mentors`); // Adjust the API endpoint as needed
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.areasOfExpertise.some(area => area.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.companies.some(company => company.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, mentors]);

  const addSchedule = async (schedule: Omit<Schedule, 'id' | 'mentor'>): Promise<Schedule> => {
    try {
      const scheduleToSend = {
        ...schedule,
        duration: Number(schedule.duration)
      };
      const response = await axios.post<{ schedule: Schedule }>(`${import.meta.env.VITE_VERCEL_RENDER_API}/schedules`, scheduleToSend);
      return response.data.schedule;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Failed to book appointment");
      } else {
        throw new Error("An unexpected error occurred while booking");
      }
    }
  };

  const fetchUserSchedules = async () => {
    if (!user) {
      throw new Error("User is not logged in");
    }
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      throw new Error("User email not found");
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_VERCEL_RENDER_API}/schedules/by-email/${email}`);
      setSchedules(response.data.schedules);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Failed to fetch schedules");
      } else {
        throw new Error("An unexpected error occurred while fetching schedules");
      }
    }
  };

  return (
    <MentorContext.Provider value={{ 
      mentors, 
      filteredMentors, 
      schedules,
      setSearchQuery, 
      addSchedule, 
      fetchUserSchedules,
      user
    }}>
      {children}
    </MentorContext.Provider>
  );
};

export const useMentorContext = () => {
  const context = useContext(MentorContext);
  if (context === undefined) {
    throw new Error('useMentorContext must be used within a MentorProvider');
  }
  return context;
};