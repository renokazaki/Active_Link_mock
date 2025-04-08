"use client";
import { WeeklyTarget } from "@/shared/types/type";
import { Clock } from "lucide-react";

interface WeeklyProgressProps {
  weeklyData: WeeklyTarget[];
}

export function WeeklyProgress({ weeklyData }: WeeklyProgressProps) {
  return (
    <div className="space-y-8">
      {weeklyData.map((goal, index) => {
        // Calculate days remaining
        const startDate = new Date(goal.startDate);
        const endDate = new Date(goal.endDate);
        const today = new Date();
        const totalDays = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const daysElapsed = Math.ceil(
          (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const daysRemaining = Math.max(0, totalDays - daysElapsed);

        return (
          <div
            key={index}
            className="space-y-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-900/20">
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{goal.goal}</h3>
                  <p className="text-sm text-slate-400">{goal.description}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
              <span className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></div>
                Started: {goal.startDate}
              </span>
              <div className="flex items-center bg-slate-900/50 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 text-slate-400 mr-1" />
                <span className="text-slate-300">
                  {daysRemaining} days left
                </span>
              </div>
              <span className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></div>
                Due: {goal.endDate}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
