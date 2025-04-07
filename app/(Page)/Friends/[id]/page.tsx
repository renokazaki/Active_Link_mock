"use client";

import { useParams } from "next/navigation";

import { Activity, LineChart, Flame, Trophy, Award } from "lucide-react";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCard } from "@/shared/components/StatsCard";
import { ActivityTabs } from "@/shared/components/ActivityTabs";

import { friendsData } from "@/lib/data";
// 活動データの型定義
export interface ActivityData {
  date: string;
  duration: number; // 分単位
  description: string;
}

export default function FriendsInfo() {
  const params = useParams();
  const friendId = params.id as string;
  // const friend = friendDetails[friendId];

  if (!friendId) {
    return <div>友達が見つかりません</div>;
  }

  const selectedFriendData = friendsData.find(
    (friend) => friend.id === friendId
  );

  if (!selectedFriendData) {
    return <div>友達が見つかりません</div>;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto py-8 px-4 space-y-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <PageHeader>{selectedFriendData.name} Page</PageHeader>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="活動日数"
            value={selectedFriendData.stats.totalActivities}
            icon={Activity}
            subtitle={{
              value: selectedFriendData.stats.activitiesThisWeek,
              label: "今月",
              icon: Trophy,
              color: "emerald",
            }}
          />

          <StatsCard
            title="活動時間"
            value={`${selectedFriendData.stats.completionRate}%`}
            icon={LineChart}
            trend={{
              value: selectedFriendData.stats.completionTrend,
              label: "前月比",
              icon:
                selectedFriendData.stats.completionTrend > 0
                  ? Trophy
                  : Activity,
              isPositive: selectedFriendData.stats.completionTrend > 0,
            }}
          />

          <StatsCard
            title="連続日数"
            value={`${selectedFriendData.stats.currentStreak} days`}
            icon={Flame}
            subtitle={{
              value: selectedFriendData.stats.bestStreak,
              label: "最大連続日数",
              icon: Award,
              color: "amber",
            }}
          />
        </div>

        <ActivityTabs friend={selectedFriendData} />
      </div>
    </div>
  );
}
