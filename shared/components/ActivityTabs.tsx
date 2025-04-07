import { Card, CardContent } from "@/shared/components/ui/card";
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
          カレンダー
        </TabsTrigger>
        <TabsTrigger
          value="graphs"
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
        >
          グラフ
        </TabsTrigger>
        <TabsTrigger
          value="weekly"
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
        >
          週次目標
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
          <CardContent>
            <ActivityCalendar activityData={friend.activityData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="graphs" className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
          <CardContent>
            <ActivityGraph activityData={friend.activityData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="weekly" className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
          <CardContent>
            <WeeklyProgress weeklyData={friend.weeklyData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
