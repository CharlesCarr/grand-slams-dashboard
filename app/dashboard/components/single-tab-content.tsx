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
import { RecentSales } from "./recent-sales";
import { ChampionInfo, SlamData } from "../utils";
import { useAtomValue } from "jotai";
import { tourAtom } from "./tourSelect";
import { useEffect } from "react";

export type TabsType = "all" | "australian-open" | "french-open" | "wimbledon" | "us-open";

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
  console.log(tour);
  const { tabData, isLoading } = useGetTabContent(
    tour,
    tabValue,
    mensData,
    womensData
  );
  console.log(tabData);

  useEffect(() => {
    console.log("tabData changed:", tabData);
  }, [tabData]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <TabsContent value={tabValue} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tabData?.slice(0, 4).map((player: ChampionInfo, index: number) => {
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {index + 1}
                </CardTitle>
                <p>{player.nationality}</p>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{`${player.playerName} - ${player.titles} titles`}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {tabData && <Overview chartData={tabData} />}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Winners</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

export default SingleTabContent;
