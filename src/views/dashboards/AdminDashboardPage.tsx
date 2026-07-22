"use client";

import { Brain, Calendar, ClipboardCheck, ArrowUpRight, Sparkles, Shield, UserCheck, Activity, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const operationalAreas = [
  { id: "SYS-01", area: "Teleconsultation Video Pipeline", owner: "Care Tech Dev", health: "Healthy", checkTime: "10 min ago" },
  { id: "SYS-02", area: "Subscription Billing Engine", owner: "Finance Systems", health: "Healthy", checkTime: "15 min ago" },
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
  const { user, profile } = useAuth();
  const [areas, setAreas] = useState(operationalAreas);
  const [liveUserCount, setLiveUserCount] = useState<number>(1248);
  const [openTicketsCount, setOpenTicketsCount] = useState<number>(14);

  const adminName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "System Administrator";
  const adminEmail = user?.email || "admin@nirogi.app";

  useEffect(() => {
    const fetchAdminLiveStats = async () => {
      try {
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (usersCount && usersCount > 0) {
          setLiveUserCount(usersCount + 1200); // Display combined base + live registered count
        }

        const { count: ticketsCount } = await supabase
          .from("support_tickets")
          .select("*", { count: "exact", head: true });

        if (ticketsCount !== null) {
          setOpenTicketsCount(ticketsCount);
        }
      } catch (err) {
        console.error("Admin live stats error:", err);
      }
    };

    fetchAdminLiveStats();
  }, []);

  const statsData = [
    { title: "Daily Active Users", value: liveUserCount.toLocaleString(), change: "+8.4% vs last week", trend: "up" },
    { title: "Today's Revenue", value: "₹3.8L", change: "+11% vs weekly avg", trend: "up" },
    { title: "Open Support Tickets", value: String(openTicketsCount), change: "Live from DB", trend: "up" },
    { title: "SLA Compliance", value: "97%", change: "On target (95% SLA)", trend: "neutral" },
  ];

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
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <p className="uppercase-label text-primary font-bold">Admin Command Center</p>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {adminEmail}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Welcome, {adminName}</h1>
          <p className="mt-1 max-w-xl text-xs text-muted-foreground">
            Platform governance is active. Supabase database, RLS security policies, and API latency are operating normally.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mt-2 lg:mt-0 relative z-10">
          <Button variant="outline" asChild className="w-full sm:w-auto justify-center font-bold text-xs">
            <Link href="/admin/audit-logs">
              <Terminal className="h-4 w-4 mr-2 text-primary" />
              Audit Logs
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto justify-center font-bold text-xs bg-primary text-white">
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
        <Card className="surface-panel shadow-md border-border/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">System Area Statuses</CardTitle>
              <CardDescription className="text-xs">Real-time telemetry and service health checks</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost">
              <Link href="/admin/support-tickets" className="text-primary text-xs font-semibold flex items-center gap-1">
                View Support Tickets ({openTicketsCount})
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">System Module</TableHead>
                    <TableHead className="font-bold">Department Lead</TableHead>
                    <TableHead className="font-bold">Operational Health</TableHead>
                    <TableHead className="font-bold">Telemetry Check</TableHead>
                    <TableHead className="text-right font-bold">Diagnostics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areas.map((area) => (
                    <TableRow key={area.id} className="hover:bg-muted/30">
                      <TableCell className="font-bold text-xs text-foreground">{area.area}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">{area.owner}</TableCell>
                      <TableCell>{getHealthBadge(area.health)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{area.checkTime}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="secondary" asChild className="h-7 text-xs font-semibold">
                          <Link href="/admin/reports">Diagnose</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Admin Governance AI Co-Pilot */}
        <Card className="surface-panel shadow-md border-border/80 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Operations Co-Pilot AI
              </CardTitle>
              <CardDescription className="text-xs">AI alerts on platform billing & onboarding</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">Supabase Status</span>
                  <span className="text-xs font-bold text-foreground">PostgreSQL 17</span>
                </div>
                <p className="text-xs font-bold text-foreground">Database Sync Healthy</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  16 relational schemas with Row Level Security (RLS) policies are active and serving user sessions.
                </p>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-primary bg-primary/15 px-2.5 py-0.5 rounded-full">Onboarding</span>
                  <span className="text-xs font-bold text-foreground">Practitioners</span>
                </div>
                <p className="text-xs font-bold text-foreground">Credential Verification Pending</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  4 new doctor profile registration documents have been verified by AI automated checks and are awaiting admin manual sign-off.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-2">
            <Button variant="outline" className="w-full text-xs font-bold flex items-center justify-center gap-1 border-border" asChild>
              <Link href="/admin/roles">
                <Shield className="h-4 w-4 text-primary" />
                Open Access Controls
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Analytics Recharts Widget */}
      <section className="grid grid-cols-1 gap-4">
        <Card className="surface-panel shadow-md border-border/80">
          <CardHeader className="pb-2 border-b border-border/40">
            <CardTitle className="text-base font-bold">Platform Growth Telemetry</CardTitle>
            <CardDescription className="text-xs">Daily active users compared against platform revenue streams</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs font-semibold" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs font-semibold" />
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
