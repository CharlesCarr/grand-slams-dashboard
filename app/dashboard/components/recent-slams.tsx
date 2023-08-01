"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TabsType } from "./single-tab-content";
import { SlamData, getLastFourData, getSlamInfo } from "../utils";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const tourData: SlamData[] = tour === "mens" ? mensData : womensData;

    if (tabValue === "all") {
      // Step 1: Sort the array by year and major_number
      const sortedArray = tourData.sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year; // Sort by year in descending order
        } else {
          return b.major_number - a.major_number; // If years are equal, sort by major_number in descending order
        }
      });

      // Step 2: Filter the 4 most recent years of data
      const filteredArray = sortedArray.filter(
        (data, index) =>
          index < 3 || // First 3 elements from the current year
          (data.year === sortedArray[3].year && data.major_number === 4) // The element from the previous year with major_number 4
      );

      setRecentSlams(filteredArray);
    } else {
      const lastFour = getLastFourData(tabValue, tourData);
      setRecentSlams(lastFour);
    }
  }, [mensData, tabValue, tour, womensData]);

  return (
    <div className="h-[250px] sm:h-[75%] w-full flex flex-col justify-around">
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
                <div className="flex flex-col sm:flex-row gap-2 text-sm sm:text-base font-medium leading-none mb-2 sm:mb-0">
                  <p>{tournament}</p>
                  <Link
                    className="font-normal text-sm sm:text-base flex gap-1"
                    href={`/player/${tour}/${slamData.champion_id}`}
                  >
                    <span>{slamData.champion}</span>
                    <span className="hidden sm:flex">{` (${slamData.seed_champion})`}</span>
                  </Link>
                </div>
                <p className="hidden sm:block text-xs">
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
