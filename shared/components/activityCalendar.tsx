"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { ActivityData, FriendData } from "@/lib/data";
import { Award, Flame, Star } from "lucide-react";
import { ActivityDetail } from "./activityDetail";
import { friendsData } from "@/lib/data";

interface ActivityCalendarProps {
  activityData: ActivityData[];
  friendId?: string;
}

export function ActivityCalendar({
  activityData,
  friendId,
}: ActivityCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendData | null>(null);

  useEffect(() => {
    setMounted(true);
    if (friendId) {
      const friend = friendsData.find((f) => f.id === friendId);
      setSelectedFriend(friend || null);
    } else {
      setSelectedFriend(friendsData[0]);
    }
  }, [friendId]);

  const getActivityLevel = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const activity = activityData.find((a) => a.date === dateString);
    return activity ? activity.value : 0;
  };

  const renderDay = (day: Date) => {
    if (!mounted) {
      return (
        <div className="h-10 w-10 p-0 font-normal rounded-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {format(day, "d")}
          </div>
        </div>
      );
    }

    const activityLevel = getActivityLevel(day);
    const isSelected =
      date && format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
    const isToday =
      format(new Date(), "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

    let bgGradient = "";
    if (activityLevel > 0) {
      if (activityLevel < 3)
        bgGradient = "bg-gradient-to-br from-purple-500/30 to-pink-500/30";
      else if (activityLevel < 6)
        bgGradient = "bg-gradient-to-br from-purple-500/50 to-pink-500/50";
      else if (activityLevel < 9)
        bgGradient = "bg-gradient-to-br from-purple-500/70 to-pink-500/70";
      else bgGradient = "bg-gradient-to-br from-purple-500 to-pink-500";
    }

    return (
      <div
        className={cn(
          "h-10 w-10 p-0 font-normal rounded-full flex items-center justify-center relative transition-all duration-200",
          bgGradient,
          isSelected &&
            "ring-2 ring-pink-500 ring-offset-2 ring-offset-slate-900",
          isToday && !isSelected && "ring-2 ring-purple-500",
          activityLevel > 0 && "cursor-pointer hover:scale-105"
        )}
        onClick={() => {
          if (activityLevel > 0) {
            setDate(day);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center">
          {format(day, "d")}
        </div>
      </div>
    );
  };

  const selectedDateActivity = getActivityLevel(date);

  const generateActivities = (count: number, date: Date) => {
    if (!selectedFriend) return [];

    const activities = [];
    const baseTime = new Date(date);
    baseTime.setHours(9, 0, 0);

    const activityTypes = selectedFriend.activityTypes;
    const icons = [
      <Flame key="flame" className="h-4 w-4 text-orange-400" />,
      <Award key="award" className="h-4 w-4 text-amber-400" />,
      <Star key="star-purple" className="h-4 w-4 text-purple-400" />,
      <Star key="star-emerald" className="h-4 w-4 text-emerald-400" />,
      <Star key="star-blue" className="h-4 w-4 text-blue-400" />,
    ];

    for (let i = 0; i < Math.min(count, activityTypes.length); i++) {
      const activityTime = new Date(baseTime);
      activityTime.setHours(activityTime.getHours() + i * 2);

      activities.push({
        id: i,
        name: activityTypes[i].name,
        icon: icons[i % icons.length],
        time: format(activityTime, "H:mm"),
        duration: activityTypes[i].duration,
        completed: Math.random() > 0.3,
      });
    }

    return activities;
  };

  const activities =
    selectedDateActivity > 0
      ? generateActivities(selectedDateActivity, date)
      : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
            className="rounded-md border border-slate-700/50 bg-slate-800/30 text-white p-3"
            classNames={{
              day_selected: "bg-transparent text-white",
              day_today: "bg-transparent text-white",
              day: "text-slate-400 hover:bg-slate-700 hover:text-white transition-colors",
              head_cell: "text-slate-300 font-medium",
              caption: "text-white font-semibold",
              nav_button:
                "border border-slate-700/50 bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors",
              table: "border-collapse space-y-1",
              cell: "text-center p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              row: "flex w-full mt-2",
            }}
            components={{
              Day: ({ date: day }) => renderDay(day),
            }}
          />
        </div>

        <div className="md:w-1/2">
          <ActivityDetail
            date={date}
            activityLevel={selectedDateActivity}
            activities={activities}
          />
        </div>
      </div>
    </div>
  );
}
