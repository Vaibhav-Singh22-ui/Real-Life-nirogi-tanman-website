import { Brain, Calendar, ClipboardCheck, ArrowUpRight, Sparkles, Filter, Activity, Waves, Moon } from "lucide-react";
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

const statsData = [
  { title: "Sessions Today", value: "9", change: "+2 vs daily average", trend: "up" },
  { title: "Attendance Rate", value: "92%", change: "+4% vs last week", trend: "up" },
  { title: "Active Program Blocks", value: "16", change: "Therapeutic classes", trend: "neutral" },
  { title: "Evaluations Due", value: "11", change: "This week", trend: "neutral" },
];

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
  const [sessions, setSessions] = useState(sessionsList);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Attended":
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" variant="outline">{status}</Badge>;
      case "Checked in":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 animate-pulse" variant="outline">{status}</Badge>;
      case "Scheduled":
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800" variant="outline">{status}</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800" variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">Yoga Instructor Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Namaste, Arjun Dev</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            You are conducting 9 therapeutic sessions today. 1 participant is checked in and waiting in the virtual studio lobby.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <Button variant="outline" asChild className="w-full sm:w-auto justify-center">
            <Link href="/yoga/exercise-library">
              <Activity className="h-4 w-4 mr-2" />
              Movement Library
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto justify-center">
            <Link href="/yoga/yoga-routine-builder">
              <Waves className="h-4 w-4 mr-2" />
              Create Routine
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
        {/* Sessions list */}
        <Card className="surface-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Today's Practice Schedule</CardTitle>
              <CardDescription>Therapeutic classes and check-in statuses</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost">
              <Link href="/yoga/calendar" className="text-primary text-xs flex items-center gap-1">
                View Calendar
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
                    <TableHead>Time</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Therapeutic Routine</TableHead>
                    <TableHead>Class Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm text-foreground">{session.time}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{session.participant}</p>
                          <p className="text-xs text-muted-foreground">{session.age} yrs · ID: {session.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-medium">{session.routine}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{session.type}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" asChild variant={session.status === "Checked in" ? "default" : "secondary"}>
                          <Link href={`/yoga/attendance?id=${session.id}`}>
                            {session.status === "Attended" || session.status === "Completed" ? "Feedback" : "Join"}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Stacked List View */}
            <div className="block md:hidden space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{session.time}</span>
                    {getStatusBadge(session.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{session.participant}</p>
                    <p className="text-xs text-muted-foreground">{session.age} yrs · {session.routine}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Class type: {session.type}</p>
                  </div>
                  <div className="flex justify-end pt-2 border-t border-border/40">
                    <Button size="sm" asChild variant={session.status === "Checked in" ? "default" : "secondary"} className="w-full sm:w-auto">
                      <Link href={`/yoga/attendance?id=${session.id}`}>
                        {session.status === "Attended" || session.status === "Completed" ? "Feedback" : "Join"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Yoga Pose AI Co-Pilot */}
        <Card className="surface-panel flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Asana Co-Pilot
              </CardTitle>
              <CardDescription>AI flexibility and posture alignment tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full">Caution Alert</span>
                  <span className="text-[10px] text-muted-foreground">Vikram Dravid</span>
                </div>
                <p className="text-sm text-foreground font-medium">Cervical Spine Compressive Load</p>
                <p className="text-xs text-muted-foreground">
                  Camera pose analysis during the last Sarvangasana (Shoulderstand) detected a 15-degree anterior pelvic tilt tilt-angle deviation, overloading cervical vertebrae. Recommend using blankets/prop supports today.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">Mobility Gain</span>
                  <span className="text-[10px] text-muted-foreground">Niharika Sen</span>
                </div>
                <p className="text-sm text-foreground font-medium">Hamstring Range of Motion</p>
                <p className="text-xs text-muted-foreground">
                  Hamstring active extension increased by +12 degrees in Paschimottanasana over 21 days. Hip joint flexibility shows stable progression. Continue mobility series.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Button variant="outline" className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1" asChild>
              <Link href="/yoga/progress">
                <ClipboardCheck className="h-4 w-4" />
                View Longitudinal Mobility Trends
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Recharts Analytics Widget */}
      <section className="grid grid-cols-1 gap-4">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Session Volume & Attendance Trend</CardTitle>
            <CardDescription>Classes conducted vs average attendance rate per day</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPracticeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[4, 4, 0, 0]} name="Sessions Conducted" />
                  <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} name="Attendance Rate (%)" />
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
