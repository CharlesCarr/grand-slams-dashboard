import { Metadata } from "next";
import supabase from "@/utils/supabase";
import DashTabs from "./components/dash-tabs";
import DashHeader from "./components/dash-header";

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
        <DashHeader />
        <DashTabs mensData={mensData} womensData={womensData} />
      </div>
    </div>
  );
}
