"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart, Plus, Brain, Sparkles, AlertCircle } from "lucide-react";

interface MoodRecord {
  id: string;
  date: string;
  time: string;
  mood: string;
  emoji: string;
  stress: number; // 1 to 10
  notes: string;
}

const defaultMoods: MoodRecord[] = [
  { id: "m1", date: "Jul 18", time: "09:00 AM", mood: "Calm", emoji: "😌", stress: 3, notes: "Morning yoga session made me feel extremely relaxed." },
  { id: "m2", date: "Jul 19", time: "03:30 PM", mood: "Anxious", emoji: "😰", stress: 7, notes: "Workload spike during afternoon calls." },
  { id: "m3", date: "Jul 20", time: "09:15 AM", mood: "Energetic", emoji: "⚡", stress: 2, notes: "Felt well-rested after 7.5 hours of solid sleep." }
];

const moodOptions = [
  { label: "Energetic", emoji: "⚡", color: "text-amber-500 bg-amber-500/10" },
  { label: "Calm", emoji: "😌", color: "text-green-500 bg-green-500/10" },
  { label: "Happy", emoji: "😊", color: "text-primary bg-primary/10" },
  { label: "Tired", emoji: "😴", color: "text-blue-500 bg-blue-500/10" },
  { label: "Anxious", emoji: "😰", color: "text-orange-500 bg-orange-500/10" },
  { label: "Sad", emoji: "😢", color: "text-indigo-500 bg-indigo-500/10" }
];

export default function MoodTrackerView() {
  const [history, setHistory] = useState<MoodRecord[]>([]);
  const [selectedMood, setSelectedMood] = useState("Calm");
  const [selectedEmoji, setSelectedEmoji] = useState("😌");
  const [stress, setStress] = useState(3);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_mood_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory(defaultMoods);
      }
    } else {
      setHistory(defaultMoods);
    }
  }, []);

  const saveHistory = (updated: MoodRecord[]) => {
    setHistory(updated);
    localStorage.setItem("nirogi_mood_history", JSON.stringify(updated));
  };

  const handleLogMood = (e: React.FormEvent) => {
    e.preventDefault();

    const record: MoodRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: selectedMood,
      emoji: selectedEmoji,
      stress,
      notes: notes || "No journal entry added."
    };

    saveHistory([record, ...history]);
    setNotes("");
    toast.success(`Logged mood: ${selectedMood} (${selectedEmoji})`);
  };

  const latestMood = history[0] || null;

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Mood Tracker</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Document emotional signals and stress triggers. Ayurvedic health emphasizes balancing mental states (Manas).
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 flex gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Current State</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{latestMood ? `${latestMood.emoji} ${latestMood.mood}` : "Unknown"}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Stress Level</p>
            <p className="mt-1 text-base font-extrabold text-foreground">{latestMood ? `${latestMood.stress} / 10` : "0"}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Mood Log & Reflections */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" /> Emotional Log Book
            </CardTitle>
            <CardDescription>Daily reflections and mental stress indicators.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {history.map((r) => (
                <div key={r.id} className="p-4 border border-border rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{r.emoji}</span>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{r.mood}</h4>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mt-0.5">
                          {r.date} · {r.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        Stress: {r.stress}/10
                      </span>
                    </div>
                  </div>
                  {r.notes && (
                    <p className="text-xs text-muted-foreground mt-3 border-t border-border/40 pt-2.5 leading-relaxed">
                      {r.notes}
                    </p>
                  )}
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-6">No mood logs saved yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Log Form */}
        <Card className="surface-panel h-fit">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Log Current Mood
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogMood} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Select Mood</Label>
                <div className="grid grid-cols-3 gap-2">
                  {moodOptions.map((opt) => (
                    <button 
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setSelectedMood(opt.label);
                        setSelectedEmoji(opt.emoji);
                      }}
                      className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        selectedMood === opt.label 
                          ? "border-primary bg-primary/[0.04] text-primary" 
                          : "border-border hover:border-primary/10 text-muted-foreground"
                      }`}
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-[10px] font-bold mt-1 leading-none">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stress-in" className="text-xs font-bold">Stress Level: {stress} / 10</Label>
                <input 
                  id="stress-in" 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={stress} 
                  onChange={(e) => setStress(parseInt(e.target.value))}
                  className="w-full accent-primary bg-muted rounded-lg appearance-none h-1.5"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mood-notes" className="text-xs font-bold">Journal & Reflections</Label>
                <textarea 
                  id="mood-notes"
                  placeholder="What's causing this feeling? Any symptoms?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[70px] max-h-[140px] text-xs p-2.5 border border-border rounded-lg bg-card text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <Button type="submit" className="w-full text-xs font-bold h-9">
                Log Mood Status
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
