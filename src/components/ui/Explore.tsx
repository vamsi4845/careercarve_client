import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Badge } from "./badge";
import MeetingForm from "./MeetingForm";
import { useMentorContext } from "@/contexts/Context";

export default function Explore() {
    const { mentors } = useMentorContext();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6 p-6">
            {mentors.map((mentor) => (
                <Card key={mentor.id} className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="p-0">
                        <img
                            src="/mba.jpg"
                            alt={`${mentor.name}`}
                            className="w-full h-auto aspect-video object-cover rounded-t-lg"
                        />
                    </CardHeader>
                    <CardContent className="mt-4 flex flex-col gap-3">
                        <h2 className="font-bold text-xl">{mentor.name}</h2>
                        <p className="text-primary text-sm font-semibold">Experience: {mentor.yoe} years</p>
                        <div className="flex flex-wrap gap-2">
                            {mentor.areasOfExpertise.map((area) => (
                                <Badge key={area} variant="secondary" className="text-xs px-2 py-1">
                                    {area}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {mentor.companies.map((company) => (
                                <Badge key={company} variant="outline" className="text-xs px-2 py-1">
                                    {company}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                        <MeetingForm mentor={mentor}/>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}