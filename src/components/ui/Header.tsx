import MobileNav from "./MobileNav";
import { Search } from "lucide-react";
import { Input } from "./input";
import { UserButton } from "@clerk/clerk-react";
import { useMentorContext } from "@/contexts/Context";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Header() {
  const { setSearchQuery } = useMentorContext();
  const[inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <header className="flex h-20 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNav />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search By Expertise, Name, Company"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserButton/>
    </header>
  );
}