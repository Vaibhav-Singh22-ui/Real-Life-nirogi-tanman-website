import React from "react";
import { TrendingDown, TrendingUp, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  graphVariant?: "ecg" | "wave" | "bars" | "area" | "circle";
  accentColor?: "emerald" | "amber" | "indigo" | "rose" | "teal" | "purple";
};

const StatCard = ({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  graphVariant = "area",
  accentColor = "emerald",
}: StatCardProps) => {

  const accentStyles = {
    emerald: {
      border: "hover:border-emerald-500/30 dark:hover:border-emerald-500/40",
      badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
      stroke: "#10b981",
      fill: "url(#emerald-grad)",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    amber: {
      border: "hover:border-amber-500/30 dark:hover:border-amber-500/40",
      badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
      stroke: "#f59e0b",
      fill: "url(#amber-grad)",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    indigo: {
      border: "hover:border-indigo-500/30 dark:hover:border-indigo-500/40",
      badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
      stroke: "#6366f1",
      fill: "url(#indigo-grad)",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
    rose: {
      border: "hover:border-rose-500/30 dark:hover:border-rose-500/40",
      badgeBg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
      stroke: "#f43f5e",
      fill: "url(#rose-grad)",
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-500/10",
    },
    teal: {
      border: "hover:border-teal-500/30 dark:hover:border-teal-500/40",
      badgeBg: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
      stroke: "#14b8a6",
      fill: "url(#teal-grad)",
      iconColor: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-500/10",
    },
    purple: {
      border: "hover:border-purple-500/30 dark:hover:border-purple-500/40",
      badgeBg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
      stroke: "#a855f7",
      fill: "url(#purple-grad)",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/10",
    },
  }[accentColor];

  return (
    <Card className={`relative overflow-hidden surface-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accentStyles.border}`}>
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
          {Icon && (
            <div className={`p-2 rounded-xl ${accentStyles.iconBg} ${accentStyles.iconColor} shadow-inner shrink-0`}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <p className="text-3xl font-bold tracking-tight text-foreground font-['Manrope',sans-serif]">{value}</p>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${accentStyles.badgeBg}`}>
            {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
            {trend === "down" && <TrendingDown className="h-3 w-3 text-rose-600 dark:text-rose-400" />}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
