import { useEffect, useState } from "react";
import {
  ChampionInfo,
  SlamData,
  getDataFilteredBySlam,
  getTopTenPlayerChartData,
} from "../utils";

// TO DO: need to import types from jotai
// export type TourType = "mens" | "womens";

interface TabContent {
  tabData: ChampionInfo[] | undefined;
  isLoading: boolean;
}

const useGetTabContent = (
  tour: string,
  tabValue: string,
  mensData: SlamData[],
  womensData: SlamData[]
): TabContent => {
  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setTourData] = useState<SlamData[]>();
  const [tabData, setTabData] = useState<ChampionInfo[] | undefined>(undefined);

  useEffect(() => {
    // Function to handle data fetching and loading state
    const fetchData = () => {
      setIsLoading(true);

      if (tour === "womens") {
        setTourData(womensData);
      } else {
        setTourData(mensData);
      }

      setIsLoading(false);
    };

    if (tour && tabValue && mensData && womensData) {
      fetchData();
    }
  }, [tour, tabValue, mensData, womensData]);

  useEffect(() => {
    // Check if tourData is defined
    if (tourData !== undefined && tabValue) {
      if (tabValue === "all") {
        const topTenChartData = getTopTenPlayerChartData(tourData);
        setTabData(topTenChartData);
      } else {
        const filteredTourneyData = getDataFilteredBySlam(tabValue, tourData);
        const topTenChartByTourneyData =
          getTopTenPlayerChartData(filteredTourneyData);
        setTabData(topTenChartByTourneyData);
      }
    }
  }, [tabValue, tourData]);

  return {
    tabData,
    isLoading,
  };
};

export default useGetTabContent;
