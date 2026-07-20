"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Droplet, Sparkles, Plus, RotateCcw, Clock } from "lucide-react";

interface WaterLog {
  id: string;
  amount: number; // in ml
  time: string;
}

export default function WaterIntakeView() {
  const [consumed, setConsumed] = useState(0);
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const target = 2700; // in ml

  useEffect(() => {
    const savedConsumed = localStorage.getItem("nirogi_water_consumed");
    if (savedConsumed) {
      setConsumed(parseInt(savedConsumed) || 0);
    }
    const savedLogs = localStorage.getItem("nirogi_water_logs");
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        setLogs([]);
      }
    }
  }, []);

  const saveIntake = (newConsumed: number, newLogs: WaterLog[]) => {
    setConsumed(newConsumed);
    setLogs(newLogs);
    localStorage.setItem("nirogi_water_consumed", newConsumed.toString());
    localStorage.setItem("nirogi_water_logs", JSON.stringify(newLogs));
  };

  const handleAddWater = (amount: number) => {
    const newConsumed = consumed + amount;
    const newLog: WaterLog = {
      id: Date.now().toString(),
      amount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    saveIntake(newConsumed, [newLog, ...logs]);
    toast.success(`Logged: +${amount}ml of water.`);
  };

  const handleReset = () => {
    saveIntake(0, []);
    toast.info("Hydration log reset for today.");
  };

  const progressPercent = Math.min(100, Math.round((consumed / target) * 100));

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Water Intake</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Track your hydration levels throughout the day. Hydration prevents dryness and balances vata signals.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 flex gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Intake Progress</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{consumed} / {target} ml</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Target Met</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{progressPercent}%</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Dynamic Glass Visualization Card */}
        <Card className="surface-panel flex flex-col justify-between items-center py-8">
          <div className="text-center">
            <span className="text-xs uppercase font-extrabold text-primary tracking-widest block">Goal Progress</span>
            <span className="text-4xl font-extrabold text-foreground mt-2 block">{progressPercent}%</span>
          </div>

          {/* Animated Water Cylinder Container */}
          <div className="relative w-28 h-56 border-4 border-primary/20 rounded-b-3xl rounded-t-lg overflow-hidden bg-card shadow-inner flex flex-col justify-end mt-6 mb-6">
            <div 
              className="bg-primary/40 w-full transition-all duration-700 ease-out flex items-center justify-center text-xs font-bold text-primary"
              style={{ height: `${progressPercent}%` }}
            >
              {progressPercent > 10 && `${consumed}ml`}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="text-xs border-border flex items-center gap-1">
              <RotateCcw className="h-3 w-3" /> Reset Day
            </Button>
          </div>
        </Card>

        {/* Quick Logs & Hydration History */}
        <div className="space-y-6">
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Quick Log Intake
              </CardTitle>
              <CardDescription>Log water quickly by choosing typical cup/bottle portion sizes.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" onClick={() => handleAddWater(250)} className="h-16 flex flex-col gap-1 items-center justify-center border-border hover:border-primary/20 bg-muted/20">
                  <span className="text-xs font-bold text-foreground">+250ml</span>
                  <span className="text-[9px] text-muted-foreground uppercase leading-none font-semibold">1 Cup</span>
                </Button>
                <Button variant="outline" onClick={() => handleAddWater(500)} className="h-16 flex flex-col gap-1 items-center justify-center border-border hover:border-primary/20 bg-muted/20">
                  <span className="text-xs font-bold text-foreground">+500ml</span>
                  <span className="text-[9px] text-muted-foreground uppercase leading-none font-semibold">1 Bottle</span>
                </Button>
                <Button variant="outline" onClick={() => handleAddWater(1000)} className="h-16 flex flex-col gap-1 items-center justify-center border-border hover:border-primary/20 bg-muted/20">
                  <span className="text-xs font-bold text-foreground">+1000ml</span>
                  <span className="text-[9px] text-muted-foreground uppercase leading-none font-semibold">1 Carafe</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Hydration History
              </CardTitle>
              <CardDescription>Timestamps of logged water intake today.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Droplet className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">+{log.amount} ml</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">Logged at {log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {logs.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground py-4">No water logs added today yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
