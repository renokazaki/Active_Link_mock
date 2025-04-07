/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

import type { ActivityData } from "@/lib/data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
interface ActivityGraphProps {
  activityData: ActivityData[];
}

export function ActivityGraph({ activityData }: ActivityGraphProps) {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  // Process data based on selected period
  const processData = () => {
    const sortedData = [...activityData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const limit = period === "week" ? 7 : period === "month" ? 30 : 90;
    const limitedData = sortedData.slice(-limit);

    return limitedData.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(period === "year" && { year: "numeric" }),
      }),
    }));
  };

  const chartData = processData();

  // Calculate 7-day moving average for line chart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateMovingAverage = (data: any[]) => {
    return data.map((item, index) => {
      const start = Math.max(0, index - 6);
      const values = data.slice(start, index + 1).map((d) => d.value);
      const sum = values.reduce((acc, val) => acc + val, 0);
      return {
        ...item,
        average: values.length > 0 ? sum / values.length : 0,
      };
    });
  };

  const lineChartData = calculateMovingAverage(chartData);

  // // Custom tooltip styles
  // const CustomTooltip = ({ active, payload, label }: any) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="bg-slate-800 border border-slate-700/50 p-3 rounded-lg shadow-lg">
  //         <p className="text-slate-300 text-sm mb-1">
  //           {payload[0].payload.date}
  //         </p>
  //         <div className="flex items-center text-sm">
  //           <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
  //           <span className="text-white font-medium">
  //             {payload[0].value} activities
  //           </span>
  //         </div>
  //         {payload.length > 1 && (
  //           <div className="flex items-center text-sm mt-1">
  //             <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
  //             <span className="text-white font-medium">
  //               {payload[1].value.toFixed(1)} avg
  //             </span>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="space-y-6">
      <Tabs value={period} onValueChange={(value) => setPeriod(value as any)}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-full">
          <TabsTrigger
            value="week"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Month
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="area" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-full">
          <TabsTrigger
            value="area"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Area Chart
          </TabsTrigger>
          <TabsTrigger
            value="bar"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Bar Chart
          </TabsTrigger>
          <TabsTrigger
            value="line"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Line Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="area">
          <div className="h-[350px] bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 shadow-xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData}>
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
              <span className="text-slate-400">Daily Activities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
              <span className="text-slate-400">7-Day Average</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bar">
          <div className="h-[350px] bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 shadow-xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
              <span className="text-slate-400">Daily Activities</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="line">
          <div className="h-[350px] bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 shadow-xl">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#a855f7", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#ec4899", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
