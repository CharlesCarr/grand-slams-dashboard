export interface SlamData {
  champion: string;
  ctry_champion: string;
  ctry_runner_up: string;
  major_number: number;
  runner_up: string;
  score_in_final: string;
  seed_champion: number;
  seed_runner_up: number;
  year: number;
}

export interface ChampionInfo {
  playerName: string;
  titles: number;
  nationality: string;
}

export const getDataFilteredBySlam = (
  tabValue: string,
  slamData: SlamData[]
) => {
  let slamNum: number;
  switch (tabValue) {
    case "australian-open":
      slamNum = 1;
      break;
    case "french-open":
      slamNum = 2;
      break;
    case "wimbledon":
      slamNum = 3;
      break;
    case "us-open":
      slamNum = 4;
      break;
    default:
      slamNum = 0;
  }
  console.log('tabVale', tabValue, 'slamNum', slamNum);
  console.log('slamData', slamData);

  const filteredSlamData = slamData.filter((slam: SlamData) => {
    return slamNum === slam.major_number;
  });

  return filteredSlamData;
};

export const getTopTenPlayerChartData = (
  slamData: SlamData[]
): ChampionInfo[] => {
  // Use the reduce method to create a new array with the desired format
  const championsArray = slamData.reduce((result: ChampionInfo[], data) => {
    const existingChampion = result.find(
      (champion) => champion.playerName === data.champion
    );
    if (existingChampion) {
      existingChampion.titles++;
    } else {
      result.push({ playerName: data.champion, titles: 1, nationality: data.ctry_champion });
    }
    return result;
  }, []);

  // Sort this array from most to least titles and then return top ten
  const topTenChampions = championsArray
    .sort((a, b) => b.titles - a.titles)
    .slice(0, 10);

  return topTenChampions;
};
