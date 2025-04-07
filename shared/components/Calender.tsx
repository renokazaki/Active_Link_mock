"use client";
import { Calendar } from "@/shared/components/ui/calendar";

// 活動データの型定義
interface ActivityData {
  date: string;
  duration: number; // 分単位
  description: string;
}

interface ActivityCalendarProps {
  activityData: ActivityData[];
}

export function ActivityCalendar({ activityData }: ActivityCalendarProps) {
  // 活動日をDateオブジェクトの配列に変換
  const activityDays = activityData.map((item) => new Date(item.date));

  return (
    <div className="bg-white rounded-lg shadow py-6 ">
      <div className="flex flex-col items-center mx-auto">
        <h2 className="text-lg font-medium mb-4">活動実施日</h2>
        <Calendar
          mode="single"
          className="rounded-md border "
          modifiers={{
            hasActivity: activityDays,
          }}
          modifiersStyles={{
            hasActivity: {
              backgroundColor: "hsl(142 76% 36%)",
              color: "white",
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );
}
