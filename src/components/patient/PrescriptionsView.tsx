"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Pill, Sparkles, Check, Plus, Clock, Stethoscope, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  timeOfDay: string;
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
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(defaultPrescriptions);
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [times, setTimes] = useState("Morning, Night");
  const [instructions, setInstructions] = useState("");
  const [doctor, setDoctor] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLivePrescriptions = async () => {
      if (user?.id) {
        try {
          const { data } = await supabase
            .from("prescriptions")
            .select("*")
            .eq("patient_id", user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            const mapped = data.map((p) => ({
              id: p.id,
              name: p.name,
              dosage: p.dosage,
              timeOfDay: p.time_of_day || "Morning, Night",
              instructions: p.instructions || "As advised",
              doctor: p.doctor_name || "Self Added",
              refillDue: p.refill_due || "30 Days",
              morningChecked: p.morning_checked || false,
              afternoonChecked: p.afternoon_checked || false,
              eveningChecked: p.evening_checked || false,
            }));
            setPrescriptions(mapped);
            return;
          }
        } catch (err) {
          console.error("Error fetching prescriptions:", err);
        }
      }

      const saved = localStorage.getItem("nirogi_prescriptions");
      if (saved) {
        try {
          setPrescriptions(JSON.parse(saved));
        } catch (e) {
          setPrescriptions(defaultPrescriptions);
        }
      }
    };

    fetchLivePrescriptions();
  }, [user]);

  const handleAddMed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !dosage) {
      toast.error("Please enter a medicine name and dosage.");
      return;
    }

    setSaving(true);
    const newRx: Prescription = {
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

    if (user?.id) {
      try {
        const { data, error } = await supabase
          .from("prescriptions")
          .insert({
            patient_id: user.id,
            name: medName,
            dosage: dosage,
            time_of_day: times,
            instructions: instructions,
            doctor_name: doctor || "Self Prescribed",
            refill_due: "After 30 days"
          })
          .select()
          .single();

        if (!error && data) {
          newRx.id = data.id;
          toast.success(`Prescription saved to database!`);
        }
      } catch (err) {
        console.error("Supabase prescription insert error:", err);
      }
    }

    const updated = [...prescriptions, newRx];
    setPrescriptions(updated);
    localStorage.setItem("nirogi_prescriptions", JSON.stringify(updated));
    setMedName("");
    setDosage("");
    setInstructions("");
    setDoctor("");
    setSaving(false);
  };

  const handleCheckDose = async (id: string, period: "morning" | "afternoon" | "evening") => {
    const updated = prescriptions.map((p) => {
      if (p.id === id) {
        const key = `${period}Checked` as keyof Prescription;
        const current = p[key] as boolean;
        const updatedObj = { ...p, [key]: !current };
        
        if (!current) {
          toast.success(`Dose logged: ${p.name} - ${period.toUpperCase()}`);
        } else {
          toast.info(`Removed dose record: ${p.name} - ${period.toUpperCase()}`);
        }
        return updatedObj;
      }
      return p;
    });

    setPrescriptions(updated);
    localStorage.setItem("nirogi_prescriptions", JSON.stringify(updated));

    if (user?.id) {
      const target = updated.find(p => p.id === id);
      if (target) {
        try {
          await supabase
            .from("prescriptions")
            .update({
              morning_checked: target.morningChecked,
              afternoon_checked: target.afternoonChecked,
              evening_checked: target.eveningChecked,
            })
            .eq("id", id);
        } catch (err) {
          console.error("Error updating dose check:", err);
        }
      }
    }
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Digital Prescription Cabinet</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Manage your daily herbal adaptogens, pharmaceutical schedules, and dose logs.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base flex items-center gap-2">
              <Pill className="h-4 w-4 text-primary" /> Active Prescription List
            </CardTitle>
            <CardDescription>Click dose checkboxes to log daily intake.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="rounded-xl border border-border/60 bg-background p-4 space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-foreground">{rx.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Dosage: {rx.dosage} · {rx.instructions}</p>
                    <p className="text-[11px] text-primary font-semibold mt-0.5">Doctor: {rx.doctor}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                  <Button
                    size="sm"
                    variant={rx.morningChecked ? "default" : "outline"}
                    onClick={() => handleCheckDose(rx.id, "morning")}
                    className={`h-7 text-xs rounded-lg ${rx.morningChecked ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                  >
                    {rx.morningChecked && <Check className="h-3 w-3 mr-1" />} Morning
                  </Button>

                  <Button
                    size="sm"
                    variant={rx.afternoonChecked ? "default" : "outline"}
                    onClick={() => handleCheckDose(rx.id, "afternoon")}
                    className={`h-7 text-xs rounded-lg ${rx.afternoonChecked ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                  >
                    {rx.afternoonChecked && <Check className="h-3 w-3 mr-1" />} Afternoon
                  </Button>

                  <Button
                    size="sm"
                    variant={rx.eveningChecked ? "default" : "outline"}
                    onClick={() => handleCheckDose(rx.id, "evening")}
                    className={`h-7 text-xs rounded-lg ${rx.eveningChecked ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                  >
                    {rx.eveningChecked && <Check className="h-3 w-3 mr-1" />} Evening / Night
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Form */}
        <Card className="surface-panel h-fit">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Add Medication / Supplement
            </CardTitle>
            <CardDescription>Log new prescription item to database.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleAddMed} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="medName" className="text-xs font-semibold">Medication Name</Label>
                <Input
                  id="medName"
                  placeholder="e.g. Ashwagandha 500mg"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dosage" className="text-xs font-semibold">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g. 1 Pill / 1 tsp"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="instructions" className="text-xs font-semibold">Instructions</Label>
                <Input
                  id="instructions"
                  placeholder="e.g. Take with warm water before sleep"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <Button type="submit" disabled={saving} className="w-full rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90">
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
                Add Prescription Item
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
