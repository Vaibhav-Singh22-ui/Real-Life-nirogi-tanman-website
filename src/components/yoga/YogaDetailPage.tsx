import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SharedSettingsView from "@/components/app/SharedSettingsView";
import SharedNotificationsView from "@/components/app/SharedNotificationsView";
import {
  Waves,
  Calendar,
  ClipboardList,
  Users,
  Activity,
  Moon,
  TrendingUp,
  Plus,
  Search,
  Play,
  CheckCircle2,
  Sparkles,
  Filter,
  Clock,
  HeartPulse,
  Eye,
  Download,
  Send,
  Brain,
  MessageSquare,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type YogaDetailPageProps = {
  pageKey: string;
};

export const YogaDetailPage: React.FC<YogaDetailPageProps> = ({ pageKey }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // State for Routine Builder
  const [routineItems, setRoutineItems] = useState([
    { name: "Pawanmuktasana (Wind Relieving Series)", category: "Asana / Mobility", duration: "10 mins", benefit: "Lumbar & Digestive relief" },
    { name: "Anulom Vilom (Alternate Nadi Pranayama)", category: "Pranayama / Breath", duration: "12 mins", benefit: "Autonomic nervous balancing" },
  ]);
  const [newAsana, setNewAsana] = useState({ name: "", category: "Asana", duration: "", benefit: "" });

  const handleAddAsana = () => {
    if (!newAsana.name || !newAsana.duration) {
      toast.error("Please specify posture name and duration.");
      return;
    }
    setRoutineItems(prev => [...prev, newAsana]);
    setNewAsana({ name: "", category: "Asana", duration: "", benefit: "" });
    toast.success("Asana added to therapeutic sequence.");
  };

  switch (pageKey) {
    case "patients":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Therapy Patients Roster</h1>
              <p className="text-xs text-muted-foreground">Enrolled participants in custom yoga therapy programs</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60 text-xs h-9"
              />
              <Button size="sm" className="h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-3.5 w-3.5 mr-1" /> Enroll Patient
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Niharika Sen", age: "29", focus: "Spine & Hamstring ROM", compliance: "96%", routine: "Therapeutic Spine L1", badge: "Progressing Fast" },
              { name: "Vikram Dravid", age: "43", focus: "Cervical Lordosis Care", compliance: "88%", routine: "Neck & Shoulder Release", badge: "Pose Alert" },
              { name: "Sonal Mishra", age: "36", focus: "Lumbar Disc Recovery", compliance: "92%", routine: "Lower Back Therapy", badge: "On Track" },
            ].map((p, i) => (
              <Card key={i} className="surface-panel p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-xs">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                    {p.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.age} yrs · Focus: {p.focus}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-muted/40 text-xs space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Routine:</span>
                    <span className="font-semibold text-foreground">{p.routine}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Compliance:</span>
                    <span className="font-bold text-emerald-600">{p.compliance}</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full text-xs h-8">View Mobility Log</Button>
              </Card>
            ))}
          </div>
        </div>
      );

    case "yoga-routine-builder":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Adaptive Yoga Routine Builder</h1>
              <p className="text-xs text-muted-foreground">Design custom sequence flows based on diagnosis & flexibility levels</p>
            </div>
            <Button onClick={() => toast.success("Therapeutic routine saved & assigned!")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Save & Assign Routine
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Waves className="h-5 w-5 text-emerald-600" /> Add Asana / Pranayama to Sequence
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Posture / Movement Name</Label>
                  <Input
                    placeholder="e.g. Bhujangasana, Paschimottanasana, Nadi Shodhana"
                    value={newAsana.name}
                    onChange={(e) => setNewAsana({ ...newAsana, name: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Category</Label>
                    <Input
                      placeholder="Asana, Pranayama, Kriya"
                      value={newAsana.category}
                      onChange={(e) => setNewAsana({ ...newAsana, category: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Hold Duration / Reps</Label>
                    <Input
                      placeholder="e.g. 5 mins, 10 rounds"
                      value={newAsana.duration}
                      onChange={(e) => setNewAsana({ ...newAsana, duration: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Therapeutic Benefit Target</Label>
                  <Input
                    placeholder="e.g. Lumbar decompression, parasympathetic activation"
                    value={newAsana.benefit}
                    onChange={(e) => setNewAsana({ ...newAsana, benefit: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <Button onClick={handleAddAsana} variant="secondary" className="w-full text-xs h-9">
                <Plus className="h-3.5 w-3.5 mr-1" /> Append Asana to Flow
              </Button>
            </Card>

            <Card className="surface-panel p-5 space-y-4">
              <div className="border-b border-border/40 pb-3">
                <h3 className="text-base font-bold text-foreground">Current Sequence Draft</h3>
                <p className="text-xs text-muted-foreground">Target: Spine & Lumbar Relief (30 Mins Total)</p>
              </div>

              <div className="space-y-3">
                {routineItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-background space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{idx + 1}. {item.name}</span>
                      <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">{item.duration}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.benefit}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      );

    case "exercise-library":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Asana & Movement Reference Library</h1>
              <p className="text-xs text-muted-foreground">Curated therapeutic posture directory with alignment guides</p>
            </div>
            <Input
              placeholder="Filter by Sanskrit or English name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 text-xs h-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Bhujangasana (Cobra Pose)", target: "Spine Extension & Chest Opening", level: "Beginner", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=400&auto=format&fit=crop" },
              { name: "Paschimottanasana (Seated Forward Bend)", target: "Hamstring & Lumbar Stretch", level: "Intermediate", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop" },
              { name: "Anulom Vilom (Nadi Shodhana)", target: "Autonomic Nervous Balance", level: "All Levels", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop" },
              { name: "Setu Bandhasana (Bridge Pose)", target: "Glute Activation & Cervical Support", level: "Beginner", img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=400&auto=format&fit=crop" },
              { name: "Vrikshasana (Tree Pose)", target: "Proprioception & Ankle Stability", level: "Beginner", img: "https://images.unsplash.com/photo-1510894347713-da3ed8f6f43d?q=80&w=400&auto=format&fit=crop" },
              { name: "Yoga Nidra (Guided Sleep Flow)", target: "Deep Parasympathetic Recovery", level: "Restorative", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&auto=format&fit=crop" },
            ].map((asana, index) => (
              <Card key={index} className="surface-panel overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={asana.img} alt={asana.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border-none">
                    {asana.level}
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-foreground">{asana.name}</h3>
                  <p className="text-xs text-muted-foreground">{asana.target}</p>
                  <Button variant="outline" size="sm" className="w-full text-xs mt-2">View Alignment Guide</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "meditation-sessions":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Guided Meditation & Breathwork</h1>
              <p className="text-xs text-muted-foreground">Schedule and lead audio-guided relaxation & Pranayama sessions</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9">
              <Plus className="h-3.5 w-3.5 mr-1" /> Schedule Meditation Class
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Somatic Body Scan for Sleep", duration: "25 Mins", mode: "Guided Audio", participants: 18, status: "Live Today 08:00 PM" },
              { title: "Pranayama for Anxiety De-escalation", duration: "15 Mins", mode: "Breathwork Stream", participants: 12, status: "Completed 07:00 AM" },
              { title: "Chakra Balance & Visual Healing", duration: "30 Mins", mode: "Guided Audio", participants: 24, status: "Scheduled Tomorrow" },
              { title: "Deep Restorative Yoga Nidra", duration: "45 Mins", mode: "Guided Audio", participants: 30, status: "Scheduled Friday" },
            ].map((session, i) => (
              <Card key={i} className="surface-panel p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                    <Moon className="h-3 w-3 mr-1" /> {session.duration}
                  </Badge>
                  <span className="text-xs font-semibold text-muted-foreground">{session.status}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground">{session.title}</h3>
                  <p className="text-xs text-muted-foreground">{session.mode} · {session.participants} Enrolled</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" className="h-8 text-xs bg-emerald-600 text-white"><Play className="h-3 w-3 mr-1" /> Launch Session Player</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );

    case "calendar":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Yoga Studio & Therapy Schedule</h1>
              <p className="text-xs text-muted-foreground">Manage group classes, 1-on-1 therapeutic consultations & workshops</p>
            </div>
            <Button onClick={() => toast.success("Opened Schedule New Class modal")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 font-bold">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Schedule Studio Class
            </Button>
          </div>

          <Card className="surface-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" /> Today's Studio Calendar
              </h3>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">5 Sessions Scheduled</Badge>
            </div>

            <div className="space-y-3">
              {[
                { time: "07:00 AM", title: "Morning Sun Salutations & Breathwork", type: "Group Class", location: "Studio Room A", enrolled: "12 Students" },
                { time: "09:30 AM", title: "Spine Decompression Therapy (Aisha Mehta)", type: "1-on-1 Therapy", location: "Therapy Pod 2", enrolled: "1 Patient" },
                { time: "04:30 PM", title: "Metabolic Activation Flow", type: "Group Class", location: "Studio Room B", enrolled: "8 Students" },
                { time: "07:00 PM", title: "Restorative Yoga Nidra & Sound Bath", type: "Special Workshop", location: "Main Hall", enrolled: "20 Students" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/60 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-emerald-500/40 transition">
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-xs text-emerald-600 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg shrink-0">{item.time}</span>
                    <div>
                      <p className="font-bold text-sm text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type} · {item.location} ({item.enrolled})</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                    <Button size="sm" onClick={() => toast.success(`Started session: ${item.title}`)} className="h-8 text-xs bg-emerald-600 text-white font-bold">
                      Launch Class
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );

    case "attendance":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student & Patient Attendance Roster</h1>
              <p className="text-xs text-muted-foreground">Track participation, mark attendance, and review consistency trends</p>
            </div>
            <Button onClick={() => toast.success("Attendance sheet synced to patient records!")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Save Attendance Log
            </Button>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold">Today's Class Attendance List</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { name: "Aisha Mehta", program: "Spine Mobility Protocol", status: "Present", rate: "92%" },
                { name: "Rohan Bhatia", program: "Stress & Anxiety Relief", status: "Present", rate: "88%" },
                { name: "Karan Sharma", program: "Metabolic Wellness Flow", status: "Absent", rate: "75%" },
                { name: "Meera Verma", program: "Senior Joint Health", status: "Present", rate: "95%" },
              ].map((student, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.program} · Attendance Rate: <strong className="text-emerald-600">{student.rate}</strong></p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Badge className={student.status === "Present" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs" : "bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs"}>
                      {student.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => toast.info(`Toggled attendance for ${student.name}`)} className="h-7 text-xs">
                      Toggle Status
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      );

    case "progress":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Range-of-Motion & Posture Progress</h1>
              <p className="text-xs text-muted-foreground">Longitudinal flexibility telemetry, goniometer readings & posture alignment scores</p>
            </div>
            <Button onClick={() => toast.success("Added new ROM evaluation reading!")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 font-bold">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Log New ROM Metric
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Avg Hamstring Flexion</p>
              <p className="text-2xl font-extrabold text-foreground">78 Degrees</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+12 deg improvement</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Spinal Extension Score</p>
              <p className="text-2xl font-extrabold text-foreground">8.4 / 10</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Optimal posture</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Breath Capacity (Sama Vritta)</p>
              <p className="text-2xl font-extrabold text-foreground">14 Seconds</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+4s retention</p>
            </Card>
          </div>
        </div>
      );

    case "notifications":
      return <SharedNotificationsView />;

    case "settings":
      return <SharedSettingsView roleLabel="Yoga Instructor" />;

    default:
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground capitalize">{pageKey.replace(/-/g, " ")} Studio</h1>
              <p className="text-xs text-muted-foreground">Yoga therapy schedule and progress monitoring</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs px-3 py-1 font-semibold capitalize">
              {pageKey.replace(/-/g, " ")}
            </Badge>
          </div>

          <Card className="surface-panel p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Studio Workspace Active</h3>
            <p className="text-xs text-muted-foreground">
              Therapeutic yoga workspace synced with patient profiles.
            </p>
          </Card>
        </div>
      );
  }
};

export default YogaDetailPage;
