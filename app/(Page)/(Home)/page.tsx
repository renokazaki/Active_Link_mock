"use client";

import { StatsCard } from "@/shared/components/StatsCard";
import { PageHeader } from "@/shared/components/PageHeader";
import { ActivityTabs } from "@/shared/components/ActivityTabs";

import { FriendData } from "@/lib/data";

import { friendsData } from "@/lib/data";
import { Activity, LineChart, Flame, Trophy, Award } from "lucide-react";

// 活動データの型定義
export interface ActivityData {
  date: string;
  duration: number; // 分単位
  description: string;
}

const myData: FriendData = friendsData[0];
export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center"></div>
        <PageHeader>Your Page</PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="活動日数"
            value={myData.stats.totalActivities}
            icon={Activity}
            subtitle={{
              value: myData.stats.activitiesThisWeek,
              label: "今月",
              icon: Trophy,
              color: "emerald",
            }}
          />

          <StatsCard
            title="活動時間"
            value={`${myData.stats.completionRate}%`}
            icon={LineChart}
            trend={{
              value: myData.stats.completionTrend,
              label: "前月比",
              icon: myData.stats.completionTrend > 0 ? Trophy : Activity,
              isPositive: myData.stats.completionTrend > 0,
            }}
          />

          <StatsCard
            title="連続日数"
            value={`${myData.stats.currentStreak} days`}
            icon={Flame}
            subtitle={{
              value: myData.stats.bestStreak,
              label: "最大連続日数",
              icon: Award,
              color: "amber",
            }}
          />
        </div>

        <ActivityTabs friend={myData} />
      </div>
    </div>
  );
}
