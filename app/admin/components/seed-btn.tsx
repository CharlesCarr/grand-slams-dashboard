"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase";

function SeedButton({ players, finals }: any) {
  const handleSeed = async (players: any, finals: any) => {
    try {
      // 1. Have all player data and all finals data
      // Loop through each final in the finals data
      for (const final of finals) {
        // either champion or runner_up
        const { runner_up } = final;

        // Find the player whose name matches the champion
        const player = players.find((p: any) => p.player_name === runner_up);

        if (player) {
          // If a matching player is found, update the grand_slam_mens table
          // with the player's ID as the champion_id
          const { data, error } = await supabase
            .from("grand_slam_womens")
            // runner_up_id
            .update({ runner_up_id: player.id })
            .eq("runner_up", runner_up);

          if (error) {
            console.error("Error updating champion_id:", error.message);
          } else {
            console.log(`Successfully updated champion_id for ${runner_up}`);
          }
        } else {
          console.warn(
            `Player with name ${runner_up} not found in the players data.`
          );
        }
      }
    } catch (error) {
      console.error("Error while seeding:", error);
    }
  };

  return (
    <Button onClick={() => handleSeed(players, finals)}>Seed Supabase</Button>
  );
}

export default SeedButton;
