import { Brain, Calendar, ClipboardCheck, Clock, Plus, Stethoscope, Video, Users, ArrowUpRight } from "lucide-react";
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
  { title: "Patients Today", value: "18", change: "+3 vs yesterday", trend: "up" },
  { title: "Avg Consultation Time", value: "22 min", change: "Optimal limit (30m)", trend: "neutral" },
  { title: "Pending Clinical Notes", value: "5", change: "-2 from morning", trend: "up" },
  { title: "Today's Est. Revenue", value: "₹32,400", change: "+14% vs weekly avg", trend: "up" },
];

const consultationSchedule = [
  { id: "C-101", patientName: "Aisha Mehta", age: "34", gender: "F", time: "09:30 AM", type: "Metabolic Review", status: "Checked-in", mode: "In-Person" },
  { id: "C-102", patientName: "Rohan Bhatia", age: "45", gender: "M", time: "10:00 AM", type: "Sleep Disorders", status: "Waiting", mode: "Video Call" },
  { id: "C-103", patientName: "Karan Sharma", age: "29", gender: "M", time: "10:30 AM", type: "Hypertension Follow-up", status: "In Consultation", mode: "In-Person" },
  { id: "C-104", patientName: "Meera Verma", age: "52", gender: "F", time: "11:00 AM", type: "Preventive Check", status: "Scheduled", mode: "Video Call" },
  { id: "C-105", patientName: "Siddharth Malhotra", age: "38", gender: "M", time: "11:30 AM", type: "Chronic Fatigue", status: "Completed", mode: "In-Person" },
];

const weeklyActivity = [
  { day: "Mon", patients: 12, hours: 5.5 },
  { day: "Tue", patients: 15, hours: 6.8 },
  { day: "Wed", patients: 18, hours: 8.0 },
  { day: "Thu", patients: 14, hours: 6.2 },
  { day: "Fri", patients: 18, hours: 7.5 },
  { day: "Sat", patients: 8, hours: 3.8 },
];

const chartConfig = {
  patients: { label: "Patients Seen", color: "hsl(var(--primary))" },
  hours: { label: "Consultation Hours", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

const DoctorDashboardPage = () => {
  const [schedule, setSchedule] = useState(consultationSchedule);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Checked-in":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" variant="outline">{status}</Badge>;
      case "Waiting":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 animate-pulse" variant="outline">{status}</Badge>;
      case "In Consultation":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" variant="outline">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" variant="outline">{status}</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800" variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">Doctor Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Good Morning, Dr. Kavya Menon</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            You have 18 consultations scheduled for today. 2 patients are currently waiting in the virtual queue.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <Button variant="outline" asChild className="w-full sm:w-auto justify-center">
            <Link href="/doctor/availability">
              <Clock className="h-4 w-4 mr-2" />
              Availability
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto justify-center">
            <Link href="/doctor/patient-queue">
              <Users className="h-4 w-4 mr-2" />
              View Patient Queue
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
        {/* Schedule */}
        <Card className="surface-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Today's Consultations</CardTitle>
              <CardDescription>Real-time queue and scheduled sessions</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost">
              <Link href="/doctor/appointments" className="text-primary text-xs flex items-center gap-1">
                View All Appointments
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
                    <TableHead>Patient</TableHead>
                    <TableHead>Consultation Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((session) => (
                    <TableRow key={session.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm text-foreground">{session.time}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{session.patientName}</p>
                          <p className="text-xs text-muted-foreground">{session.age} yrs · {session.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{session.type}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {session.mode === "Video Call" ? (
                            <Video className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <Stethoscope className="h-3.5 w-3.5 text-secondary" />
                          )}
                          {session.mode}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" asChild variant={session.status === "In Consultation" || session.status === "Waiting" ? "default" : "secondary"}>
                          <Link href={`/doctor/consultation?id=${session.id}`}>
                            {session.status === "Completed" ? "View Notes" : "Start"}
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
              {schedule.map((session) => (
                <div key={session.id} className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{session.time}</span>
                    {getStatusBadge(session.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{session.patientName}</p>
                    <p className="text-xs text-muted-foreground">{session.age} yrs · {session.gender} · {session.type}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {session.mode === "Video Call" ? (
                        <Video className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Stethoscope className="h-3.5 w-3.5 text-secondary" />
                      )}
                      {session.mode}
                    </div>
                    <Button size="sm" asChild variant={session.status === "In Consultation" || session.status === "Waiting" ? "default" : "secondary"}>
                      <Link href={`/doctor/consultation?id=${session.id}`}>
                        {session.status === "Completed" ? "View Notes" : "Start"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Co-Pilot Clinical AI Insights */}
        <Card className="surface-panel flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Clinical Co-Pilot
              </CardTitle>
              <CardDescription>AI insights based on patient logs and wearables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full">High Priority Alert</span>
                  <span className="text-[10px] text-muted-foreground">Aisha Mehta</span>
                </div>
                <p className="text-sm text-foreground font-medium">Elevated Inflammation Tracing</p>
                <p className="text-xs text-muted-foreground">
                  Wearable logs show resting HR spiked by +8bpm over 3 consecutive nights. Fasting blood sugar logs show high variability. Recommend checking salivary cortisol markers today.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">Recovery Milestone</span>
                  <span className="text-[10px] text-muted-foreground">Siddharth Malhotra</span>
                </div>
                <p className="text-sm text-foreground font-medium">Chronic Fatigue Improvement</p>
                <p className="text-xs text-muted-foreground">
                  Patient reports 30% reduction in morning fatigue score after following the custom adaptogen & sleep routine. Sleep latency dropped to under 15 minutes.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Button variant="outline" className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1" asChild>
              <Link href="/doctor/reports">
                <ClipboardCheck className="h-4 w-4" />
                Verify All Clinical Bulletins
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Recharts Analytics Widget */}
      <section className="grid grid-cols-1 gap-4">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Clinic Performance Trends</CardTitle>
            <CardDescription>Consultation hours & patient load comparison</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="patients" fill="var(--color-patients)" radius={[4, 4, 0, 0]} name="Patients Consulted" />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} name="Active Hours" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DoctorDashboardPage;
