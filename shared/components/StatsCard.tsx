import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    icon: LucideIcon;
    isPositive: boolean;
  };
  subtitle?: {
    value: string | number;
    label: string;
    icon: LucideIcon;
    color: string;
  };
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
}: StatsCardProps) {
  return (
    <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-purple-900/20 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium text-slate-300">
            {title}
          </CardTitle>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-white">{value}</div>
        {trend && (
          <div className="flex items-center mt-2">
            <div
              className={cn(
                "text-sm font-medium flex items-center",
                trend.isPositive ? "text-emerald-400" : "text-red-400"
              )}
            >
              <div
                className={cn(
                  "rounded-full p-1 mr-2",
                  trend.isPositive ? "bg-emerald-400/20" : "bg-red-400/20"
                )}
              >
                <trend.icon className="h-3 w-3" />
              </div>
              {trend.isPositive ? "+" : ""}
              {trend.value}
              {trend.label}
            </div>
          </div>
        )}
        {subtitle && (
          <div className="flex items-center mt-2">
            <div
              className={cn(
                "text-sm font-medium flex items-center",
                `text-${subtitle.color}-400`
              )}
            >
              <div
                className={cn(
                  "rounded-full p-1 mr-2",
                  `bg-${subtitle.color}-400/20`
                )}
              >
                <subtitle.icon
                  className={cn("h-3 w-3", `text-${subtitle.color}-400`)}
                />
              </div>
              {subtitle.value} {subtitle.label}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
