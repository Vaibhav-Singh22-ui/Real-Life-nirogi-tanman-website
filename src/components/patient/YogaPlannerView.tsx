"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Waves, Play, Pause, RotateCcw, ChevronRight, CheckCircle, Flame, Clock } from "lucide-react";

interface Pose {
  name: string;
  sanskrit: string;
  duration: number; // in seconds
  description: string;
  benefit: string;
}

interface Routine {
  id: string;
  title: string;
  level: string;
  focus: string;
  poses: Pose[];
}

const defaultRoutines: Routine[] = [
  {
    id: "vata-flow",
    title: "Vata-Pacifying Grounding Flow",
    level: "Beginner Friendly",
    focus: "Stability, Warmth & Spine Flexions",
    poses: [
      { name: "Child's Pose", sanskrit: "Balasana", duration: 60, description: "Kneel, sit back on your heels, and reach your arms forward, chest low.", benefit: "Calms nervous system and lowers Vata restlessness." },
      { name: "Cat-Cow Stretch", sanskrit: "Marjaryasana", duration: 90, description: "Flow between arching and rounding your spine on hands and knees.", benefit: "Warm up spine and releases mid-back tightness." },
      { name: "Cobra Pose", sanskrit: "Bhujangasana", duration: 45, description: "Lie face down, press hands down, and gently lift upper chest off the floor.", benefit: "Opens the chest and stimulates abdominal organs." },
      { name: "Frog Pose", sanskrit: "Mandukasana", duration: 60, description: "Kneel, widen knees, press fists into lower abdomen, and lean forward.", benefit: "Stimulates pancreatic hormones and digestion." },
      { name: "Corpse Pose", sanskrit: "Savasana", duration: 120, description: "Lie flat on your back, legs wide, palms up, breathing deeply.", benefit: "Deep integration, reduces stress and fatigue." }
    ]
  },
  {
    id: "back-relief",
    title: "Lower Back Recovery Session",
    level: "All Levels",
    focus: "Spinal decompression & core stabilizer stretch",
    poses: [
      { name: "Knees-To-Chest", sanskrit: "Apanasana", duration: 90, description: "Lie on your back, hug both knees to your chest, rock side to side.", benefit: "Releases lumbar compression and stretches glutes." },
      { name: "Spinal Twist", sanskrit: "Supta Matsyendrasana", duration: 60, description: "Lie down, drop knees to one side while keeping chest flat facing up.", benefit: "Gently rotates vertebrae and releases lower spine muscles." },
      { name: "Bridge Pose", sanskrit: "Setu Bandhasana", duration: 45, description: "Lie on back, bend knees, feet flat, lift hips up to the sky.", benefit: "Strengthens back extensors and dynamic glutes." }
    ]
  }
];

export default function YogaPlannerView() {
  const [routines] = useState<Routine[]>(defaultRoutines);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [currentPoseIdx, setCurrentPoseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const activeRoutine = routines[selectedIdx];
  const activePose = activeRoutine.poses[currentPoseIdx];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_yoga_completed_count");
    if (saved) {
      setSessionsCompleted(parseInt(saved) || 0);
    }
    setTimeLeft(activeRoutine.poses[0].duration);
  }, [selectedIdx]);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handlePoseComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive, timeLeft]);

  const handlePoseComplete = () => {
    setTimerActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (currentPoseIdx < activeRoutine.poses.length - 1) {
      toast.success(`Completed: ${activePose.name}! Next pose up.`);
      const nextIdx = currentPoseIdx + 1;
      setCurrentPoseIdx(nextIdx);
      setTimeLeft(activeRoutine.poses[nextIdx].duration);
    } else {
      // Completed the entire routine!
      const updatedCount = sessionsCompleted + 1;
      setSessionsCompleted(updatedCount);
      localStorage.setItem("nirogi_yoga_completed_count", updatedCount.toString());
      toast.success(`Congratulations! You completed the ${activeRoutine.title}! 🎉`);
      setCurrentPoseIdx(0);
      setTimeLeft(activeRoutine.poses[0].duration);
    }
  };

  const handlePlayPause = () => {
    setTimerActive(!timerActive);
  };

  const handleReset = () => {
    setTimerActive(false);
    setTimeLeft(activePose.duration);
  };

  const handleNextPose = () => {
    setTimerActive(false);
    if (currentPoseIdx < activeRoutine.poses.length - 1) {
      const nextIdx = currentPoseIdx + 1;
      setCurrentPoseIdx(nextIdx);
      setTimeLeft(activeRoutine.poses[nextIdx].duration);
    } else {
      toast.info("This is the last pose of the routine.");
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Yoga Planner</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Follow customized, therapy-grade yoga sequences containing posture diagrams, breath pacing, and duration timers.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground leading-none">Completed Sessions</p>
            <p className="mt-1 text-sm font-extrabold text-foreground">{sessionsCompleted} routines</p>
          </div>
        </div>
      </section>

      {/* Routine Selectors */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {routines.map((r, idx) => (
          <Button 
            key={r.id} 
            variant={selectedIdx === idx ? "default" : "outline"}
            onClick={() => {
              setSelectedIdx(idx);
              setCurrentPoseIdx(0);
              setTimerActive(false);
            }}
            className="text-xs shrink-0 rounded-lg"
          >
            {r.title}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Timer Player */}
        <Card className="surface-panel overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">
                  {activeRoutine.level}
                </span>
                <CardTitle className="text-lg mt-1">{activeRoutine.title}</CardTitle>
                <CardDescription>Focus: {activeRoutine.focus}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 pb-10 flex flex-col items-center justify-center">
            {/* Visual Circular Timer representation */}
            <div className="relative h-44 w-44 rounded-full border-4 border-primary/20 flex flex-col items-center justify-center bg-card shadow-inner">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                {activePose.name}
              </span>
              <span className="text-3xl font-extrabold text-foreground font-mono mt-1">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full mt-2 font-mono">
                {activePose.sanskrit}
              </span>
            </div>

            {/* Play controls */}
            <div className="flex items-center gap-4 mt-8">
              <Button size="icon" variant="outline" onClick={handleReset} title="Reset Timer" className="rounded-full h-11 w-11">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button onClick={handlePlayPause} className="rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                {timerActive ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-0.5" />}
              </Button>
              <Button size="icon" variant="outline" onClick={handleNextPose} title="Skip Pose" className="rounded-full h-11 w-11">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 text-center max-w-md px-4">
              <p className="text-sm font-semibold text-foreground">{activePose.description}</p>
              <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                "Benefit: {activePose.benefit}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Routine Pose Deck */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" /> Pose Sequence
            </CardTitle>
            <CardDescription>Follow the poses sequentially. Expand details below.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {activeRoutine.poses.map((p, idx) => {
                const isActive = currentPoseIdx === idx;
                const isDone = currentPoseIdx > idx;

                return (
                  <div 
                    key={p.name}
                    className={`flex items-start justify-between p-3 border rounded-xl transition-all cursor-pointer ${
                      isActive 
                        ? "border-primary bg-primary/[0.03]" 
                        : isDone 
                          ? "border-primary/10 bg-muted/20 opacity-80" 
                          : "border-border hover:border-primary/10"
                    }`}
                    onClick={() => {
                      setCurrentPoseIdx(idx);
                      setTimeLeft(p.duration);
                      setTimerActive(false);
                    }}
                  >
                    <div className="flex gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : isDone 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-foreground leading-tight flex items-center gap-1.5">
                          {p.name} <span className="text-[10px] text-muted-foreground font-medium italic">({p.sanskrit})</span>
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-normal line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.duration}s
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
