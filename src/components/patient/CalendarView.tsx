"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Stethoscope, Video, User } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  type: "doctor" | "yoga" | "diet" | "lifestyle";
  date: number; // Day of the month
  time: string;
  detail: string;
}

const defaultEvents: CalendarEvent[] = [
  { id: "e1", title: "Ayurvedic Doctor Call", type: "doctor", date: 21, time: "11:15 AM", detail: "Fasting pulse check-in with Dr. Ramesh Prasad" },
  { id: "e2", title: "Metabolic Yoga Therapy", type: "yoga", date: 21, time: "07:00 AM", detail: "Belly twists & Mandukasana with Guru Amit" },
  { id: "e3", title: "Nutrition Re-assessment", type: "diet", date: 22, time: "05:30 PM", detail: "Agni profiling and diet adjustments with Sneha" },
  { id: "e4", title: "Vata Grounding Walk", type: "lifestyle", date: 20, time: "04:30 PM", detail: "Light walking in nature" },
  { id: "e5", title: "Therapeutic Asana Set", type: "yoga", date: 24, time: "08:00 AM", detail: "Spine flexibility postures" }
];

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents(defaultEvents);
  }, []);

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.date === day);
  };

  // Simple current month grid generation (e.g. July 2026)
  // July 2026 starts on a Wednesday (3 empty slots, 31 days)
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday offset

  const calendarCells: (number | null)[] = [];
  // Fill empty slots
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  // Fill days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const dayEvents = getEventsForDay(selectedDay);

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">My Calendar</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Plan your consultation timelines and routine schedules in one integrated dashboard calendar view.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 flex items-center gap-3 backdrop-blur-sm">
          <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Selected Date</p>
            <p className="mt-1 text-xs font-bold text-foreground">{selectedDay} July 2026</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Calendar Grid */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg">July 2026</CardTitle>
            <CardDescription>Select any day to view scheduled wellness calls and workouts.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Days of the Week headers */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-muted-foreground mb-4">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            {/* Grid Cells */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-10"></div>;
                }

                const hasEvents = getEventsForDay(day).length > 0;
                const isSelected = selectedDay === day;

                return (
                  <button 
                    key={`day-${day}`}
                    onClick={() => setSelectedDay(day)}
                    className={`h-10 rounded-lg flex flex-col items-center justify-center relative text-xs font-semibold transition-all ${
                      isSelected 
                        ? "bg-primary text-primary-foreground font-bold shadow-md scale-105" 
                        : "bg-muted/30 hover:bg-primary/5 text-foreground"
                    }`}
                  >
                    <span>{day}</span>
                    {hasEvents && (
                      <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${
                        isSelected ? "bg-primary-foreground" : "bg-primary"
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Daily Schedule
            </CardTitle>
            <CardDescription>Scheduled wellness activities for July {selectedDay}.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {dayEvents.map((e) => (
                <div key={e.id} className="p-4 border border-border rounded-xl flex gap-3.5 items-start">
                  <div className={`p-2.5 rounded-full shrink-0 ${
                    e.type === "doctor" 
                      ? "bg-red-500/10 text-red-600" 
                      : e.type === "yoga" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {e.type === "doctor" ? <Stethoscope className="h-4.5 w-4.5" /> : <Video className="h-4.5 w-4.5" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block font-mono">
                      {e.time}
                    </span>
                    <h4 className="font-bold text-sm text-foreground mt-0.5">{e.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">{e.detail}</p>
                  </div>
                </div>
              ))}
              {dayEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground font-medium">No sessions scheduled for this day.</p>
                  <Button size="sm" className="mt-3.5 text-xs font-bold px-4">
                    Book Call Slot
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
