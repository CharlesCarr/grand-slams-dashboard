"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as TooltipReCharts,
  XAxis,
  YAxis,
} from "recharts";
import { ChampionInfo } from "../utils";
import { useEffect, useState } from "react";

interface OverviewProps {
  chartData: ChampionInfo[];
}

export function Overview({ chartData }: OverviewProps) {
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const getLastName = (fullName: string) => {
    const names = fullName.split(" ");
    return names[names.length - 1];
  };

  const handleBarMouseEnter = (data: any, index: number) => {
    setTooltipData(data);
  };

  const handleBarMouseLeave = () => {
    setTooltipData(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Define the breakpoint width (e.g., 768px)
    };

    handleResize(); // Check the initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderBars = isSmallScreen
    ? chartData.slice(0, 5) // Display only the first 5 data points on small screens
    : chartData;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={renderBars}>
        <XAxis
          dataKey="playerName"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          interval={0} // Adjust the interval to display every player name
          tickFormatter={getLastName} // Display only the last name on the X-axis
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <TooltipReCharts
          cursor={{ fill: "transparent" }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-gray-300 shadow-sm bg-black font-sans text-gray-300 py-3 px-4 text-xs flex flex-col gap-2">
                  <p>{label}</p>
                  <p>Titles: {payload[0].value}</p>
                </div>
              );
            }
            return null;
          }}
          active={tooltipData}
        />
        <Bar
          dataKey="titles"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          onMouseEnter={handleBarMouseEnter}
          onMouseLeave={handleBarMouseLeave}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
