"use client"
import type { WeeklyData } from "@/lib/data"
import { Clock, Target, CheckCircle2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeeklyProgressProps {
  weeklyData: WeeklyData[]
}

export function WeeklyProgress({ weeklyData }: WeeklyProgressProps) {
  return (
    <div className="space-y-8">
      {weeklyData.map((goal, index) => {
        const percentage = Math.round((goal.current / goal.target) * 100)

        // Determine progress color based on percentage
        let progressColor = "bg-gradient-to-r from-purple-500 to-pink-600"
        let statusIcon = <CheckCircle2 className="h-4 w-4" />
        let statusText = "On Track"
        let statusColor = "text-emerald-400"

        if (percentage < 30) {
          progressColor = "bg-gradient-to-r from-red-500 to-orange-500"
          statusIcon = <Clock className="h-4 w-4" />
          statusText = "Falling Behind"
          statusColor = "text-red-400"
        } else if (percentage < 70) {
          progressColor = "bg-gradient-to-r from-amber-500 to-orange-500"
          statusIcon = <Target className="h-4 w-4" />
          statusText = "Making Progress"
          statusColor = "text-amber-400"
        }

        // Calculate days remaining
        const startDate = new Date(goal.startDate)
        const endDate = new Date(goal.endDate)
        const today = new Date()
        const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        const daysRemaining = Math.max(0, totalDays - daysElapsed)

        return (
          <div
            key={index}
            className="space-y-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 shadow-xl hover:shadow-purple-900/10 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3 shadow-lg shadow-purple-900/20">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{goal.goal}</h3>
                  <p className="text-sm text-slate-400">{goal.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">
                  {goal.current}/{goal.target} <span className="text-sm font-normal text-slate-400">{goal.unit}</span>
                </div>
                <div className={cn("text-sm font-medium flex items-center justify-end", statusColor)}>
                  {statusIcon}
                  <span className="ml-1">{statusText}</span>
                </div>
              </div>
            </div>

            <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-1000 ease-in-out rounded-full", progressColor)}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
              <span className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></div>
                Started: {goal.startDate}
              </span>
              <div className="flex items-center bg-slate-900/50 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 text-slate-400 mr-1" />
                <span className="text-slate-300">{daysRemaining} days left</span>
              </div>
              <span className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-1.5"></div>
                Due: {goal.endDate}
              </span>
            </div>

            {/* Daily target indicator */}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-700/50">
              <div className="text-xs text-slate-400">
                Daily target: {(goal.target / totalDays).toFixed(1)} {goal.unit}/day
              </div>
              <button className="flex items-center text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors">
                <span>View Details</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

