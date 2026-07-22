"use client";

import {
  Brain,
  Calendar,
  ClipboardCheck,
  ArrowUpRight,
  Sparkles,
  Filter,
  Activity,
  Waves,
  Moon,
  Users,
  CheckCircle2,
  UserCheck,
  Clock,
  HeartPulse,
} from "lucide-react";
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const sessionsList = [
  { id: "YG-301", participant: "Niharika Sen", age: "29", routine: "Therapeutic Spine Mobility", time: "07:00 AM", status: "Attended", type: "1-on-1" },
  { id: "YG-302", participant: "Vikram Dravid", age: "43", routine: "Pranayama & Breathwork L2", time: "08:00 AM", status: "Checked in", type: "Group Class" },
  { id: "YG-303", participant: "Sonal Mishra", age: "36", routine: "Lower Back Lumbar Therapy", time: "10:30 AM", status: "Scheduled", type: "1-on-1" },
  { id: "YG-304", participant: "Ritu Goel", age: "54", routine: "Yoga Nidra & Sleep Flow", time: "06:30 PM", status: "Scheduled", type: "Group Class" },
  { id: "YG-305", participant: "Manish Joshi", age: "41", routine: "Hatha Neck & Shoulder Release", time: "07:30 PM", status: "Completed", type: "1-on-1" },
];

const weeklyPracticeData = [
  { day: "Mon", sessions: 6, attendance: 88 },
  { day: "Tue", sessions: 8, attendance: 90 },
  { day: "Wed", sessions: 9, attendance: 92 },
  { day: "Thu", sessions: 7, attendance: 89 },
  { day: "Fri", sessions: 8, attendance: 91 },
  { day: "Sat", sessions: 4, attendance: 95 },
];

const chartConfig = {
  sessions: { label: "Sessions Conducted", color: "hsl(var(--primary))" },
  attendance: { label: "Attendance Rate (%)", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

const YogaDashboardPage = () => {
  const { user, profile } = useAuth();
  const [sessions, setSessions] = useState(sessionsList);

  const instructorName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Neel Joshi";
  const instructorEmail = user?.email || "yoga@nirogi.app";
  const specialization = profile?.roleDetails?.specialization || "Spine Decompression & Tele-Yoga Specialist";

  useEffect(() => {
    const fetchLiveYogaSessions = async () => {
      if (user?.id) {
        try {
          const { data } = await supabase
            .from("yoga_sessions")
            .select("*")
            .or(`instructor_id.eq.${user.id},notes.ilike.%${instructorName}%`);

          if (data && data.length > 0) {
            const mapped = data.map((s, idx) => ({
              id: s.id.substring(0, 6).toUpperCase(),
              participant: s.patient_name || `Participant #${idx + 1}`,
              age: "32",
              routine: s.title || "Spine Decompression Routine",
              time: s.slot_time || "08:00 AM",
              status: s.status === "scheduled" ? "Checked in" : s.status,
              type: s.category || "1-on-1",
            }));
            setSessions(mapped);
          }
        } catch (err) {
          console.error("Live yoga session fetch error:", err);
        }
      }
    };

    fetchLiveYogaSessions();
  }, [user, instructorName]);

  const statsData = [
    {
      title: "Sessions Today",
      value: String(sessions.length),
      change: "+2 vs daily average",
      trend: "up" as const,
      icon: Waves,
      graphVariant: "wave" as const,
      accentColor: "emerald" as const,
    },
    {
      title: "Attendance Rate",
      value: "92%",
      change: "+4% vs last week",
      trend: "up" as const,
      icon: Users,
      graphVariant: "circle" as const,
      accentColor: "teal" as const,
    },
    {
      title: "Active Program Cohorts",
      value: "16",
      change: "Therapeutic classes",
      trend: "neutral" as const,
      icon: Activity,
      graphVariant: "bars" as const,
      accentColor: "indigo" as const,
    },
    {
      title: "Evaluations Due",
      value: "11",
      change: "This week",
      trend: "neutral" as const,
      icon: ClipboardCheck,
      graphVariant: "area" as const,
      accentColor: "amber" as const,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Attended":
      case "Completed":
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" variant="outline">{status}</Badge>;
      case "Checked in":
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 animate-pulse" variant="outline">{status}</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800" variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Dynamic Yoga Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl transition-all duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 transition-transform duration-1000 scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1400&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

        <div className="relative z-10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Waves className="h-3.5 w-3.5 mr-1 animate-pulse" />
                Therapeutic Yoga Studio
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                Studio Active ({instructorEmail})
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Namaste, {instructorName}
              </h1>
              <p className="max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                {specialization}. You are conducting <strong className="text-foreground font-bold">{sessions.length} sessions</strong> today across 1-on-1 & group classes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Button variant="outline" asChild className="w-full sm:w-auto shadow-sm hover:shadow-md transition">
              <Link href="/yoga/exercise-library">
                <Activity className="h-4 w-4 mr-2 text-emerald-600" />
                Asana Library
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto shadow-md hover:shadow-lg transition bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/yoga/yoga-routine-builder">
                <Waves className="h-4 w-4 mr-2" />
                Create Routine
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Stat Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            trend={item.trend}
            icon={item.icon}
            graphVariant={item.graphVariant}
            accentColor={item.accentColor}
          />
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="surface-panel shadow-lg border-border/80">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Waves className="h-5 w-5 text-emerald-600" />
                Today's Practice Schedule
              </CardTitle>
              <CardDescription className="text-xs">Therapeutic classes & student check-ins for {instructorName}</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost" className="hover:bg-emerald-500/10 hover:text-emerald-600">
              <Link href="/yoga/calendar" className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                View Studio Calendar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-bold">Time</TableHead>
                    <TableHead className="font-bold">Participant</TableHead>
                    <TableHead className="font-bold">Therapeutic Routine</TableHead>
                    <TableHead className="font-bold">Class Type</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-bold text-xs text-foreground whitespace-nowrap">{session.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                            {session.participant.split(" ").map((n: string) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-foreground leading-tight">{session.participant}</p>
                            <p className="text-[11px] text-muted-foreground">{session.age} yrs · #{session.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-semibold">{session.routine}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">{session.type}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" asChild variant={session.status === "Checked in" ? "default" : "outline"} className={`h-8 text-xs font-semibold ${session.status === "Checked in" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}>
                          <Link href={`/yoga/attendance?id=${session.id}`}>
                            {session.status === "Attended" || session.status === "Completed" ? "Feedback" : "Join Session"}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Yoga Pose AI Co-Pilot */}
        <Card className="surface-panel shadow-lg border-border/80 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-emerald-600 animate-pulse" />
                Asana Pose AI Co-Pilot
              </CardTitle>
              <CardDescription className="text-xs">AI flexibility & posture alignment tracking</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full">Caution Alert</span>
                  <span className="text-xs font-bold text-foreground">Vikram Dravid</span>
                </div>
                <p className="text-xs font-bold text-foreground">Cervical Spine Tilt Angle</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Pose analysis in Sarvangasana detected tilt deviation. Recommend using prop supports today.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">Mobility Gain</span>
                  <span className="text-xs font-bold text-foreground">Niharika Sen</span>
                </div>
                <p className="text-xs font-bold text-foreground">Hamstring ROM Extension (+12°)</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Active extension increased by +12 degrees over 21 days. Hip joint flexibility shows stable progression.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-2">
            <Button variant="outline" className="w-full text-xs font-bold flex items-center justify-center gap-1.5 border-border hover:bg-emerald-500/10 hover:text-emerald-600 transition" asChild>
              <Link href="/yoga/progress">
                <ClipboardCheck className="h-4 w-4" />
                View Mobility & Kinematics Trends
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Analytics Recharts Widget */}
      <section className="grid grid-cols-1 gap-6">
        <Card className="surface-panel shadow-lg border-border/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                Session Volume & Attendance Trend
              </CardTitle>
              <CardDescription className="text-xs">Classes conducted vs average participant attendance rate</CardDescription>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-semibold">
              Live Studio Telemetry
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPracticeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs font-semibold" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs font-semibold" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[6, 6, 0, 0]} name="Sessions Conducted" />
                  <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[6, 6, 0, 0]} name="Attendance Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default YogaDashboardPage;
