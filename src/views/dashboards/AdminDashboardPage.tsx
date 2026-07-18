import { Brain, Calendar, ClipboardCheck, ArrowUpRight, Sparkles, Shield, UserCheck, Activity, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Line, ComposedChart } from "recharts";

const statsData = [
  { title: "Daily Active Users", value: "1,248", change: "+8.4% vs last week", trend: "up" },
  { title: "Today's Revenue", value: "₹3.8L", change: "+11% vs weekly avg", trend: "up" },
  { title: "Open Support Tickets", value: "14", change: "-3 vs yesterday", trend: "up" },
  { title: "SLA Compliance", value: "97%", change: "On target (95% SLA)", trend: "neutral" },
];

const operationalAreas = [
  { id: "SYS-01", area: "Teleconsultation Video Pipeline", owner: "Care Tech Dev", health: "Healthy", checkTime: "10 min ago" },
  { id: "SYS-02", area: "Subscription Billing Engine", owner: "Finance Systems", health: "Warning", checkTime: "22 min ago" },
  { id: "SYS-03", area: "Practitioner Queue Manager", owner: "Care Operations", health: "Healthy", checkTime: "12 min ago" },
  { id: "SYS-04", area: "Blog & CMS Publisher", owner: "Content Team", health: "Healthy", checkTime: "35 min ago" },
  { id: "SYS-05", area: "Auth & Role Access Gateway", owner: "Security Team", health: "Healthy", checkTime: "5 min ago" },
];

const analyticsData = [
  { day: "Mon", users: 1050, revenue: 2.8 },
  { day: "Tue", users: 1120, revenue: 3.1 },
  { day: "Wed", users: 1180, revenue: 3.4 },
  { day: "Thu", users: 1150, revenue: 3.2 },
  { day: "Fri", users: 1248, revenue: 3.8 },
  { day: "Sat", users: 950, revenue: 2.5 },
];

const chartConfig = {
  users: { label: "Active Users", color: "hsl(var(--primary))" },
  revenue: { label: "Revenue (₹ Lakhs)", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

const AdminDashboardPage = () => {
  const [areas, setAreas] = useState(operationalAreas);

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "Healthy":
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" variant="outline">{health}</Badge>;
      case "Warning":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 animate-pulse" variant="outline">{health}</Badge>;
      case "Alert":
        return <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 animate-bounce" variant="outline">{health}</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800" variant="outline">{health}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">Admin Command Center</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">System Governance Overview</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Platform operations are running smoothly. System load and api latency are within target ranges.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <Button variant="outline" asChild className="w-full sm:w-auto justify-center">
            <Link href="/admin/audit-logs">
              <Terminal className="h-4 w-4 mr-2" />
              Audit Logs
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto justify-center">
            <Link href="/admin/users">
              <UserCheck className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            trend={item.trend as "up" | "neutral" | "down"}
          />
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        {/* System Areas */}
        <Card className="surface-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>System Area Statuses</CardTitle>
              <CardDescription>Real-time telemetry and service health checks</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost">
              <Link href="/admin/support-tickets" className="text-primary text-xs flex items-center gap-1">
                View Support Tickets
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System Module</TableHead>
                    <TableHead>Department Lead</TableHead>
                    <TableHead>Operational Health</TableHead>
                    <TableHead>Telemetry Check</TableHead>
                    <TableHead className="text-right">Diagnostics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areas.map((area) => (
                    <TableRow key={area.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-sm text-foreground">{area.area}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{area.owner}</TableCell>
                      <TableCell>{getHealthBadge(area.health)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{area.checkTime}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href="/admin/reports">Diagnose</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Stacked List View */}
            <div className="block md:hidden space-y-3">
              {areas.map((area) => (
                <div key={area.id} className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{area.checkTime}</span>
                    {getHealthBadge(area.health)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{area.area}</p>
                    <p className="text-xs text-muted-foreground">Lead: {area.owner}</p>
                  </div>
                  <div className="flex justify-end pt-2 border-t border-border/40">
                    <Button size="sm" variant="secondary" asChild className="w-full sm:w-auto">
                      <Link href="/admin/reports">Diagnose</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Governance AI Co-Pilot */}
        <Card className="surface-panel flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Operations Co-Pilot
              </CardTitle>
              <CardDescription>AI alerts on platform billing & onboarding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full">SLA Warning</span>
                  <span className="text-[10px] text-muted-foreground">Billing Gateway</span>
                </div>
                <p className="text-sm text-foreground font-medium">Stripe Webhook Latency</p>
                <p className="text-xs text-muted-foreground">
                  Stripe webhook fulfillment delay has increased to 4.2 seconds (vs normal 0.8s). Open connections pool is hitting limits. Database write locks require optimization.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">Onboarding</span>
                  <span className="text-[10px] text-muted-foreground">Practitioners</span>
                </div>
                <p className="text-sm text-foreground font-medium">Credential Verification Pending</p>
                <p className="text-xs text-muted-foreground">
                  4 new doctor profile registration documents have been verified by AI automated checks and are awaiting admin manual verification and sign-off.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Button variant="outline" className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1" asChild>
              <Link href="/admin/roles">
                <Shield className="h-4 w-4" />
                Open Access Controls
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Recharts Analytics Widget */}
      <section className="grid grid-cols-1 gap-4">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Platform Growth Telemetry</CardTitle>
            <CardDescription>Daily active users compared against platform revenue streams</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area dataKey="users" fill="var(--color-users)" fillOpacity={0.15} stroke="var(--color-users)" strokeWidth={2} name="Daily Active Users" />
                  <Line dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} dot={{ r: 6 }} name="Revenue (₹ Lakhs)" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
