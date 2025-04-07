"use client";

import { useState } from "react";
import {
  Activity,
  LineChart,
  Trophy,
  Flame,
  Award,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ActivityCalendar } from "./components/activityCalendar";
import { ActivityGraph } from "./components/activityGraph";
import { WeeklyProgress } from "./components/activityProgress";
import { friendsData } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FriendActivityTracker() {
  const [selectedFriend, setSelectedFriend] = useState(friendsData[0].id);

  const selectedFriendData = friendsData.find(
    (friend) => friend.id === selectedFriend
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Goal Crusher
              </h1>
            </div>
            <p className="text-slate-400 text-lg mt-1 ml-8">
              Track progress. Celebrate wins. Crush goals together.
            </p>
          </div>
          <div className="w-full md:w-[280px]">
            <Select value={selectedFriend} onValueChange={setSelectedFriend}>
              <SelectTrigger className="h-12 text-base bg-slate-800/80 border-slate-700/50 text-white backdrop-blur-sm">
                <SelectValue placeholder="Select a friend" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/90 border-slate-700/50 text-white backdrop-blur-sm">
                {friendsData.map((friend) => (
                  <SelectItem
                    key={friend.id}
                    value={friend.id}
                    className="py-2.5 focus:bg-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-medium">
                        {friend.name.charAt(0)}
                      </div>
                      <span>{friend.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedFriendData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-purple-900/20 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium text-slate-300">
                      Total Activities
                    </CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white">
                    {selectedFriendData.stats.totalActivities}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="text-sm text-emerald-400 font-medium flex items-center">
                      <div className="bg-emerald-400/20 rounded-full p-1 mr-2">
                        <Trophy className="h-3 w-3 text-emerald-400" />
                      </div>
                      +{selectedFriendData.stats.activitiesThisWeek} this week
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-purple-900/20 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium text-slate-300">
                      Completion Rate
                    </CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                      <LineChart className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white">
                    {selectedFriendData.stats.completionRate}%
                  </div>
                  <div className="flex items-center mt-2">
                    <div
                      className={cn(
                        "text-sm font-medium flex items-center",
                        selectedFriendData.stats.completionTrend > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full p-1 mr-2",
                          selectedFriendData.stats.completionTrend > 0
                            ? "bg-emerald-400/20"
                            : "bg-red-400/20"
                        )}
                      >
                        {selectedFriendData.stats.completionTrend > 0 ? (
                          <Trophy className="h-3 w-3" />
                        ) : (
                          <Activity className="h-3 w-3" />
                        )}
                      </div>
                      {selectedFriendData.stats.completionTrend > 0 ? "+" : ""}
                      {selectedFriendData.stats.completionTrend}% from last
                      month
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-purple-900/20 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium text-slate-300">
                      Current Streak
                    </CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                      <Flame className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white">
                    {selectedFriendData.stats.currentStreak} days
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="text-sm text-amber-400 font-medium flex items-center">
                      <div className="bg-amber-400/20 rounded-full p-1 mr-2">
                        <Award className="h-3 w-3 text-amber-400" />
                      </div>
                      Best: {selectedFriendData.stats.bestStreak} days
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="calendar" className="space-y-6">
              <TabsList className="bg-slate-800/50 border border-slate-700/50 p-1 rounded-full">
                <TabsTrigger
                  value="calendar"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Calendar View
                </TabsTrigger>
                <TabsTrigger
                  value="graphs"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Activity Graphs
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Weekly Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="space-y-6">
                <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Activity Calendar
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      View {selectedFriendData.name}&apos;s activity history by
                      date
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityCalendar
                      activityData={selectedFriendData.activityData}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graphs" className="space-y-6">
                <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Activity Trends
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Track {selectedFriendData.name}&apos;s progress over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityGraph
                      activityData={selectedFriendData.activityData}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-6">
                <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Weekly Goal Progress
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      See how {selectedFriendData.name} is progressing on weekly
                      goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WeeklyProgress
                      weeklyData={selectedFriendData.weeklyData}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
