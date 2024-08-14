import React, { createContext, useState, useEffect, useContext} from 'react';
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
  setFilterCriteria: (criteria: string) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [filterCriteria, setFilterCriteria] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VERCEL_RENDER_API}/mentors`); // Adjust the API endpoint as needed
        setMentors(response.data);
        setFilteredMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, []);

  // useEffect(() => {
  //   const filtered = mentors.filter(mentor =>
  //     mentor.name.toLowerCase().includes(filterCriteria.toLowerCase())
  //   );
  //   setFilteredMentors(filtered);
  // }, [filterCriteria, mentors]);

  return (
    <MentorContext.Provider value={{ mentors, filteredMentors, setFilterCriteria }}>
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