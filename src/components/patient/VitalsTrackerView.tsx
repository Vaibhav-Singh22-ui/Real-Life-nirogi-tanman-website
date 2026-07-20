"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Activity, Plus, TrendingUp, Sparkles, Heart } from "lucide-react";

interface BPRecord {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  category: string; // Normal, Elevated, Stage 1, Stage 2
}

interface SugarRecord {
  id: string;
  date: string;
  time: string;
  value: number; // mg/dL
  mealStatus: "Fasting" | "Post-Meal" | "Random";
  category: string; // Normal, Prediabetes, Diabetes
}

const defaultBP: BPRecord[] = [
  { id: "bp1", date: "Jul 18", time: "08:15 AM", systolic: 118, diastolic: 76, pulse: 72, category: "Normal" },
  { id: "bp2", date: "Jul 19", time: "08:30 AM", systolic: 122, diastolic: 80, pulse: 75, category: "Elevated" },
  { id: "bp3", date: "Jul 20", time: "08:00 AM", systolic: 119, diastolic: 78, pulse: 70, category: "Normal" }
];

const defaultSugar: SugarRecord[] = [
  { id: "s1", date: "Jul 18", time: "07:30 AM", value: 92, mealStatus: "Fasting", category: "Normal" },
  { id: "s2", date: "Jul 18", time: "02:00 PM", value: 135, mealStatus: "Post-Meal", category: "Normal" },
  { id: "s3", date: "Jul 19", time: "07:15 AM", value: 98, mealStatus: "Fasting", category: "Normal" },
  { id: "s4", date: "Jul 20", time: "07:00 AM", value: 96, mealStatus: "Fasting", category: "Normal" }
];

export default function VitalsTrackerView() {
  const [activeTab, setActiveTab] = useState<"bp" | "sugar">("bp");
  
  // States for Blood Pressure
  const [bpHistory, setBpHistory] = useState<BPRecord[]>([]);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");

  // States for Blood Sugar
  const [sugarHistory, setSugarHistory] = useState<SugarRecord[]>([]);
  const [sugarVal, setSugarVal] = useState("");
  const [mealStatus, setMealStatus] = useState<SugarRecord["mealStatus"]>("Fasting");

  useEffect(() => {
    const savedBP = localStorage.getItem("nirogi_bp_history");
    if (savedBP) {
      try { setBpHistory(JSON.parse(savedBP)); } catch (e) { setBpHistory(defaultBP); }
    } else {
      setBpHistory(defaultBP);
    }

    const savedSugar = localStorage.getItem("nirogi_sugar_history");
    if (savedSugar) {
      try { setSugarHistory(JSON.parse(savedSugar)); } catch (e) { setSugarHistory(defaultSugar); }
    } else {
      setSugarHistory(defaultSugar);
    }
  }, []);

  const saveBP = (updated: BPRecord[]) => {
    setBpHistory(updated);
    localStorage.setItem("nirogi_bp_history", JSON.stringify(updated));
  };

  const saveSugar = (updated: SugarRecord[]) => {
    setSugarHistory(updated);
    localStorage.setItem("nirogi_sugar_history", JSON.stringify(updated));
  };

  const getBPCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return "Normal";
    if (sys >= 120 && sys < 130 && dia < 80) return "Elevated";
    if ((sys >= 130 && sys < 140) || (dia >= 80 && dia < 90)) return "Stage 1 Hypertension";
    return "Stage 2 Hypertension";
  };

  const getSugarCategory = (val: number, status: SugarRecord["mealStatus"]) => {
    if (status === "Fasting") {
      if (val < 100) return "Normal";
      if (val >= 100 && val < 126) return "Prediabetes";
      return "Diabetes Level";
    } else {
      if (val < 140) return "Normal";
      if (val >= 140 && val < 200) return "Prediabetes";
      return "Diabetes Level";
    }
  };

  const handleAddBP = (e: React.FormEvent) => {
    e.preventDefault();
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    const pul = parseInt(pulse);

    if (!sys || !dia) {
      toast.error("Please enter both Systolic and Diastolic numbers.");
      return;
    }

    const record: BPRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      systolic: sys,
      diastolic: dia,
      pulse: pul || 72,
      category: getBPCategory(sys, dia)
    };

    saveBP([record, ...bpHistory]);
    setSystolic("");
    setDiastolic("");
    setPulse("");
    toast.success(`Logged: BP ${sys}/${dia} mmHg (${record.category})`);
  };

  const handleAddSugar = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(sugarVal);

    if (!val) {
      toast.error("Please enter a Blood Sugar value.");
      return;
    }

    const record: SugarRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: val,
      mealStatus,
      category: getSugarCategory(val, mealStatus)
    };

    saveSugar([record, ...sugarHistory]);
    setSugarVal("");
    toast.success(`Logged: Blood Sugar ${val} mg/dL (${mealStatus} · ${record.category})`);
  };

  // Stats
  const latestBP = bpHistory[0] || null;
  const latestSugar = sugarHistory[0] || null;

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Vitals Tracker</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Monitor and record cardiovascular metrics and glucose trends to coordinate medical care workflows.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={activeTab === "bp" ? "default" : "outline"} onClick={() => setActiveTab("bp")} className="text-xs">
            Blood Pressure
          </Button>
          <Button variant={activeTab === "sugar" ? "default" : "outline"} onClick={() => setActiveTab("sugar")} className="text-xs">
            Blood Sugar
          </Button>
        </div>
      </section>

      {/* Latest Vitals cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-red-500" /> Latest Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestBP ? (
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {latestBP.systolic} / {latestBP.diastolic} <span className="text-sm font-normal text-muted-foreground">mmHg</span>
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold">
                  <span className={`px-2 py-0.5 rounded-full ${
                    latestBP.category === "Normal" 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {latestBP.category}
                  </span>
                  <span className="text-muted-foreground font-normal">Pulse: {latestBP.pulse} bpm</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No records logged yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-primary" /> Latest Blood Sugar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestSugar ? (
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {latestSugar.value} <span className="text-sm font-normal text-muted-foreground">mg/dL</span>
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold">
                  <span className={`px-2 py-0.5 rounded-full ${
                    latestSugar.category === "Normal" 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {latestSugar.category}
                  </span>
                  <span className="text-muted-foreground font-normal">Status: {latestSugar.mealStatus}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No records logged yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Tab specific content */}
        {activeTab === "bp" ? (
          <>
            {/* Blood Pressure History */}
            <Card className="surface-panel">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-lg">Blood Pressure Log Book</CardTitle>
                <CardDescription>Timestamps of blood pressure checks.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {bpHistory.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3.5 border border-border rounded-xl">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mb-1">
                          {r.date} · {r.time}
                        </span>
                        <p className="font-bold text-sm text-foreground">
                          {r.systolic} / {r.diastolic} <span className="text-xs font-normal text-muted-foreground">mmHg</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">Pulse: {r.pulse} bpm</p>
                      </div>
                      <div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          r.category === "Normal" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-amber-500/10 text-amber-600"
                        }`}>
                          {r.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  {bpHistory.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-4">No records logged.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar form */}
            <Card className="surface-panel h-fit">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" /> Log BP Reading
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleAddBP} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="sys-in" className="text-xs font-bold">Systolic (sys)</Label>
                      <Input 
                        id="sys-in" 
                        type="number" 
                        placeholder="120" 
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dia-in" className="text-xs font-bold">Diastolic (dia)</Label>
                      <Input 
                        id="dia-in" 
                        type="number" 
                        placeholder="80" 
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pulse-in" className="text-xs font-bold">Pulse (bpm)</Label>
                    <Input 
                      id="pulse-in" 
                      type="number" 
                      placeholder="72" 
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <Button type="submit" className="w-full text-xs font-bold h-9">
                    Add BP Reading
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Blood Sugar History */}
            <Card className="surface-panel">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-lg">Blood Sugar Log Book</CardTitle>
                <CardDescription>Glucose levels monitored across meal times.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {sugarHistory.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3.5 border border-border rounded-xl">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mb-1">
                          {r.date} · {r.time}
                        </span>
                        <p className="font-bold text-sm text-foreground">
                          {r.value} <span className="text-xs font-normal text-muted-foreground">mg/dL</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">Status: {r.mealStatus}</p>
                      </div>
                      <div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          r.category === "Normal" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-amber-500/10 text-amber-600"
                        }`}>
                          {r.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  {sugarHistory.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-4">No records logged.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar form */}
            <Card className="surface-panel h-fit">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" /> Log Sugar Reading
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleAddSugar} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sugar-in" className="text-xs font-bold">Glucose level (mg/dL)</Label>
                    <Input 
                      id="sugar-in" 
                      type="number" 
                      placeholder="95" 
                      value={sugarVal}
                      onChange={(e) => setSugarVal(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Meal Status</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Fasting", "Post-Meal", "Random"].map((status) => (
                        <Button 
                          key={status}
                          type="button"
                          variant={mealStatus === status ? "default" : "outline"}
                          onClick={() => setMealStatus(status as any)}
                          className="h-8 text-[10px] font-bold"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full text-xs font-bold h-9">
                    Add Sugar Reading
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
