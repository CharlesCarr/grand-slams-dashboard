"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SingleTabContent, { TabsType } from "./single-tab-content";

function DashTabs({ mensData, womensData }: any) {
  // TO DO: add TabsType here - figure out IDE errs
  const [activeTab, setActiveTab] = useState<any>("all");

  return (
    <Tabs value={activeTab} className="sm:space-y-4" onValueChange={setActiveTab}>
      <TabsList className="w-full sm:w-fit">
        <TabsTrigger value="all" className="text-xs sm:text-base">All</TabsTrigger>
        <TabsTrigger value="australian-open" className="text-xs sm:text-base">Australian Open</TabsTrigger>
        <TabsTrigger value="french-open" className="text-xs sm:text-base">French Open</TabsTrigger>
        <TabsTrigger value="wimbledon" className="text-xs sm:text-base">Wimbledon</TabsTrigger>
        <TabsTrigger value="us-open" className="text-xs sm:text-base">US Open</TabsTrigger>
      </TabsList>
      <SingleTabContent
        tabValue={activeTab}
        mensData={mensData}
        womensData={womensData}
      />
    </Tabs>
  );
}

export default DashTabs;
