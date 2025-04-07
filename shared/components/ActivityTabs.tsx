import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ActivityCalendar } from "./activityCalendar";
import { ActivityGraph } from "./activityGraph";
import { WeeklyProgress } from "./activityProgress";
import { friendsData } from "@/lib/data";

interface ActivityTabsProps {
  friend: (typeof friendsData)[number];
}

export function ActivityTabs({ friend }: ActivityTabsProps) {
  return (
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
            <CardTitle className="text-white">Activity Calendar</CardTitle>
            <CardDescription className="text-slate-400">
              View {friend.name}&apos;s activity history by date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityCalendar activityData={friend.activityData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="graphs" className="space-y-6">
        <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Activity Trends</CardTitle>
            <CardDescription className="text-slate-400">
              Track {friend.name}&apos;s progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityGraph activityData={friend.activityData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="weekly" className="space-y-6">
        <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Weekly Progress</CardTitle>
            <CardDescription className="text-slate-400">
              See {friend.name}&apos;s weekly activity breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyProgress weeklyData={friend.weeklyData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
