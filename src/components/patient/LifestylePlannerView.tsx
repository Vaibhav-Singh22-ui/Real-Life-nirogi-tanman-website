"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, ClipboardCheck, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  category: "morning" | "afternoon" | "evening";
  details: string;
  completed: boolean;
}

const defaultHabits: Habit[] = [
  // Morning
  { id: "h1", name: "Brahma Muhurta Wakeup", category: "morning", details: "Waking up before sunrise to leverage clean sattvic energy.", completed: false },
  { id: "h2", name: "Tongue Scraping & Warm Water", category: "morning", details: "Clearing oral toxins (Ama) and flushing the digestive tract.", completed: true },
  { id: "h3", name: "Morning Sun Exposure", category: "morning", details: "15 minutes of sun exposure for circadian rhythm alignment.", completed: false },
  
  // Afternoon
  { id: "h4", name: "Mindful Lunch (Largest Meal)", category: "afternoon", details: "Eating quiet and chewing thoroughly when the digestive fire is strongest.", completed: true },
  { id: "h5", name: "Post-Meal Stroll (Shatapadi)", category: "afternoon", details: "Walking 100 steps to support gastric emptying.", completed: false },

  // Evening
  { id: "h6", name: "Digital Sunset by 10:00 PM", category: "evening", details: "Turning off screens 1 hour before sleep to support melatonin.", completed: false },
  { id: "h7", name: "Pranayama / Breathwork", category: "evening", details: "5 minutes of alternate nostril breathing (Anulom Vilom).", completed: false }
];

export default function LifestylePlannerView() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [streak, setStreak] = useState(5);

  useEffect(() => {
    const savedHabits = localStorage.getItem("nirogi_lifestyle_habits");
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        setHabits(defaultHabits);
      }
    } else {
      setHabits(defaultHabits);
    }

    const savedStreak = localStorage.getItem("nirogi_lifestyle_streak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak) || 5);
    }
  }, []);

  const saveHabits = (updated: Habit[]) => {
    setHabits(updated);
    localStorage.setItem("nirogi_lifestyle_habits", JSON.stringify(updated));

    // Simple streak updater: if all completed, increase streak.
    const allDone = updated.every(h => h.completed);
    if (allDone) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      localStorage.setItem("nirogi_lifestyle_streak", nextStreak.toString());
      toast.success(`Amazing! All targets met. Streak increased to ${nextStreak} days! 🚀`);
    }
  };

  const toggleHabit = (id: string) => {
    const updated = habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
    saveHabits(updated);
    const habit = habits.find(h => h.id === id);
    if (habit) {
      if (!habit.completed) {
        toast.success(`Completed: ${habit.name}`);
      } else {
        toast.info(`Removed completion: ${habit.name}`);
      }
    }
  };

  const completedCount = habits.filter(h => h.completed).length;
  const completionPercentage = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Lifestyle Planner</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Synchronize your biological clock with nature's rhythm. Complete daily routines to establish stable energy cycles.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-md border border-border bg-background/80 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Habit Streak</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{streak} Days 🔥</p>
          </div>
          <div className="rounded-md border border-border bg-background/80 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Completion Rate</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{completionPercentage}%</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Habits Checklist */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" /> Daily Habits Checklist
            </CardTitle>
            <CardDescription>Check off wellness steps through the day. Achieve 100% to build your streak.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {["morning", "afternoon", "evening"].map((cat) => {
              const catHabits = habits.filter(h => h.category === cat);
              return (
                <div key={cat} className="space-y-3">
                  <h3 className="text-xs uppercase font-extrabold text-primary tracking-wider border-l-2 border-primary pl-2 mb-2">
                    {cat} Rituals
                  </h3>
                  <div className="grid gap-3">
                    {catHabits.map((h) => (
                      <div 
                        key={h.id}
                        className={`flex items-start justify-between p-3.5 border rounded-xl transition-all ${
                          h.completed 
                            ? "border-primary/20 bg-primary/[0.01]" 
                            : "border-border hover:border-primary/10"
                        }`}
                      >
                        <div className="flex gap-3">
                          <button 
                            onClick={() => toggleHabit(h.id)}
                            className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                              h.completed 
                                ? "bg-primary border-primary text-primary-foreground" 
                                : "border-input bg-card hover:border-primary"
                            }`}
                          >
                            {h.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </button>
                          <div>
                            <h4 className={`font-semibold text-sm ${h.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                              {h.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                              {h.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Dinacharya Guides */}
        <div className="space-y-6">
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" /> Ayurvedic Dinacharya
              </CardTitle>
              <CardDescription>Daily routine blocks suggested by ancient sciences.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="border-b border-border/40 pb-3 text-xs">
                <div className="flex justify-between font-bold text-foreground">
                  <span>Vata Period (02:00 - 06:00)</span>
                  <span className="text-primary">Wake & Meditate</span>
                </div>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Best hours for waking up, deep breathing, and starting your day with absolute peace.
                </p>
              </div>
              <div className="border-b border-border/40 pb-3 text-xs">
                <div className="flex justify-between font-bold text-foreground">
                  <span>Pitta Period (10:00 - 14:00)</span>
                  <span className="text-primary">Main Meal</span>
                </div>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Since your internal heat is highest at noon, eat your heaviest meal during this window.
                </p>
              </div>
              <div className="text-xs">
                <div className="flex justify-between font-bold text-foreground">
                  <span>Kapha Period (18:00 - 22:00)</span>
                  <span className="text-primary">Wind Down</span>
                </div>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  A period of relaxation, warm herbal teas, light stretching, and preparation for a deep sleep.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
