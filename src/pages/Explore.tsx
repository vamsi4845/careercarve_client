import { useMentorContext } from "@/contexts/Context";
import MentorCard from "@/components/MentorCard";

export default function Explore() {
    const { filteredMentors } = useMentorContext();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-2 p-6">
            {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor}/>
            ))}
        </div>
    );
}