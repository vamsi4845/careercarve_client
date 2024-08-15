import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import MeetingForm from "../components/ui/MeetingForm";
import { useMentorContext } from "@/contexts/Context";

export default function Explore() {
    const { filteredMentors } = useMentorContext();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-2 p-6">
            {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out flex flex-col h-full">
                    <CardHeader className="p-0">
                        <img
                            src="/mba.jpg"
                            alt={`${mentor.name}`}
                            className="w-full h-auto aspect-video object-cover rounded-t-lg"
                        />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-grow p-4">
                        <div className="space-y-3">
                            <h2 className="font-bold text-xl">{mentor.name}</h2>
                            <p className="text-sky-400 text-sm font-semibold">Experience: {mentor.yoe} years</p>
                            <div className="flex flex-wrap gap-2">
                                {mentor.areasOfExpertise.map((area) => (
                                    <Badge key={area} variant="secondary" className="text-xs px-2 py-1 bg-gray-200 text-gray-700">
                                        {area}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {mentor.companies.map((company) => (
                                <Badge key={company} variant="outline" className="text-xs px-2 py-1 border-gray-300 text-gray-700">
                                    {company}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="p-4">
                       <MeetingForm mentor={mentor}/>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}