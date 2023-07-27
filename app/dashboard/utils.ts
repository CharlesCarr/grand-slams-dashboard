export interface SlamData {
  id: string;
  champion: string;
  champion_id: string;
  ctry_champion: string;
  ctry_runner_up: string;
  major_number: number;
  runner_up: string;
  runner_up_id: string;
  score_in_final: string;
  seed_champion: number;
  seed_runner_up: number;
  year: number;
}

export interface ChampionInfo {
  id: string;
  playerName: string;
  titles: number;
  nationality: string;
}

export const getSlamInfo = (slamNum: number) => {
  let slamInfo;

  switch (slamNum) {
    case 1:
      slamInfo = {
        abbr: "AO",
        tournament: "Australian Open",
        tab: "australian-open",
      };
      break;
    case 2:
      slamInfo = {
        abbr: "FO",
        tournament: "French Open",
        tab: "french-open",
      };
      break;
    case 3:
      slamInfo = {
        abbr: "W",
        tournament: "Wimbledon",
        tab: "wimbledon",
      };
      break;
    case 4:
      slamInfo = {
        abbr: "UO",
        tournament: "US Open",
        tab: "us-open",
      };
      break;
    default:
      slamInfo = {
        abbr: "all",
        tournament: "All Grand Slams",
        tab: "all",
      };
  }

  return slamInfo;
};

// Mapping function to convert tab values to display names
export const getTabDisplayName = (tab: string) => {
  switch (tab) {
    case "all":
      return "All";
    case "australian-open":
      return "Australian Open";
    case "french-open":
      return "French Open";
    case "wimbledon":
      return "Wimbledon";
    case "us-open":
      return "US Open";
    default:
      return "Unknown";
  }
};

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
  console.log("tabVale", tabValue, "slamNum", slamNum);
  console.log("slamData", slamData);

  const filteredSlamData = slamData.filter((slam: SlamData) => {
    return slamNum === slam.major_number;
  });

  return filteredSlamData;
};

export const getLastFourData = (tabValue: string, slamData: SlamData[]) => {
  const LAST_FOUR_SLAMS = -4;

  const filteredData = getDataFilteredBySlam(tabValue, slamData);
  const sortedByYear = filteredData.sort((a, b) => a.year - b.year);
  const lastFour = sortedByYear.slice(LAST_FOUR_SLAMS);

  return lastFour;
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
      result.push({
        id: data.champion_id,
        playerName: data.champion,
        titles: 1,
        nationality: data.ctry_champion,
      });
    }
    return result;
  }, []);

  // Sort this array from most to least titles and then return top ten
  const topTenChampions = championsArray
    .sort((a, b) => b.titles - a.titles)
    .slice(0, 10);

  return topTenChampions;
};

export const getFinalAppearances = (
  mensData: SlamData[],
  womensData: SlamData[],
  playerName: string,
  tour: string,
  tabValue: string
) => {
  const tourData: SlamData[] = tour === "mens" ? mensData : womensData;
  const slamsWithPlayerInFinals = tourData.filter(({ champion, runner_up }) => {
    return champion === playerName || runner_up === playerName;
  });

  let totalFinals;

  if (tabValue !== "all") {
    const filteredBySlam = slamsWithPlayerInFinals.filter((slam) => {
      const { tab } = getSlamInfo(slam.major_number);
      return tab === tabValue;
    });
    totalFinals = filteredBySlam.length;
  } else {
    totalFinals = slamsWithPlayerInFinals.length;
  }

  return totalFinals;
};
