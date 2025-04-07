"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Clock } from "lucide-react";
// 活動データの型定義
interface ActivityData {
  date: string;
  duration: number; // 分単位
  description: string;
}

interface ActivityGraphProps {
  activityData: ActivityData[] | null;
}

export function ActivityGraph({ activityData }: ActivityGraphProps) {
  // Format data for the chart
  const chartData = activityData
    ? activityData
        .slice(-14) // Show last 14 days
        .map((item) => ({
          date: item.date,
          displayDate: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          minutes: item.duration,
        }))
    : [];

  const chartConfig = {
    minutes: {
      label: "Activity Minutes",
      color: "green",
      icon: Clock,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-center">
        <div className="h-hull w-full  md:h-2/3 md:w-2/3">
          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="displayDate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}m`}
                />
                <Bar
                  dataKey="minutes"
                  fill="green"
                  radius={[4, 4, 0, 0]}
                  cursor="pointer"
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No activity data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
