import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Activity() {
  return (
    <div className='px-4 sm:px-10 mt-10'>
        <h2 className='font-bold text-2xl'>Appointment History</h2>
        <Tabs defaultValue="upcoming" className="w-full mt-5">
            <TabsList className="w-full">
                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                <TabsTrigger value="expired">Past Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
            </TabsContent>
            <TabsContent value="expired">
            </TabsContent>
        </Tabs>
    </div>
  )
}