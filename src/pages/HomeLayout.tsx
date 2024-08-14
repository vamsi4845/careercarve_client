import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <Sidebar />
    <div className="flex flex-col">
      <Header />
      <Outlet/>
    </div>
  </div>
  );
}