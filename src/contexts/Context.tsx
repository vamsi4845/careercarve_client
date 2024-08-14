import React, { createContext, useState, useEffect, useContext, useMemo} from 'react';
import axios from 'axios';

export interface Mentor {
  id: string;
  name: string;
  yoe: number;
  areasOfExpertise: string[];
  companies: string[];  
  availabilities: string[];
  // Add other mentor properties as needed
}

interface MentorContextType {
  mentors: Mentor[];
  filteredMentors: Mentor[];
  addSchedule: (schedule: any) => Promise<any>;
  setSearchQuery: (query: string) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const[searchQuery,setSearchQuery] = useState<string>('');

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

  const addSchedule = async (schedule: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_VERCEL_RENDER_API}/schedules`, schedule);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to book appointment");
      } else {
        throw new Error("An unexpected error occurred while booking");
      }
    }
  };


  return (
    <MentorContext.Provider value={{ mentors, filteredMentors,setSearchQuery,addSchedule }}>
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