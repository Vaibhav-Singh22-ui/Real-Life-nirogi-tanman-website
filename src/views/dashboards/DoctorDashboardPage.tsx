import {
  Brain,
  Calendar,
  ClipboardCheck,
  Clock,
  Plus,
  Stethoscope,
  Video,
  Users,
  ArrowUpRight,
  BadgeDollarSign,
  FileText,
  Sparkles,
  Activity,
  ShieldAlert,
  Pill,
  CheckCircle2,
  UserCheck,
  ChevronRight,
} from "lucide-react";
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
  {
    title: "Patients Today",
    value: "18",
    change: "+3 vs yesterday",
    trend: "up" as const,
    icon: Users,
    graphVariant: "ecg" as const,
    accentColor: "emerald" as const,
  },
  {
    title: "Avg Consultation Time",
    value: "22 min",
    change: "Optimal limit (30m)",
    trend: "neutral" as const,
    icon: Clock,
    graphVariant: "wave" as const,
    accentColor: "indigo" as const,
  },
  {
    title: "Pending Clinical Notes",
    value: "5",
    change: "-2 from morning",
    trend: "up" as const,
    icon: FileText,
    graphVariant: "bars" as const,
    accentColor: "amber" as const,
  },
  {
    title: "Today's Est. Revenue",
    value: "₹32,400",
    change: "+14% vs weekly avg",
    trend: "up" as const,
    icon: BadgeDollarSign,
    graphVariant: "area" as const,
    accentColor: "teal" as const,
  },
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
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* High-End Visual Doctor Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl transition-all duration-300">
        {/* Background Visual Medical Banner Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 transition-transform duration-1000 scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

        <div className="relative z-10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/15 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="h-3.5 w-3.5 mr-1 animate-pulse" />
                Integrative Clinical Desk
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Live Consultations Active
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Good Morning, Dr. Kavya Menon, MD
              </h1>
              <p className="max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                Integrative Medicine & Metabolic Care Workspace. You have <strong className="text-foreground font-bold">18 consultations</strong> scheduled today across clinical & telehealth sessions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Button variant="outline" asChild className="w-full sm:w-auto shadow-sm hover:shadow-md transition">
              <Link href="/doctor/availability">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                Manage Slots
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto shadow-md hover:shadow-lg transition">
              <Link href="/doctor/patient-queue">
                <Users className="h-4 w-4 mr-2" />
                View Patient Queue
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Stat Cards with Background SVG Sparkline Graphs */}
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
        {/* Real-time Consultations & Patient Queue */}
        <Card className="surface-panel shadow-lg border-border/80">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Today's Consultations Pipeline
              </CardTitle>
              <CardDescription className="text-xs">Real-time triage queue and active patient sessions</CardDescription>
            </div>
            <Button size="sm" asChild variant="ghost" className="hover:bg-primary/10 hover:text-primary">
              <Link href="/doctor/appointments" className="text-primary text-xs font-semibold flex items-center gap-1">
                View All Appointments
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-bold">Time</TableHead>
                    <TableHead className="font-bold">Patient Details</TableHead>
                    <TableHead className="font-bold">Clinical Focus</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Mode</TableHead>
                    <TableHead className="text-right font-bold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((session) => (
                    <TableRow key={session.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-bold text-xs text-foreground whitespace-nowrap">{session.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center text-xs shrink-0">
                            {session.patientName.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-foreground leading-tight">{session.patientName}</p>
                            <p className="text-[11px] text-muted-foreground">{session.age} yrs · {session.gender} · #{session.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">{session.type}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          {session.mode === "Video Call" ? (
                            <Video className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                          )}
                          <span className="font-medium">{session.mode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" asChild variant={session.status === "In Consultation" || session.status === "Waiting" ? "default" : "outline"} className="h-8 text-xs font-semibold">
                          <Link href={`/doctor/consultation?id=${session.id}`}>
                            {session.status === "Completed" ? "View Notes" : "Start Consultation"}
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
                <div key={session.id} className="rounded-xl border border-border/80 bg-background p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary">{session.time}</span>
                    {getStatusBadge(session.status)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{session.patientName}</p>
                    <p className="text-xs text-muted-foreground">{session.age} yrs · {session.gender} · {session.type}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {session.mode === "Video Call" ? (
                        <Video className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                      <span>{session.mode}</span>
                    </div>
                    <Button size="sm" asChild variant={session.status === "In Consultation" || session.status === "Waiting" ? "default" : "outline"} className="h-8 text-xs font-semibold">
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

        {/* Clinical Co-Pilot AI & Wearable Vitals Telemetry */}
        <Card className="surface-panel shadow-lg border-border/80 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                Clinical Co-Pilot AI
              </CardTitle>
              <CardDescription className="text-xs">Wearables telemetry & adaptive care alerts</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full">Priority Alert</span>
                  <span className="text-xs font-bold text-foreground">Aisha Mehta</span>
                </div>
                <p className="text-xs font-bold text-foreground">Elevated Resting HR (+8 bpm)</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Wearable telemetry logged elevated resting HR over 3 nights. Recommend checking salivary cortisol markers today.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">Milestone</span>
                  <span className="text-xs font-bold text-foreground">Siddharth Malhotra</span>
                </div>
                <p className="text-xs font-bold text-foreground">Fatigue Score Reduction (-30%)</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Patient reports 30% reduction in fatigue score following custom adaptogen & sleep protocol.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-2">
            <Button variant="outline" className="w-full text-xs font-bold flex items-center justify-center gap-1.5 border-border hover:bg-primary/10 hover:text-primary transition" asChild>
              <Link href="/doctor/reports">
                <ClipboardCheck className="h-4 w-4" />
                Review Diagnostic Findings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Clinic Performance Analytics Recharts Widget */}
      <section className="grid grid-cols-1 gap-6">
        <Card className="surface-panel shadow-lg border-border/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Clinic Activity & Consultation Analytics
              </CardTitle>
              <CardDescription className="text-xs">Weekly patient volume vs total active clinical hours</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
              Live Workload Telemetry
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 min-w-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs font-semibold" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs font-semibold" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="patients" fill="var(--color-patients)" radius={[6, 6, 0, 0]} name="Patients Consulted" />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[6, 6, 0, 0]} name="Active Hours" />
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
