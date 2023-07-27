import { Metadata } from "next";
import supabase from "@/utils/supabase";
import TourSelect from "./components/tourSelect";
import DashTabs from "./components/dash-tabs";
import { ModeToggle } from "@/components/mode-toggle";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export const revalidate = 0;

export default async function DashboardPage() {
  const { data: mensData } = await supabase.from("grand_slam_mens").select();
  const { data: womensData } = await supabase
    .from("grand_slam_womens")
    .select();

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Grand Slam Titles
          </h1>
          <div className="flex items-center gap-3">
            <TourSelect />
            <ModeToggle />
          </div>
        </div>
        <DashTabs mensData={mensData} womensData={womensData} />
      </div>
    </div>
  );
}
