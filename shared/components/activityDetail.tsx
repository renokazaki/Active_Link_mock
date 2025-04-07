import { format } from "date-fns";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Clock, CheckCircle2 } from "lucide-react";

interface ActivityDetailProps {
  date: Date;
  activityLevel: number;
  activities: Array<{
    id: number;
    name: string;
    icon: React.ReactNode;
    time: string;
    duration: string;
    completed: boolean;
  }>;
}

export function ActivityDetail({
  date,
  activityLevel,
  activities,
}: ActivityDetailProps) {
  return (
    <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            {format(date, "EEEE, MMMM d, yyyy")}
          </h3>
        </div>

        {activityLevel > 0 ? (
          <>
            <div className="space-y-3 mt-4">
              <h4 className="text-sm font-medium text-slate-300 mb-2">
                今日のアクティビティ
              </h4>
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
                      {activity.completed && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 ml-2" />
                      )}
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
              この日のアクティビティは記録されていません。
            </p>
            <p className="text-sm text-slate-500 mt-1">
              アクティビティを始めましょう！
            </p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity">
              アクティビティを追加
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
