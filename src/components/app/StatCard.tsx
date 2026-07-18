import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  trend?: "up" | "down" | "neutral";
};

const StatCard = ({ title, value, change, trend = "neutral" }: StatCardProps) => {
  return (
    <Card className="surface-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          {trend === "up" && <TrendingUp className="h-3 w-3 status-success" />}
          {trend === "down" && <TrendingDown className="h-3 w-3 status-error" />}
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
