"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SingleTabContent, { TabsType } from "./single-tab-content";

function DashTabs({ mensData, womensData }: any) {
  // TO DO: add TabsType here - figure out IDE errs
  const [activeTab, setActiveTab] = useState<any>("all");
  console.log(activeTab);

  console.log('womensData', womensData);

  return (
    <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="australian-open">Australian Open</TabsTrigger>
        <TabsTrigger value="french-open">French Open</TabsTrigger>
        <TabsTrigger value="wimbledon">Wimbledon</TabsTrigger>
        <TabsTrigger value="us-open">US Open</TabsTrigger>
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
