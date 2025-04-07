"use client";

import { ActivityCalendar } from "@/shared/components/Calender";
import { ActivityGraph } from "@/shared/components/Graph";
import { useParams } from "next/navigation";

// 活動データの型定義
export interface ActivityData {
  date: string;
  duration: number; // 分単位
  description: string;
}

type FriendDetail = {
  id: string;
  name: string;
  status: "active" | "inactive";
  lastActive: string;
  bio: string;
  interests: string[];
  activities: ActivityData[]; // 活動履歴を追加
};

// 仮のデータ
const friendDetails: Record<string, FriendDetail> = {
  "1": {
    id: "1",
    name: "山田太郎",
    status: "active",
    lastActive: "2分前",
    bio: "プログラミングが趣味です。",
    interests: ["TypeScript", "React", "Next.js"],
    activities: [
      { date: "2025-04-01", duration: 120, description: "Next.jsの学習" },
      { date: "2025-04-03", duration: 90, description: "TypeScriptの練習" },
      {
        date: "2024-04-05",
        duration: 60,
        description: "Reactコンポーネント作成",
      },
      { date: "2025-04-06", duration: 120, description: "Next.jsの学習" },
      { date: "2025-04-09", duration: 90, description: "TypeScriptの練習" },
      {
        date: "2024-04-18",
        duration: 60,
        description: "Reactコンポーネント作成",
      },
    ],
  },
  "2": {
    id: "2",
    name: "鈴木花子",
    status: "inactive",
    lastActive: "1時間前",
    bio: "デザインが好きです。",
    interests: ["UI/UX", "Figma", "Photoshop"],
    activities: [
      { date: "2025-04-02", duration: 90, description: "UIデザイン作成" },
      {
        date: "2025-04-04",
        duration: 120,
        description: "Figmaプロトタイピング",
      },
      { date: "2025-04-06", duration: 60, description: "アイコン制作" },
    ],
  },
};

export default function FriendsInfo() {
  const params = useParams();
  const friendId = params.id as string;
  const friend = friendDetails[friendId];

  if (!friend) {
    return <div>友達が見つかりません</div>;
  }

  return (
    <div className="container max-w-3/4 mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{friend.name}</h1>
          <div
            className={`w-3 h-3 rounded-full ${
              friend.status === "active" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
        <p className="text-gray-500 mb-4">最終活動: {friend.lastActive}</p>
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">自己紹介</h2>
          <p>{friend.bio}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">興味・関心</h2>
          <div className="flex flex-wrap gap-2">
            {friend.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <ActivityCalendar activityData={friend.activities} />
        <ActivityGraph activityData={friend.activities} />
      </div>
    </div>
  );
}
