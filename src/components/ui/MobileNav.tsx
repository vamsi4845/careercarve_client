import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { History,  Menu, Telescope, } from "lucide-react";
import { Link } from "react-router-dom";
export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="p-0" >
        <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <div className="flex h-20 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <img src="/logo.png" alt="logo" className="h-12 w-full" />
            </div>
          </Link>
        </SheetHeader>
        <nav className="grid items-start px-2 text-base font-medium lg:px-4">
            <Link
              to="/"
              className={`flex text-xl items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Telescope />
              Explore
            </Link>
            <Link
              to="/activity"
              className={`flex text-xl items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary ${
                location.pathname === "/orders" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <History />
              Activity
            </Link>
          </nav>
      </SheetContent>
    </Sheet>
  );
}
