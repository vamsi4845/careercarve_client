export interface Mentor {
  id: string;
  name: string;
  yoe: number;
  areasOfExpertise: string[];
  companies: string[];
  availabilities: string[];
}

export interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  studentName: string;
  studentEmail: string;
  mentorId: string;
  duration: number;
  mentor: Mentor;
}