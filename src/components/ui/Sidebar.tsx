import {
  History,
  Telescope,

} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-20 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <img src="/logo.png" alt="logo" className="h-12 w-auto" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-base font-medium lg:px-4">
            <Link
              to="/"
              className={`flex text-xl items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Telescope className="h-5 w-5" />
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
        </div>
      </div>
    </aside>
  );
}