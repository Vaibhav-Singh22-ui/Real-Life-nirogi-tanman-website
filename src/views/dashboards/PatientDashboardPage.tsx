"use client";

import { useState, useEffect } from "react";
import { Brain, CalendarClock, Sparkles, AlertCircle, HeartPulse, Activity, Moon, Droplets, Clock, ArrowUpRight, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { healthTrend } from "@/data/health-data";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const trendConfig = {
  score: { label: "Health Score", color: "hsl(var(--primary))" },
  sleep: { label: "Sleep (hrs)", color: "hsl(var(--secondary))" },
  steps: { label: "Steps (k)", color: "hsl(var(--accent))" },
} satisfies ChartConfig;

const PatientDashboardPage = () => {
  const { user, profile } = useAuth();
  const [activeBooking, setActiveBooking] = useState<any | null>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [doshaInfo, setDoshaInfo] = useState<string>("Vata-Pitta Balance");

  // Dynamic user details
  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Amit Verma";
  const userEmail = user?.email || "patient@nirogi.app";

  useEffect(() => {
    // Check localStorage for active booking fallback
    const saved = localStorage.getItem("nirogi_active_booking");
    if (saved) {
      try {
        setActiveBooking(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Fetch live bookings from Supabase
    const fetchLivePatientData = async () => {
      if (user?.id) {
        try {
          const { data: bookingsData } = await supabase
            .from("bookings")
            .select("*")
            .or(`patient_id.eq.${user.id},notes.ilike.%${userEmail}%`)
            .order("created_at", { ascending: false });

          if (bookingsData && bookingsData.length > 0) {
            setUserBookings(bookingsData);
          }

          const { data: doshaData } = await supabase
            .from("dosha_assessments")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1);

          if (doshaData && doshaData.length > 0) {
            setDoshaInfo(doshaData[0].primary_dosha || "Vata-Pitta Balance");
          }
        } catch (err) {
          console.error("Live patient fetch error:", err);
        }
      }
    };

    fetchLivePatientData();
  }, [user]);

  const patientStats = [
    {
      title: "Health Index Score",
      value: "88/100",
      change: "+4 pts vs last week",
      trend: "up" as const,
      icon: Activity,
      graphVariant: "ecg" as const,
      accentColor: "emerald" as const,
    },
    {
      title: "Active Dosha Baseline",
      value: doshaInfo,
      change: "Balanced Agni",
      trend: "up" as const,
      icon: Sparkles,
      graphVariant: "wave" as const,
      accentColor: "teal" as const,
    },
    {
      title: "Daily Hydration",
      value: "2.4 / 3.0 L",
      change: "80% of daily target",
      trend: "up" as const,
      icon: Droplets,
      graphVariant: "bars" as const,
      accentColor: "teal" as const,
    },
    {
      title: "Vitals Telemetry",
      value: "94%",
      change: "Normal HR & BP",
      trend: "up" as const,
      icon: HeartPulse,
      graphVariant: "area" as const,
      accentColor: "amber" as const,
    },
  ];

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {activeBooking && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-900 dark:text-amber-300 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <p className="font-extrabold uppercase tracking-wide leading-none">Consultation Room Active</p>
              <p className="mt-1 font-medium leading-normal">
                Your session with {activeBooking.practitionerName} ({activeBooking.practitionerTitle}) is scheduled for {activeBooking.date} at {activeBooking.timeSlot}.
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold px-4 shrink-0 shadow">
            Join Call Room
          </Button>
        </div>
      )}

      {/* Dynamic Visual Patient Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl transition-all duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 transition-transform duration-1000 scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1400&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

        <div className="relative z-10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/15 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 mr-1 animate-pulse" />
                Patient Integrative Workspace
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Telemetry Live ({userEmail})
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Welcome back, {userName}
              </h1>
              <p className="max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                {doshaInfo} Wellness Profile. You are trending positively with <strong className="text-foreground font-bold">88% health compliance</strong> this week.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Button variant="outline" asChild className="w-full sm:w-auto shadow-sm hover:shadow-md transition">
              <Link href="/patient/bookings">
                <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                My Bookings ({userBookings.length})
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto shadow-md hover:shadow-lg transition">
              <Link href="/book-consultation">
                <HeartPulse className="h-4 w-4 mr-2" />
                Book Doctor Consult
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Stat Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {patientStats.map((item) => (
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
                <Activity className="h-5 w-5 text-primary" />
                7-Day Vitals & Health Score Trend
              </CardTitle>
              <CardDescription className="text-xs">Continuous biometric tracking & sleep quality index</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 min-w-0 overflow-hidden">
            <ChartContainer config={trendConfig} className="h-72 w-full">
              <LineChart data={healthTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} opacity={0.3} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs font-semibold" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="score" type="monotone" stroke="var(--color-score)" strokeWidth={3} dot={false} name="Health Index" />
                <Line dataKey="sleep" type="monotone" stroke="var(--color-sleep)" strokeWidth={2} dot={false} name="Sleep (hrs)" />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Co-Pilot Recommendation */}
        <Card className="surface-panel shadow-lg border-border/80 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                AyurAI Daily Protocol
              </CardTitle>
              <CardDescription className="text-xs">Tailored lifestyle & adaptogen strategy for {userName}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-primary bg-primary/15 px-2.5 py-0.5 rounded-full">Evening Protocol</span>
                  <span className="text-xs font-bold text-foreground">Sleep Latency Care</span>
                </div>
                <p className="text-xs font-bold text-foreground">Ashwagandha & Warm Milk Routine</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Take 1 tsp Ashwagandha with warm milk at 09:30 PM with 10 minutes of Anulom Vilom breathwork.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">Hydration Target</span>
                  <span className="text-xs font-bold text-foreground">2.4 / 3.0 Liters</span>
                </div>
                <p className="text-xs font-bold text-foreground">600 ml Remaining Today</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Sip warm cumin-coriander water before 07:00 PM to maintain digestive Agni and hydration.
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-2">
            <Button variant="outline" className="w-full text-xs font-bold border-border hover:bg-primary/10 hover:text-primary transition" asChild>
              <Link href="/patient/ai-assistant">
                <Sparkles className="h-4 w-4 mr-1.5" />
                Ask AyurAI Assistant
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PatientDashboardPage;
