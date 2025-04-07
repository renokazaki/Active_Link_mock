"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ActivityData } from "@/lib/data";
import { Award, Flame, Star, Clock, CheckCircle2 } from "lucide-react";

interface ActivityCalendarProps {
  activityData: ActivityData[];
}

export function ActivityCalendar({ activityData }: ActivityCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  // Function to get activity level for a specific date
  const getActivityLevel = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const activity = activityData.find((a) => a.date === dateString);
    return activity ? activity.value : 0;
  };

  // Fix the calendar selection issue by ensuring the date state is properly updated and used
  // Replace the renderDay function with this updated version:

  const renderDay = (day: Date) => {
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
          isToday && !isSelected && "ring-2 ring-purple-500"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          {format(day, "d")}
        </div>
      </div>
    );
  };

  // Get activity level for the selected date
  const selectedDateActivity = getActivityLevel(date);

  // Generate mock activities for the selected date
  const generateActivities = (count: number, date: Date) => {
    const activities = [];
    const baseTime = new Date(date);
    baseTime.setHours(9, 0, 0);

    const activityTypes = [
      {
        name: "Morning Run",
        icon: <Flame className="h-4 w-4 text-orange-400" />,
        duration: "30 min",
      },
      {
        name: "Gym Workout",
        icon: <Award className="h-4 w-4 text-amber-400" />,
        duration: "45 min",
      },
      {
        name: "Meditation",
        icon: <Star className="h-4 w-4 text-purple-400" />,
        duration: "15 min",
      },
      {
        name: "Reading",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
        duration: "60 min",
      },
      {
        name: "Coding Practice",
        icon: <Star className="h-4 w-4 text-blue-400" />,
        duration: "90 min",
      },
    ];

    for (let i = 0; i < Math.min(count, 5); i++) {
      const activityTime = new Date(baseTime);
      activityTime.setHours(activityTime.getHours() + i * 2);

      activities.push({
        id: i,
        name: activityTypes[i].name,
        icon: activityTypes[i].icon,
        time: format(activityTime, "h:mm a"),
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
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border border-slate-700/50 bg-slate-800/30 text-white p-3"
            classNames={{
              day_selected: "bg-transparent text-white",
              day_today: "bg-transparent text-white",
              day: "text-slate-400 hover:bg-slate-700 hover:text-white",
              head_cell: "text-slate-500",
              caption: "text-white",
              nav_button:
                "border border-slate-700/50 bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white",
              table: "border-collapse space-y-1",
              cell: "text-center p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              row: "flex w-full mt-2",
            }}
            components={{
              Day: ({ date: day }) => renderDay(day),
            }}
          />
          <div className="flex items-center justify-center space-x-6 text-sm mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-500/30 to-pink-500/30"></div>
              <span className="text-slate-400">Low</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-500/50 to-pink-500/50"></div>
              <span className="text-slate-400">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-500/70 to-pink-500/70"></div>
              <span className="text-slate-400">High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <span className="text-slate-400">Very High</span>
            </div>
          </div>
        </div>

        {/* Activity details for selected date */}
        <div className="md:w-1/2">
          <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  {format(date, "EEEE, MMMM d, yyyy")}
                </h3>
              </div>

              {selectedDateActivity > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Activity level:</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-6 mx-0.5 rounded-full",
                            i < selectedDateActivity
                              ? "bg-gradient-to-t from-purple-500 to-pink-600"
                              : "bg-slate-700"
                          )}
                          style={{ height: `${Math.min(24, 12 + i * 3)}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-2"></h4>
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center p-3 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800/80 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center mr-3">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white flex items-center">
                            {activity.name}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center justify-between mt-1">
                            <span>{activity.time}</span>
                            <span className="bg-slate-900/50 px-2 py-0.5 rounded-full text-slate-300">
                              {activity.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900/50 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400">
                    No activities recorded for this day.
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Time to get moving!
                  </p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Add Activity
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
