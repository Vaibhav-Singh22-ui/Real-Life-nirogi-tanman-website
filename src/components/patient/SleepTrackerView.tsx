"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Moon, Sparkles, Plus, Clock, Sparkle } from "lucide-react";

interface SleepRecord {
  id: string;
  date: string;
  duration: number; // in hours
  quality: number; // percentage
  bedtime: string;
  waketime: string;
}

const defaultSleepHistory: SleepRecord[] = [
  { id: "1", date: "Jul 15", duration: 7.2, quality: 85, bedtime: "10:30 PM", waketime: "05:42 AM" },
  { id: "2", date: "Jul 16", duration: 7.5, quality: 88, bedtime: "10:20 PM", waketime: "05:50 AM" },
  { id: "3", date: "Jul 17", duration: 6.8, quality: 78, bedtime: "11:10 PM", waketime: "05:58 AM" },
  { id: "4", date: "Jul 18", duration: 7.8, quality: 92, bedtime: "10:15 PM", waketime: "06:03 AM" },
  { id: "5", date: "Jul 19", duration: 7.4, quality: 86, bedtime: "10:30 PM", waketime: "05:54 AM" }
];

export default function SleepTrackerView() {
  const [history, setHistory] = useState<SleepRecord[]>([]);
  const [bedtimeInput, setBedtimeInput] = useState("22:30");
  const [waketimeInput, setWaketimeInput] = useState("06:00");
  const [qualityInput, setQualityInput] = useState("85");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_sleep_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory(defaultSleepHistory);
      }
    } else {
      setHistory(defaultSleepHistory);
    }
  }, []);

  const saveHistory = (updated: SleepRecord[]) => {
    setHistory(updated);
    localStorage.setItem("nirogi_sleep_history", JSON.stringify(updated));
  };

  const handleLogSleep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedtimeInput || !waketimeInput || !qualityInput) {
      toast.error("Please fill in all details.");
      return;
    }

    // Simple duration calculations
    const [bH, bM] = bedtimeInput.split(":").map(Number);
    const [wH, wM] = waketimeInput.split(":").map(Number);

    let durationHours = 0;
    if (wH >= bH) {
      durationHours = (wH + wM / 60) - (bH + bM / 60);
    } else {
      durationHours = (24 - (bH + bM / 60)) + (wH + wM / 60);
    }
    durationHours = parseFloat(durationHours.toFixed(1));

    // Convert inputs to AM/PM formatting for logging
    const convertToAmPm = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    const newRecord: SleepRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
      duration: durationHours,
      quality: parseInt(qualityInput) || 80,
      bedtime: convertToAmPm(bedtimeInput),
      waketime: convertToAmPm(waketimeInput)
    };

    saveHistory([newRecord, ...history]);
    toast.success(`Logged: ${durationHours} hours of sleep last night!`);
  };

  // Stats calculation
  const totalDuration = history.reduce((acc, r) => acc + r.duration, 0);
  const avgDuration = history.length > 0 ? (totalDuration / history.length).toFixed(1) : "0.0";
  const totalQuality = history.reduce((acc, r) => acc + r.quality, 0);
  const avgQuality = history.length > 0 ? Math.round(totalQuality / history.length) : 0;

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Sleep Tracker</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Monitor nighttime restoration cycles, circadian rhythm stability, and recovery levels.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 flex gap-4 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Weekly Average</p>
            <p className="mt-1 text-sm font-extrabold text-foreground">{avgDuration} Hrs</p>
          </div>
          <div className="border-l border-border/80 pl-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Sleep Index</p>
            <p className="mt-1 text-sm font-extrabold text-primary">{avgQuality}%</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Sleep History & Charts */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" /> Sleep History & Trends
            </CardTitle>
            <CardDescription>Visual log of your sleep records over the past few days.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Custom CSS Bar Chart representing sleep records */}
            <div className="flex justify-between items-end h-44 gap-4 px-2 border-b border-border/40 pb-4">
              {history.slice(0, 7).reverse().map((r) => {
                const heightPercentage = Math.min(100, Math.round((r.duration / 10) * 100));
                return (
                  <div key={r.id} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground font-mono">{r.duration}h</span>
                    <div 
                      className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary transition-all duration-300 hover:from-primary/50 hover:to-primary" 
                      style={{ height: `${heightPercentage}px`, minHeight: "20px" }}
                    ></div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{r.date}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 mt-6">
              {history.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3.5 border border-border rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mb-1">
                      {r.date}
                    </span>
                    <p className="font-semibold text-sm text-foreground">
                      {r.duration} Hours Sleep
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-medium font-mono">
                      Bedtime: {r.bedtime} · Waketime: {r.waketime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {r.quality}% Quality
                    </span>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">No sleep logs created yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Log New Sleep Card */}
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Log Last Night's Sleep
              </CardTitle>
              <CardDescription>Add custom timing and estimated sleep quality.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogSleep} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="bedtime-in" className="text-xs font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Bedtime
                    </Label>
                    <Input 
                      id="bedtime-in" 
                      type="time" 
                      value={bedtimeInput}
                      onChange={(e) => setBedtimeInput(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="waketime-in" className="text-xs font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Waketime
                    </Label>
                    <Input 
                      id="waketime-in" 
                      type="time" 
                      value={waketimeInput}
                      onChange={(e) => setWaketimeInput(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quality-in" className="text-xs font-bold">Estimated Quality: {qualityInput}%</Label>
                  <input 
                    id="quality-in" 
                    type="range" 
                    min="30" 
                    max="100" 
                    value={qualityInput} 
                    onChange={(e) => setQualityInput(e.target.value)}
                    className="w-full accent-primary bg-muted rounded-lg appearance-none h-1.5"
                  />
                </div>
                <Button type="submit" className="w-full text-xs font-bold h-9">
                  Save Sleep Record
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sleep Hygiene Tips */}
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" /> Circadian Rhythm Support
              </CardTitle>
              <CardDescription>Bedtime recommendations based on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3.5 text-xs text-muted-foreground">
              <div className="flex gap-2">
                <Sparkle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">Keep your sleeping space completely dark to trigger raw melatonin release.</p>
              </div>
              <div className="flex gap-2">
                <Sparkle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">Try to sleep by 10:30 PM (beginning of Kapha period) to match metabolic clocks.</p>
              </div>
              <div className="flex gap-2">
                <Sparkle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">Sip a warm cup of nutmeg or cardamom spiced milk before bed to calm hyperactive Vata nerves.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
