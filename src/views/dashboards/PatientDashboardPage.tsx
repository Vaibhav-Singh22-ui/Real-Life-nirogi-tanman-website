import { useState, useEffect } from "react";
import { Brain, CalendarClock, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { metricsCards, healthTrend, upcomingAppointments } from "@/data/health-data";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

const trendConfig = {
  score: { label: "Health Score", color: "hsl(var(--primary))" },
  sleep: { label: "Sleep", color: "hsl(var(--secondary))" },
  steps: { label: "Steps", color: "hsl(var(--accent))" },
} satisfies ChartConfig;

const PatientDashboardPage = () => {
  const [activeBooking, setActiveBooking] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_active_booking");
    if (saved) {
      try {
        setActiveBooking(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {activeBooking && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 flex items-center justify-between gap-4 text-amber-900 dark:text-amber-300 animate-fadeIn">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <p className="font-extrabold uppercase tracking-wide leading-none">Consultation Room Active</p>
              <p className="mt-1 font-medium leading-normal">
                Your video session with {activeBooking.practitionerName} ({activeBooking.practitionerTitle}) is scheduled for {activeBooking.date} at {activeBooking.timeSlot}.
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold px-4 shrink-0 shadow">
            Join HD Call Room
          </Button>
        </div>
      )}
      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">Patient Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Today's Health Summary</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            You are trending positively this week. Continue sleep consistency and complete today’s hydration target.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/patient/calendar">
              <CalendarClock className="h-4 w-4" />
              Open Calendar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/patient/appointments">Book Follow-Up</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricsCards.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} trend={item.trend as "up" | "neutral"} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0 overflow-hidden">
            <ChartContainer config={trendConfig} className="h-72 w-full">
              <LineChart data={healthTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="score" type="monotone" stroke="var(--color-score)" strokeWidth={3} dot={false} />
                <Line dataKey="sleep" type="monotone" stroke="var(--color-sleep)" strokeWidth={2} dot={false} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAppointments.map((item) => (
              <div key={item.id} className="rounded-md border border-border bg-background p-3">
                <p className="text-sm font-medium text-foreground">{item.doctor}</p>
                <p className="text-xs text-muted-foreground">{item.specialty}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.date} · {item.time} · {item.mode}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Daily Activity Rhythm</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0 overflow-hidden">
            <ChartContainer config={trendConfig} className="h-64 w-full">
              <AreaChart data={healthTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="steps" type="monotone" fill="var(--color-steps)" fillOpacity={0.2} stroke="var(--color-steps)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> AI Assistant Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="rounded-md border border-border bg-background p-3">Your sleep consistency improved by 12% after moving dinner 45 minutes earlier.</p>
            <p className="rounded-md border border-border bg-background p-3">Hydration is strongest on days with morning yoga; maintain the same sequence for next 7 days.</p>
            <Button className="w-full" asChild>
              <Link href="/patient/ai-assistant">
                <Sparkles className="h-4 w-4" />
                Open AI Assistant
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PatientDashboardPage;
