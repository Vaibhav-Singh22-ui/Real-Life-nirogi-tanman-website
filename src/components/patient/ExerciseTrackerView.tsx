"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dumbbell, Plus, Flame, Clock, Trophy } from "lucide-react";

interface Workout {
  id: string;
  type: string;
  duration: number; // in mins
  calories: number;
  date: string;
  time: string;
}

const defaultWorkouts: Workout[] = [
  { id: "w1", type: "Brisk Walking", duration: 35, calories: 150, date: "Jul 18", time: "07:30 AM" },
  { id: "w2", type: "Vata Grounding Yoga Flow", duration: 25, calories: 80, date: "Jul 19", time: "08:15 AM" },
  { id: "w3", type: "Joint Mobility Stretches", duration: 15, calories: 45, date: "Jul 20", time: "07:00 AM" }
];

export default function ExerciseTrackerView() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [type, setType] = useState("Brisk Walking");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_workouts");
    if (saved) {
      try {
        setWorkouts(JSON.parse(saved));
      } catch (e) {
        setWorkouts(defaultWorkouts);
      }
    } else {
      setWorkouts(defaultWorkouts);
    }
  }, []);

  const saveWorkouts = (updated: Workout[]) => {
    setWorkouts(updated);
    localStorage.setItem("nirogi_workouts", JSON.stringify(updated));
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const dur = parseInt(duration);
    const cal = parseInt(calories) || Math.round(dur * 4.5); // Fallback estimate

    if (!type || !dur) {
      toast.error("Please enter a workout type and duration.");
      return;
    }

    const record: Workout = {
      id: Date.now().toString(),
      type,
      duration: dur,
      calories: cal,
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    saveWorkouts([record, ...workouts]);
    setDuration("");
    setCalories("");
    toast.success(`Logged: ${type} - ${dur} minutes!`);
  };

  // Stats
  const totalMinutes = workouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = workouts.reduce((acc, w) => acc + w.calories, 0);
  const targetMinutes = 150; // Weekly goal
  const minutesProgress = Math.min(100, Math.round((totalMinutes / targetMinutes) * 100));

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Exercise Log</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Log movement and calorie exertion to balance metabolism and improve physical conditioning (Vyayama).
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 flex gap-4 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Weekly Active</p>
            <p className="mt-1 text-sm font-extrabold text-foreground">{totalMinutes} / {targetMinutes} Mins</p>
          </div>
          <div className="border-l border-border/80 pl-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none font-bold">Goal Progress</p>
            <p className="mt-1 text-sm font-extrabold text-primary">{Math.round((totalMinutes / targetMinutes) * 100)}%</p>
          </div>
        </div>
      </section>

      {/* Target Progress Card */}
      <Card className="surface-panel">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Trophy className="h-4.5 w-4.5 text-amber-500" /> Weekly Exercise Goal
            </span>
            <span className="text-xs font-bold text-muted-foreground">{totalMinutes}m logged</span>
          </div>
          <div className="w-full bg-muted h-3.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full transition-all duration-300" style={{ width: `${minutesProgress}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Target: 150 minutes of moderate activity per week. 
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Workout History */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" /> Movement History
            </CardTitle>
            <CardDescription>Records of logged physical exercises.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {workouts.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-3.5 border border-border rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mb-1">
                      {w.date} · {w.time}
                    </span>
                    <p className="font-bold text-sm text-foreground">
                      {w.type}
                    </p>
                    <div className="flex items-center gap-2.5 mt-1.5 text-[11px] text-muted-foreground font-mono font-medium">
                      <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {w.duration} mins</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5"><Flame className="h-3 w-3" /> {w.calories} kcal</span>
                    </div>
                  </div>
                </div>
              ))}
              {workouts.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-4">No exercises logged yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Log Form */}
        <Card className="surface-panel h-fit">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Log Movement Session
            </CardTitle>
            <CardDescription>Enter details of your activity.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleAddWorkout} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="work-type" className="text-xs font-bold">Activity Type</Label>
                <Input 
                  id="work-type" 
                  placeholder="e.g. Yoga flow, Brisk walk" 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="work-dur" className="text-xs font-bold">Duration (mins)</Label>
                  <Input 
                    id="work-dur" 
                    type="number"
                    placeholder="30" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="work-cal" className="text-xs font-bold">Est. Calories (kcal)</Label>
                  <Input 
                    id="work-cal" 
                    type="number"
                    placeholder="120" 
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full text-xs font-bold h-9">
                Log Exercise
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
