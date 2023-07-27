import React from "react";
import SeedButton from "./components/seed-btn";
import supabase from "@/utils/supabase";

export const revalidate = 0;

async function Page() {
    // MENS:
//   const { data: atp_players } = await supabase.from("atp_players").select();
//   const { data: all_atp_finals } = await supabase.from("grand_slam_mens").select();
    // WOMENS:
const { data: wta_players } = await supabase.from('wta_players').select();
  const { data: all_wta_finals } = await supabase.from("grand_slam_womens").select();


  return (
    <div className="w-full max-w-lg mx-auto flex justify-center items-center">
      <h1>Admin Page</h1>
      <SeedButton players={wta_players} finals={all_wta_finals} />
    </div>
  );
}

export default Page;
