import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";
import { DataTable } from "../../components/data-table";
import { MajorResult, columns } from "../../components/columns";
import { getSlamInfo } from "@/app/dashboard/utils";

export async function generateStaticParams(): Promise<any[]> {
  const { data: players, error } = await supabase
    .from("wta_players")
    .select("id");

  if (error) {
    console.error(error);
  }

  // Return empty array if no players
  if (!players) {
    return [];
  }

  console.log(players);

  return players.map(({ id }) => ({
    id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: playerData } = await supabase
    .from("wta_players")
    .select()
    .eq("id", id)
    .single();

  const { data: playerResults } = await supabase
    .from("grand_slam_womens")
    .select()
    .or(`champion_id.eq.${id},runner_up_id.eq.${id}`)
    .order("year", { ascending: true })
    .order("major_number", { ascending: true });

  if (!playerData || !playerResults) {
    notFound();
  }

  const playerResultsWithMajorName = playerResults.map((result: any) => {
    const transformedMajor = getSlamInfo(result.major_number);
    result.major_number = transformedMajor.tournament;
    const seed_champ =
      result.seed_champion > 0 ? `(${result.seed_champion})` : null;
    const seed_runner_up =
      result.seed_runner_up > 0 ? `(${result.seed_runner_up})` : "";
    result.champion = `${result.champion} ` + seed_champ;
    result.runner_up = `${result.runner_up} ` + seed_runner_up;
    return result;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
        Grand Slam Titles:
        <span className="text-muted-foreground ml-4">
          {playerData.player_name}
        </span>
      </h1>
      <DataTable columns={columns} data={playerResultsWithMajorName} />
    </div>
  );
}
