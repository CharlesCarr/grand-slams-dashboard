"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TabsType } from "./single-tab-content";
import { SlamData, getLastFourData, getSlamInfo } from "../utils";
import { useEffect, useState } from "react";

interface RecentSlamsProps {
  tour: string;
  tabValue: TabsType;
  mensData: SlamData[];
  womensData: SlamData[];
}

const CURRENT_YEAR = 2023;

export function RecentSlams({
  tour,
  tabValue,
  mensData,
  womensData,
}: RecentSlamsProps) {
  const [recentSlams, setRecentSlams] = useState<SlamData[] | undefined>(
    undefined
  );
  console.log("recentSlams", recentSlams);

  useEffect(() => {
    const tourData: SlamData[] = tour === "mens" ? mensData : womensData;

    if (tabValue === "all") {
      const filteredSlams = tourData.filter(
        ({ year }) => year === CURRENT_YEAR
      );
      setRecentSlams(filteredSlams);
    } else {
      const lastFour = getLastFourData(tabValue, tourData);
      setRecentSlams(lastFour);
    }
  }, [mensData, tabValue, tour, womensData]);

  return (
    <div className="h-full w-full flex flex-col gap-10">
      {recentSlams
        ?.sort((a, b) => b.year - a.year)
        .map((slamData: SlamData) => {
          const { abbr, tournament } = getSlamInfo(slamData.major_number);
          return (
            <div key={slamData.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{abbr}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-base font-medium leading-none mb-2">
                  {tournament}
                  <span className="font-normal">{` - ${slamData.champion} (${slamData.seed_champion})`}</span>
                </p>
                <p className="text-xs">
                  <span className="text-muted-foreground">{` def. ${slamData.runner_up} (${slamData.seed_runner_up}) (${slamData.score_in_final})`}</span>
                </p>
              </div>
              <div className="ml-auto font-medium">{slamData.year}</div>
            </div>
          );
        })}
    </div>
  );
}
