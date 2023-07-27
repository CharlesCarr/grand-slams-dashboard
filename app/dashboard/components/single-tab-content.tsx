"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import useGetTabContent from "../hooks/useGetTabContent";
import { Overview } from "./overview";
import { RecentSlams } from "./recent-slams";
import {
  ChampionInfo,
  SlamData,
  getFinalAppearances,
  getTabDisplayName,
} from "../utils";
import { useAtomValue } from "jotai";
import { tourAtom } from "./tourSelect";
import { useEffect } from "react";
import Link from "next/link";

export type TabsType =
  | "all"
  | "australian-open"
  | "french-open"
  | "wimbledon"
  | "us-open";

interface SingleTabContentProps {
  tabValue: TabsType;
  mensData: SlamData[];
  womensData: SlamData[];
}

function SingleTabContent({
  tabValue,
  mensData,
  womensData,
}: SingleTabContentProps) {
  const tour = useAtomValue(tourAtom);
  const { tabData, isLoading } = useGetTabContent(
    tour,
    tabValue,
    mensData,
    womensData
  );

  useEffect(() => {
    console.log("tabData changed:", tabData);
  }, [tabData]);

  // TO DO: Change loader to the tinted / dark tab/card that I have seen before
  if (isLoading) return <p>Loading...</p>;

  return (
    <TabsContent value={tabValue} className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {tabData?.slice(0, 4).map((player: ChampionInfo, index: number) => {
          return (
            <Card key={index}>
              <CardHeader className="hidden sm:flex flex-row items-center justify-between space-y-0 sm:pb-2">
                <CardTitle className="text-sm font-medium">
                  {`#${index + 1}`}
                </CardTitle>
                <p>{player.nationality}</p>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-xl font-bold flex pt-5 sm:pt-0">
                  <span className="block sm:hidden mr-2">{`${
                    index + 1
                  }.`}</span>
                  <Link href={`/player/${player.id}`}>{player.playerName}</Link>
                  <span className="font-normal ml-2 sm:ml-0">{`  - ${player.titles} titles`}</span>
                </div>
                <p className="ml-6 sm:ml-0 text-xs text-muted-foreground">
                  {`${getFinalAppearances(
                    mensData,
                    womensData,
                    player.playerName,
                    tour,
                    tabValue
                  )} ${
                    tabValue === "all" ? "major" : getTabDisplayName(tabValue)
                  } final appearances.`}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 sm:col-span-4">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {tabData && <Overview chartData={tabData} />}
          </CardContent>
        </Card>
        <Card className="col-span-1 sm:col-span-3">
          <CardHeader>
            <CardTitle>Recent Slams</CardTitle>
            <CardDescription>
              Short description on recent slams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSlams
              tour={tour}
              tabValue={tabValue}
              mensData={mensData}
              womensData={womensData}
            />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

export default SingleTabContent;
