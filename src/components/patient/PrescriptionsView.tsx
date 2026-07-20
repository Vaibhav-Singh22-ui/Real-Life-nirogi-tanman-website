"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Pill, Sparkles, Check, Plus, Clock, Stethoscope } from "lucide-react";

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  timeOfDay: string; // e.g. "Morning, Night"
  instructions: string;
  doctor: string;
  refillDue: string;
  morningChecked: boolean;
  afternoonChecked: boolean;
  eveningChecked: boolean;
}

const defaultPrescriptions: Prescription[] = [
  { id: "p1", name: "Ashwagandha Extract (500mg)", dosage: "1 Pill", timeOfDay: "Morning, Night", instructions: "With warm milk after food", doctor: "Dr. Ramesh Prasad", refillDue: "Jul 28", morningChecked: true, afternoonChecked: false, eveningChecked: false },
  { id: "p2", name: "Metformin (500mg)", dosage: "1 Tablet", timeOfDay: "Morning, Night", instructions: "With lunch and dinner", doctor: "Dr. Sneha Rao", refillDue: "Jul 23", morningChecked: true, afternoonChecked: false, eveningChecked: false },
  { id: "p3", name: "Triphala Churna (3g)", dosage: "1 tsp Powder", timeOfDay: "Night", instructions: "With lukewarm water before sleeping", doctor: "Dr. Ramesh Prasad", refillDue: "Aug 02", morningChecked: false, afternoonChecked: false, eveningChecked: false },
  { id: "p4", name: "Liv52 DS Syrup", dosage: "2 tsp", timeOfDay: "Morning, Afternoon", instructions: "Before breakfast and lunch", doctor: "Dr. Sneha Rao", refillDue: "Jul 25", morningChecked: true, afternoonChecked: false, eveningChecked: false }
];

export default function PrescriptionsView() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [times, setTimes] = useState("Morning, Night");
  const [instructions, setInstructions] = useState("");
  const [doctor, setDoctor] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_prescriptions");
    if (saved) {
      try {
        setPrescriptions(JSON.parse(saved));
      } catch (e) {
        setPrescriptions(defaultPrescriptions);
      }
    } else {
      setPrescriptions(defaultPrescriptions);
    }
  }, []);

  const savePrescriptions = (updated: Prescription[]) => {
    setPrescriptions(updated);
    localStorage.setItem("nirogi_prescriptions", JSON.stringify(updated));
  };

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !dosage) {
      toast.error("Please enter a medicine name and dosage.");
      return;
    }

    const newMed: Prescription = {
      id: Date.now().toString(),
      name: medName,
      dosage,
      timeOfDay: times,
      instructions,
      doctor: doctor || "Self Prescribed",
      refillDue: "After 30 days",
      morningChecked: false,
      afternoonChecked: false,
      eveningChecked: false
    };

    savePrescriptions([...prescriptions, newMed]);
    setMedName("");
    setDosage("");
    setInstructions("");
    setDoctor("");
    toast.success(`Prescription Added: ${medName}`);
  };

  const handleCheckDose = (id: string, period: "morning" | "afternoon" | "evening") => {
    const updated = prescriptions.map((p) => {
      if (p.id === id) {
        const key = `${period}Checked` as keyof Prescription;
        const current = p[key] as boolean;
        const updatedObj = { ...p, [key]: !current };
        
        // Notify
        if (!current) {
          toast.success(`Dose logged: ${p.name} - ${period.toUpperCase()}`);
        } else {
          toast.info(`Removed dose record: ${p.name} - ${period.toUpperCase()}`);
        }
        return updatedObj;
      }
      return p;
    });
    savePrescriptions(updated);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Prescriptions</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Manage active medical recipes, timing structures, and daily compliance records. Check off doses as you take them.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Active Medicines</p>
          <p className="mt-1 text-base font-extrabold text-foreground">{prescriptions.length} items</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Adherence Compliance Board */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" /> Daily Dose Adherence
            </CardTitle>
            <CardDescription>Log doses taken under your prescribed routines today.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {prescriptions.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground leading-tight">{p.name}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 font-semibold">{p.dosage} · {p.instructions}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground">
                      <Stethoscope className="h-3 w-3" /> Prescribed by {p.doctor}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {p.timeOfDay.includes("Morning") && (
                      <button 
                        onClick={() => handleCheckDose(p.id, "morning")}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                          p.morningChecked 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-input bg-card hover:border-primary text-muted-foreground"
                        }`}
                      >
                        Morning {p.morningChecked && "✓"}
                      </button>
                    )}
                    {p.timeOfDay.includes("Afternoon") && (
                      <button 
                        onClick={() => handleCheckDose(p.id, "afternoon")}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                          p.afternoonChecked 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-input bg-card hover:border-primary text-muted-foreground"
                        }`}
                      >
                        Afternoon {p.afternoonChecked && "✓"}
                      </button>
                    )}
                    {p.timeOfDay.includes("Night") && (
                      <button 
                        onClick={() => handleCheckDose(p.id, "evening")}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                          p.eveningChecked 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-input bg-card hover:border-primary text-muted-foreground"
                        }`}
                      >
                        Night {p.eveningChecked && "✓"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {prescriptions.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-6">No active prescriptions logged.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          {/* Add Prescription Card */}
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Add Custom Prescription
              </CardTitle>
              <CardDescription>Document medications and schedules in your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddMed} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="med-name" className="text-xs font-bold">Medicine Name</Label>
                  <Input 
                    id="med-name" 
                    placeholder="e.g. Ashwagandha tablets" 
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="med-dose" className="text-xs font-bold">Dosage</Label>
                    <Input 
                      id="med-dose" 
                      placeholder="e.g. 1 Tablet" 
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="med-time" className="text-xs font-bold">Times</Label>
                    <Select value={times} onValueChange={setTimes}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Morning, Night" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning, Night">Morning & Night</SelectItem>
                        <SelectItem value="Morning, Afternoon, Night">Morning, Afternoon & Night</SelectItem>
                        <SelectItem value="Morning">Morning Only</SelectItem>
                        <SelectItem value="Night">Night Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="med-inst" className="text-xs font-bold">Instructions</Label>
                  <Input 
                    id="med-inst" 
                    placeholder="e.g. After food with warm water" 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="med-doc" className="text-xs font-bold">Doctor</Label>
                  <Input 
                    id="med-doc" 
                    placeholder="e.g. Dr. स्नेहा राव" 
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <Button type="submit" className="w-full text-xs font-bold h-9">
                  Add Prescription
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
