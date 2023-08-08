import { TableType } from "@/types/supabase";

interface ProfileInfoProps {
  playerData: TableType<"atp_players">;
  playerResults: TableType<"grand_slam_mens">[];
}

const ProfileInfo = ({ playerData, playerResults }: ProfileInfoProps) => {
  const playerTitles: number = playerResults.filter((result: any) => {
    return result.champion === playerData.player_name;
  }).length;

  const finalWinPercentage = (playerTitles / playerResults.length) * 100;

  return (
    <div className="flex w-full gap-10 py-6">
      <div>
        <p className="text-lg font-bold">Player Info:</p>
        <p>{`Name: ${playerData.player_name}`}</p>
        <p>{`Country: ${playerData.nationality}`}</p>
      </div>

      <div>
        <p className="text-lg font-bold">Grand Slam Finals Stats:</p>
        <p>{`Titles: ${playerTitles}`}</p>
        <p>{`Appearances: ${playerResults.length}`}</p>
        <p>{`Win Percentage: ${finalWinPercentage.toFixed(1)}%`}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
