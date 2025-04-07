import { ActivityCalendar } from "@/shared/components/Calender";
import ActiveButton from "./components/ActiveButton";
import { ActivityGraph } from "@/shared/components/Graph";

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

const myData: FriendDetail = {
  id: "3",
  name: "自分",
  status: "active",
  lastActive: "2分前",
  bio: "プログラミングが趣味です。",
  interests: ["TypeScript", "React", "Next.js"],
  activities: [
    { date: "2025-04-01", duration: 120, description: "Next.jsの学習" },
    { date: "2025-04-03", duration: 90, description: "TypeScriptの練習" },
  ],
};

export default function Home() {
  return (
    <div className="container max-w-3/4 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">活動管理</h1>
      <ActiveButton />

      <div className="flex flex-col gap-12">
        <ActivityCalendar activityData={myData.activities} />
        <ActivityGraph activityData={myData.activities} />
      </div>
    </div>
  );
}
