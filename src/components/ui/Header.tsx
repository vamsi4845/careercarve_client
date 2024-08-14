import MobileNav from "./MobileNav";
import { Search } from "lucide-react";
import { Input } from "./input";
import { UserButton } from "@clerk/clerk-react";
import { useMentorContext } from "@/contexts/Context";

export default function Header() {
  const { setSearchQuery } = useMentorContext();
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNav />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search By Expertise, Name,Company"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserButton/>
    </header>
  );
}