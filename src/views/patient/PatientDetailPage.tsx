import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patientPages, type PatientPageKey } from "@/data/patient-pages";
import { toast } from "sonner";
import { 
  User, Mail, Phone, Calendar, Heart, ShieldAlert, 
  MapPin, Check, X, Camera, Activity, FileText, CheckCircle,
  Brain, MessageSquare, Compass, Settings, AlertTriangle,
  Paperclip, Mic, Send, Play, Download, Eye, Loader2
} from "lucide-react";
import { format } from "date-fns";
import ApiKeyConfig from "@/components/app/ApiKeyConfig";
import { generateGeminiContent } from "@/lib/gemini";
import SharedSettingsView from "@/components/app/SharedSettingsView";
import SharedNotificationsView from "@/components/app/SharedNotificationsView";
import DietPlannerView from "@/components/patient/DietPlannerView";
import YogaPlannerView from "@/components/patient/YogaPlannerView";
import LifestylePlannerView from "@/components/patient/LifestylePlannerView";
import SleepTrackerView from "@/components/patient/SleepTrackerView";
import WaterIntakeView from "@/components/patient/WaterIntakeView";
import PrescriptionsView from "@/components/patient/PrescriptionsView";
import VitalsTrackerView from "@/components/patient/VitalsTrackerView";
import MoodTrackerView from "@/components/patient/MoodTrackerView";
import CalendarView from "@/components/patient/CalendarView";
import ExerciseTrackerView from "@/components/patient/ExerciseTrackerView";
import PaymentsView from "@/components/patient/PaymentsView";
import MedicalReportsView from "@/components/patient/MedicalReportsView";

type PatientDetailPageProps = {
  pageKey: PatientPageKey;
};

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const defaultProfile = {
  fullName: "Amit Verma",
  email: "patient@nirogi.app",
  phone: "",
  dob: "1995-10-15",
  gender: "Male",
  address: "Sector 15, HSR Layout, Bengaluru, India",
  bloodGroup: "O+",
  height: "178",
  weight: "74",
  primaryGoal: "Stress Relief & Cardio",
  allergies: "Peanuts, Dust pollen",
  conditions: "Mild lower-back stiffness, seasonal asthma",
  emergencyName: "Priya Verma",
  emergencyPhone: "",
  emergencyRelation: "Spouse",
  preferredLanguage: "English & Hindi",
};

const PatientDetailPage = ({ pageKey }: PatientDetailPageProps) => {
  const page = patientPages[pageKey];
  const { user, profile: authProfile, refreshProfile } = useAuth();

  // Profile-specific state
  const [profile, setProfile] = useState(defaultProfile);
  const [formData, setFormData] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [downloadingPlanId, setDownloadingPlanId] = useState<string | null>(null);

  const handleDownloadPlan = (planId: string, planName: string, content: string) => {
    setDownloadingPlanId(planId);
    setTimeout(() => {
      setDownloadingPlanId(null);
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/plain;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = `${planName.replace(/\s+/g, "_")}_Plan.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success(`${planName} plan downloaded successfully!`);
    }, 1500);
  };

  // Load from Supabase Database & LocalStorage fallback
  useEffect(() => {
    if (pageKey === "profile") {
      const loadPatientProfileData = async () => {
        if (user?.id) {
          try {
            const { data: mainProf } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            const { data: patientProf } = await supabase
              .from("patient_profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            const merged = {
              ...defaultProfile,
              fullName: mainProf?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || defaultProfile.fullName,
              email: user.email || defaultProfile.email,
              phone: mainProf?.phone || user.phone || user.user_metadata?.phone || "",
              bloodGroup: patientProf?.blood_group || defaultProfile.bloodGroup,
              conditions: patientProf?.medical_history || defaultProfile.conditions,
              allergies: Array.isArray(patientProf?.allergies) ? patientProf.allergies.join(", ") : defaultProfile.allergies,
              emergencyPhone: patientProf?.emergency_contact || "",
            };

            setProfile(merged);
            setFormData(merged);
            return;
          } catch (e) {
            console.error("Error fetching Supabase profile:", e);
          }
        }

        const saved = localStorage.getItem("nirogi_patient_profile");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setProfile(parsed);
            setFormData(parsed);
          } catch (e) {
            console.error("Error parsing local profile data:", e);
          }
        }
      };

      loadPatientProfileData();
    }
  }, [pageKey, user]);

  const handleSave = async () => {
    setProfile(formData);
    localStorage.setItem("nirogi_patient_profile", JSON.stringify(formData));

    if (user?.id) {
      try {
        await supabase
          .from("profiles")
          .update({
            full_name: formData.fullName,
            phone: formData.phone,
          })
          .eq("id", user.id);

        await supabase
          .from("patient_profiles")
          .upsert({
            id: user.id,
            blood_group: formData.bloodGroup,
            medical_history: formData.conditions,
            emergency_contact: formData.emergencyPhone,
          });

        await refreshProfile();
      } catch (err) {
        console.error("Error updating patient profile:", err);
      }
    }

    setIsEditing(false);
    toast.success("Profile saved and synced to database!");
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    toast.info("Edits cancelled.");
  };

  const updateField = (key: keyof typeof defaultProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // If the page is "profile", render the beautiful editable profile dashboard
  if (pageKey === "profile") {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Profile Header Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop')` }}
          />
          <div className="flex items-center gap-5 z-10">
            <div className="relative group">
              <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-background bg-primary/10 flex items-center justify-center text-primary font-semibold text-2xl md:text-3xl shadow-md">
                {profile.fullName ? profile.fullName.split(" ").map(n => n[0]).join("") : "NT"}
              </div>
              <button className="absolute bottom-0 right-0 h-7 w-7 bg-primary text-white rounded-full flex items-center justify-center border border-background shadow hover:scale-105 transition" aria-label="Change photo">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{profile.fullName}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {profile.email}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {profile.address}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2 z-10 shrink-0">
            <div className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary font-medium flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-primary" /> Profile Verified
            </div>
            <p className="text-xs text-muted-foreground">Patient Strength: <span className="font-semibold text-primary">95%</span></p>
            <div className="w-32 bg-border h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[95%] rounded-full" />
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel} className="gap-1.5">
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Check className="h-4 w-4" /> Save Profile
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Edit Profile
            </Button>
          )}
        </div>

        {/* Details Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Column 1 & 2: Personal and Health Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <Card className="surface-panel shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription>Your registered contact and birth identification details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(val) => updateField("gender", val)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5 md:col-span-2">
                      <Label htmlFor="address">Residential Address</Label>
                      <Input id="address" value={formData.address} onChange={(e) => updateField("address", e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
                    <div className="space-y-0.5 border-b border-border/40 pb-2 md:border-0 md:pb-0">
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-medium text-foreground">{profile.fullName}</p>
                    </div>
                    <div className="space-y-0.5 border-b border-border/40 pb-2 md:border-0 md:pb-0">
                      <p className="text-xs text-muted-foreground">Phone Number</p>
                      <p className="font-medium text-foreground">{profile.phone}</p>
                    </div>
                    <div className="space-y-0.5 border-b border-border/40 pb-2 md:border-0 md:pb-0">
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="font-medium text-foreground">{profile.dob ? format(new Date(profile.dob), "PPP") : ""}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="font-medium text-foreground">{profile.gender}</p>
                    </div>
                    <div className="space-y-0.5 md:col-span-2">
                      <p className="text-xs text-muted-foreground">Residential Address</p>
                      <p className="font-medium text-foreground">{profile.address}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical / Health Profile */}
            <Card className="surface-panel shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Health Profile & Metrics
                </CardTitle>
                <CardDescription>Biometric ranges, allergy profiles, and primary wellness goals.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={formData.bloodGroup} onValueChange={(val) => updateField("bloodGroup", val)}>
                        <SelectTrigger id="bloodGroup">
                          <SelectValue placeholder="Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input id="height" type="number" value={formData.height} onChange={(e) => updateField("height", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" value={formData.weight} onChange={(e) => updateField("weight", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5 md:col-span-3">
                      <Label htmlFor="primaryGoal">Primary Wellness Goal</Label>
                      <Input id="primaryGoal" value={formData.primaryGoal} onChange={(e) => updateField("primaryGoal", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5 md:col-span-3">
                      <Label htmlFor="allergies">Allergies & Dietary Restrictions</Label>
                      <Input id="allergies" value={formData.allergies} onChange={(e) => updateField("allergies", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5 md:col-span-3">
                      <Label htmlFor="conditions">Active Medical Conditions</Label>
                      <Input id="conditions" value={formData.conditions} onChange={(e) => updateField("conditions", e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-sm">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-0.5 border-b border-border/40 pb-2 md:border-0 md:pb-0">
                        <p className="text-xs text-muted-foreground">Blood Group</p>
                        <p className="font-semibold text-foreground text-base">{profile.bloodGroup}</p>
                      </div>
                      <div className="space-y-0.5 border-b border-border/40 pb-2 md:border-0 md:pb-0">
                        <p className="text-xs text-muted-foreground">Height</p>
                        <p className="font-semibold text-foreground text-base">{profile.height} cm</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-semibold text-foreground text-base">{profile.weight} kg</p>
                      </div>
                    </div>
                    
                    <div className="space-y-0.5 border-t border-border/30 pt-3">
                      <p className="text-xs text-muted-foreground">Primary Wellness Goal</p>
                      <p className="font-medium text-foreground">{profile.primaryGoal}</p>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Allergies & Dietary Exclusions</p>
                      <p className="font-medium text-foreground">{profile.allergies || "None logged."}</p>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Active Health/Medical Issues</p>
                      <p className="font-medium text-foreground">{profile.conditions || "None logged."}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Column 3: Emergency Contacts and Security Preferences */}
          <div className="space-y-6">
            
            {/* Emergency Contacts */}
            <Card className="surface-panel shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-primary" /> Emergency Contact
                </CardTitle>
                <CardDescription>Primary emergency response contact details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input id="emergencyName" value={formData.emergencyName} onChange={(e) => updateField("emergencyName", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="emergencyRelation">Relationship</Label>
                      <Input id="emergencyRelation" value={formData.emergencyRelation} onChange={(e) => updateField("emergencyRelation", e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input id="emergencyPhone" value={formData.emergencyPhone} onChange={(e) => updateField("emergencyPhone", e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm space-y-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Contact Name</p>
                      <p className="font-semibold text-foreground">{profile.emergencyName}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Relationship</p>
                      <p className="font-medium text-foreground">{profile.emergencyRelation}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Phone Number</p>
                      <p className="font-medium text-foreground">{profile.emergencyPhone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* General Preferences */}
            <Card className="surface-panel shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Settings & Preferences
                </CardTitle>
                <CardDescription>Preferred interfaces and communications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="preferredLanguage">Preferred Language</Label>
                      <Input id="preferredLanguage" value={formData.preferredLanguage} onChange={(e) => updateField("preferredLanguage", e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm space-y-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Language Selection</p>
                      <p className="font-medium text-foreground">{profile.preferredLanguage}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Security Mode</p>
                      <p className="text-primary font-medium flex items-center gap-1.5 mt-0.5 text-xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" /> 2FA Active
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    );
  }

  if (pageKey === "ai-assistant") {
    return <PatientAiAssistantView />;
  }

  if (pageKey === "ai-dosha-assessment") {
    return <PatientAiDoshaView />;
  }

  if (pageKey === "settings") {
    return <SharedSettingsView roleLabel="Patient" />;
  }

  if (pageKey === "notifications") {
    return <SharedNotificationsView />;
  }

  if (pageKey === "diet-planner") {
    return <DietPlannerView />;
  }

  if (pageKey === "yoga-planner") {
    return <YogaPlannerView />;
  }

  if (pageKey === "lifestyle-planner") {
    return <LifestylePlannerView />;
  }

  if (pageKey === "sleep-tracker") {
    return <SleepTrackerView />;
  }

  if (pageKey === "water-intake") {
    return <WaterIntakeView />;
  }

  if (pageKey === "prescriptions") {
    return <PrescriptionsView />;
  }

  if (pageKey === "blood-pressure" || pageKey === "blood-sugar") {
    return <VitalsTrackerView />;
  }

  if (pageKey === "mood") {
    return <MoodTrackerView />;
  }

  if (pageKey === "calendar") {
    return <CalendarView />;
  }

  if (pageKey === "exercise") {
    return <ExerciseTrackerView />;
  }

  if (pageKey === "payments") {
    return <PaymentsView />;
  }

  if (pageKey === "medical-reports") {
    return <MedicalReportsView />;
  }

  if (pageKey === "health-reports") {
    return (
      <div className="space-y-6 font-['Manrope',sans-serif]">
        <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop')` }}
          />
          <div className="relative z-10">
            <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">{page.title}</h1>
            <p className="mt-1 max-w-2xl text-xs text-muted-foreground">{page.description}</p>
          </div>
          <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{page.focusLabel}</p>
            <p className="mt-0.5 text-xs font-bold text-foreground">{page.focusValue}</p>
          </div>
        </section>

        {/* Downloadable Wellness Plans */}
        <Card className="surface-panel border-border shadow-md">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Downloadable Wellness Plans & Therapeutic Protocols
            </CardTitle>
            <CardDescription>Click to download your condition-specific routines containing nutrition, yoga, and lifestyle instructions.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  id: "plan-metabolic",
                  title: "Metabolic Balancing Program",
                  target: "Type-2 Diabetes & Insulin Resistance",
                  details: "Low-glycemic nutrition & morning yoga sequences.",
                  content: "NIROGI HEALTH SYSTEM: METABOLIC HEALTH PROGRAM\nTarget: Type-2 Diabetes & Glucose Balancing\n\nDaily Diet Routine:\n• Fasting: Warm water with 1g Cinnamon extract\n• Breakfast: Sprouts, boiled egg whites or yellow mung chilla\n• Lunch: Brown rice (1 cup), steamed zucchini, double dal\n• Snacks: Pumpkin seeds and walnuts\n• Dinner (Before 7:30 PM): Quinoa bowl with roasted vegetables\n\nDaily Movement Protocols:\n• Morning Surya Namaskar (5 Rounds)\n• Mandukasana (Frog Pose) - 3 holds of 30s to stimulate pancreas\n• Post-meal walks (10 minutes after dinner)\n\nCreated: July 2026 under Care Coordination Desk."
                },
                {
                  id: "plan-spine",
                  title: "Spine Decompression & Posture",
                  target: "Back Pain & Joint Stiffness",
                  details: "Postural correction routines & vagus nerve breathwork.",
                  content: "NIROGI HEALTH SYSTEM: SPINE MOBILITY & POSTURE CARE\nTarget: Decompression & Lower Back Strain\n\nDaily Movements:\n• Cat-Cow stretch (Marjaryasana) - 10 cycles morning/evening\n• Cobra pose (Bhujangasana) - 5 repetitions, holding 15s each\n• Child's pose (Balasana) - 2 minutes deep breathing relaxation\n\nPostural Adjustments:\n• Keyboard elbow angle: 90 degrees\n• Lumbar support cushion usage\n• Stand & stretch reminder every 45 minutes"
                },
                {
                  id: "plan-gut",
                  title: "Gut Rejuvenation Protocol",
                  target: "IBS, Bloating & Acid Indigestion",
                  details: "Agni-building digestive recipes & herbal tea schedules.",
                  content: "NIROGI HEALTH SYSTEM: GUT BALANCE & AGNI STRENGTH\nTarget: IBS, bloating, and gas elimination\n\nDaily Ayurvedic Guidelines:\n• 15 mins before meals: Warm ginger juice with a pinch of rock salt\n• Avoid iced water with meals; prefer lukewarm sips\n• Spice inclusion: Cumin, fennel, coriander seeds in ghee\n\nRoutine Tea Preparation:\n• Boil 1 tsp cumin, 1 tsp coriander, and 1 tsp fennel seeds in 2 cups of water. Strain and drink throughout the afternoon."
                }
              ].map((p) => (
                <div key={p.id} className="border border-border rounded-xl p-4 flex flex-col justify-between h-44 bg-muted/25 hover:border-primary/20 transition-all text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full block w-fit mb-2">
                      {p.target}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-foreground leading-tight">{p.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-normal">{p.details}</p>
                  </div>
                  <Button
                    onClick={() => handleDownloadPlan(p.id, p.title, p.content)}
                    disabled={downloadingPlanId === p.id}
                    className="w-full text-xs font-bold h-9 bg-primary text-primary-foreground hover:bg-primary/95 rounded-lg mt-3"
                  >
                    {downloadingPlanId === p.id ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Existing health metrics */}
        <section className="grid gap-4 md:grid-cols-3">
          {page.metrics.map((metric) => (
            <Card key={metric.label} className="surface-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle>Priority Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {page.priorities.map((item) => (
                  <li key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="surface-panel">
            <CardHeader>
              <CardTitle>Recent Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {page.timeline.map((item) => (
                  <div key={`${item.time}-${item.event}`} className="rounded-md border border-border bg-background px-3 py-2">
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  // Fallback to standard detailing view for other pageKeys
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{page.title}</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">{page.description}</p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{page.focusLabel}</p>
          <p className="mt-0.5 text-xs font-bold text-foreground">{page.focusValue}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {page.metrics.map((metric) => (
          <Card key={metric.label} className="surface-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Priority Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {page.priorities.map((item) => (
                <li key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Recent Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {page.timeline.map((item) => (
                <div key={`${item.time}-${item.event}`} className="rounded-md border border-border bg-background px-3 py-2">
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const PatientAiAssistantView = () => {
  const [firstName, setFirstName] = useState("Arya");
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string; keyInfo?: string; hasFile?: boolean }>>([
    { 
      role: "model", 
      text: "Hello! I am your Nirogi Tanman AI Assistant. I have successfully analyzed your daily sleep, activity patterns, and recent lab reports. Ask me anything about custom Ayurvedic diets, yoga movements, or daily lifestyle habits." 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Ritual Modals & Log States
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [supplementLogged, setSupplementLogged] = useState(false);

  // Breathing Box Timer State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingSeconds, setBreathingSeconds] = useState(4);
  const [breathingState, setBreathingState] = useState<"Inhale" | "Hold" | "Exhale" | "Hold Out">("Inhale");

  useEffect(() => {
    let interval: any;
    if (breathingActive && showBreathingModal) {
      interval = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            setBreathingState((curr) => {
              switch (curr) {
                case "Inhale": return "Hold";
                case "Hold": return "Exhale";
                case "Exhale": return "Hold Out";
                case "Hold Out": return "Inhale";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, showBreathingModal]);

  // Load first name
  useEffect(() => {
    const saved = localStorage.getItem("nirogi_patient_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fullName) {
          setFirstName(parsed.fullName.split(" ")[0]);
        }
      } catch (err) {
        // Ignore error
      }
    }
  }, []);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    if (!textToSend) setInput("");
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setLoading(true);

    const systemInstruction = 
      "You are the Nirogi Tanman AI Integrative Health Assistant. Your goal is to guide the user in holistic wellness, combining Ayurvedic principles, modern clinical nutrition, and therapeutic yoga. Offer structured, highly practical advice with bullet points where appropriate. Remind the user that your support complements their clinical care team but does not replace formal face-to-face diagnosis.";

    // Custom response to match lab report query
    if (query.toLowerCase().includes("lab report") || query.toLowerCase().includes("check lab")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          role: "model",
          text: "Nirogi AI has analyzed your recent blood test results:\n\nYour serum cortisol is 4.2 mcg/dL, which is clinically low. This is a common trigger for afternoon fatigue. We suggest incorporating Ashwagandha extract in the morning and taking a 5-min Box Breathing session at noon.",
          hasFile: true,
          keyInfo: "Fulfillment: Nirogi Vision Analyzer"
        }]);
        setLoading(false);
      }, 800);
      return;
    }

    const res = await generateGeminiContent(query, systemInstruction);

    if (res.success) {
      setMessages((prev) => [...prev, { 
        role: "model", 
        text: res.text, 
        keyInfo: `Fulfilled via Key #${res.usedKeyIndex + 1}` 
      }]);
    } else {
      setMessages((prev) => [...prev, { 
        role: "model", 
        text: res.error || "An error occurred while connecting to the Gemini engine." 
      }]);
    }
    setLoading(false);
  };

  const handleLogSupplement = () => {
    setSupplementLogged(true);
    toast.success("Ashwagandha supplement intake logged successfully!");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header section matching mockup */}
      <section className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Welcome back, <span className="text-primary font-bold">{firstName}</span>.
          </h1>
          <p className="text-sm text-muted-foreground">
            Your daily wellness synthesis is ready. Nirogi AI has analyzed your sleep and activity patterns.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowConfig(!showConfig)} className="flex items-center gap-1.5 shrink-0 self-start md:self-center">
          <Settings className="h-4 w-4" />
          {showConfig ? "Hide Key Setup" : "Setup API Keys"}
        </Button>
      </section>

      {/* API Configuration Setup block */}
      {showConfig && (
        <div className="animate-in fade-in slide-in-from-top duration-200">
          <ApiKeyConfig />
        </div>
      )}

      {/* Two column grid layout matching mockup */}
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        
        {/* Left Column: Health Vitality & AI Insights */}
        <div className="space-y-6">
          {/* Health Vitality Card */}
          <Card className="surface-panel p-6 flex flex-col items-center justify-between h-[230px]">
            <CardHeader className="p-0 w-full flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Health Vitality</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </CardHeader>
            <CardContent className="p-0 flex flex-col items-center space-y-4">
              <div className="relative flex items-center justify-center">
                <svg className="h-28 w-28" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    className="text-muted/10"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="url(#vitalityGradient)"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.85)}
                    strokeLinecap="round"
                    className="rotate-[-90deg] origin-center transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="vitalityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#85a33d" />
                      <stop offset="100%" stopColor="#4A5D23" />
                    </linearGradient>
                  </defs>
                  <text x="50" y="47" textAnchor="middle" className="text-2xl font-bold fill-foreground font-sans">85</text>
                  <text x="50" y="65" textAnchor="middle" className="text-[9px] font-semibold fill-muted-foreground uppercase tracking-widest">Optimal</text>
                </svg>
              </div>
              <p className="text-xs text-center text-muted-foreground font-medium max-w-[240px]">
                Your Pitta Kapha balance is improving with the current diet.
              </p>
            </CardContent>
          </Card>

          {/* AI Insights Card */}
          <Card className="surface-panel p-6 h-[230px] flex flex-col justify-between">
            <CardHeader className="p-0 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Insights</span>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground leading-relaxed space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p>Deep sleep duration spiked by <span className="font-semibold text-foreground">+14m</span>. Maintain current sleep schedule.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p>HRV tracking indicates full systemic recovery. System is optimized for higher-intensity yoga.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p>Cortisol metrics suggest taking a Box Breathing session before lunch at 12:30 PM.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Chat Box */}
        <Card className="surface-panel flex flex-col justify-between h-[480px] overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div 
                  className={`rounded-lg p-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/70 text-foreground border border-border/40"
                  }`}
                >
                  {msg.text}
                  
                  {/* Mock Lab Report card overlay in chat */}
                  {msg.hasFile && (
                    <div className="flex items-center justify-between rounded-lg border border-border bg-background p-2.5 text-xs w-full max-w-xs mt-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-emerald-700 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground leading-tight">Lab_Report_Jan24.pdf</p>
                          <p className="text-[9px] text-muted-foreground leading-none">Analyzed by Nirogi Vision</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {msg.keyInfo && (
                  <span className="text-[10px] text-muted-foreground mt-1 font-semibold tracking-wide">
                    {msg.keyInfo}
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
                Nirogi AI is formulating recommendations...
              </div>
            )}
          </CardContent>

          {/* Chat Quick Action Pills & Rounded Input Wrapper */}
          <div className="border-t border-border/60 p-3 bg-muted/5 space-y-3">
            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap gap-2 pb-1">
              <button
                onClick={() => handleSend("Analyze my diet protocols")}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
              >
                🍽️ Analyze my diet
              </button>
              <button
                onClick={() => handleSend("Assess my Dosha profile")}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
              >
                🧘 Assess my Dosha
              </button>
              <button
                onClick={() => handleSend("Give me a yoga routine for stress relief")}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
              >
                🌸 Yoga for stress
              </button>
              <button
                onClick={() => handleSend("Check lab report for cortisol levels")}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition flex items-center gap-1"
              >
                📄 Check lab report
              </button>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1 shadow-sm">
              <button className="text-muted-foreground hover:text-primary transition p-1" title="Attach Files">
                <Paperclip className="h-4 w-4" />
              </button>
              <Input
                placeholder="Ask Nirogi about your health..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="border-0 bg-transparent px-0 focus-visible:ring-0 text-sm flex-1 h-8 shadow-none"
                disabled={loading}
              />
              <button className="text-muted-foreground hover:text-primary transition p-1" title="Voice Input">
                <Mic className="h-4 w-4" />
              </button>
              <Button 
                size="icon" 
                onClick={() => handleSend()} 
                disabled={loading || !input.trim()} 
                className="h-7 w-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shrink-0"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>

      </div>

      {/* Upcoming Rituals Section */}
      <section className="space-y-4 pt-4 border-t border-border/40">
        <h2 className="text-xl font-semibold text-foreground tracking-tight font-sans">Upcoming Rituals</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1: Ayurvedic Bowl */}
          <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                🍳
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground leading-tight">Lunch: Ayurvedic Bowl</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  Recommended 12:45 PM for maximum digestive fire (Agni) and Pitta balance.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowRecipeModal(true)} 
              className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
            >
              View Recipe &rarr;
            </button>
          </Card>

          {/* Card 2: Mindfulness Break */}
          <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                🧘
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground leading-tight">Mindfulness Break</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  Nirogi suggests a 5-min Box Breathing session to lower cortisol and anxiety.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowBreathingModal(true)} 
              className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
            >
              Start Session &rarr;
            </button>
          </Card>

          {/* Card 3: Supplement Routine */}
          <Card className="surface-panel p-5 flex flex-col justify-between h-[180px]">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                💊
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground leading-tight">Supplement Routine</h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  Take your Ashwagandha extract with warm water for better adaptogenic absorption.
                </p>
              </div>
            </div>
            {supplementLogged ? (
              <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-2">
                <Check className="h-4 w-4" /> Logged
              </div>
            ) : (
              <button 
                onClick={handleLogSupplement}
                className="text-xs font-semibold text-primary hover:underline text-left mt-2 flex items-center gap-1"
              >
                Log Intake &rarr;
              </button>
            )}
          </Card>
        </div>
      </section>

      {/* Ayurvedic Bowl Recipe Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="surface-panel w-full max-w-md p-6 relative">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowRecipeModal(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg">Ayurvedic Quinoa bowl Recipe</CardTitle>
              <CardDescription>Pitta-soothing lunch routine</CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground space-y-3 leading-relaxed">
              <p className="font-semibold text-foreground">Ingredients:</p>
              <p>• 1/2 cup organic Quinoa (rinsed)</p>
              <p>• 1/2 cup zucchini (diced)</p>
              <p>• 1/2 cup fresh asparagus or yellow mung lentils</p>
              <p>• 1 tbsp ghee, coriander, and pinch of fennel seeds</p>
              
              <p className="font-semibold text-foreground pt-2">Instructions:</p>
              <p>1. Warm ghee in a small pan, toast the fennel and coriander seeds until aromatic.</p>
              <p>2. Add diced zucchini and stir-fry for 2 minutes.</p>
              <p>3. Add quinoa and 1.5 cups of water. Simmer covered for 15 minutes.</p>
              <p>4. Serve warm at noon for peak Agni digestion.</p>
            </CardContent>
            <div className="pt-4 flex justify-end">
              <Button size="sm" onClick={() => setShowRecipeModal(false)}>Close Recipe</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Mindfulness Box Breathing Modal */}
      {showBreathingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="surface-panel w-full max-w-md p-6 relative flex flex-col items-center text-center">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setShowBreathingModal(false);
                setBreathingActive(false);
              }}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg">Mindfulness Box Breathing</CardTitle>
              <CardDescription>Vagal stimulation session to reduce stress</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 py-8 flex flex-col items-center space-y-6 w-full">
              {/* Breathing Circle Visualizer */}
              <div className="relative flex items-center justify-center h-44 w-44">
                <div 
                  className={`absolute rounded-full bg-primary/10 border-4 border-primary transition-all duration-[4000ms] ease-in-out flex items-center justify-center ${
                    breathingState === "Inhale" ? "h-40 w-40" :
                    breathingState === "Hold" ? "h-40 w-40 bg-primary/20" :
                    breathingState === "Exhale" ? "h-20 w-20" :
                    "h-20 w-20 bg-primary/5"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm font-bold text-foreground capitalize transition-all duration-300">{breathingState}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">{breathingSeconds}s</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                {breathingState === "Inhale" && "Inhale slowly through your nose, letting your belly fill with air."}
                {breathingState === "Hold" && "Hold your breath calmly. Keep your shoulders relaxed."}
                {breathingState === "Exhale" && "Exhale gently through your mouth, releasing all muscle tension."}
                {breathingState === "Hold Out" && "Hold your breath out before starting the next inhale."}
              </p>
            </CardContent>

            <div className="flex gap-2 w-full pt-2">
              <Button 
                variant={breathingActive ? "outline" : "default"} 
                className="flex-1"
                onClick={() => setBreathingActive(!breathingActive)}
              >
                {breathingActive ? "Pause" : "Start Session"}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowBreathingModal(false);
                  setBreathingActive(false);
                  setBreathingState("Inhale");
                  setBreathingSeconds(4);
                }}
              >
                Exit
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};

const PatientAiDoshaView = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [usedKey, setUsedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const questions = [
    {
      id: "frame",
      label: "Body Frame & Physical Build",
      description: "Select what matches your natural bone structure and muscle build.",
      options: [
        { value: "vata", label: "Lean, thin, difficult to gain weight, active" },
        { value: "pitta", label: "Medium build, muscular, stable weight, strong" },
        { value: "kapha", label: "Broad build, large bones, gains weight easily, slow" }
      ]
    },
    {
      id: "skin",
      label: "Skin Quality & Coolness",
      description: "How does your skin behave on a regular basis?",
      options: [
        { value: "vata", label: "Dry, rough, thin, feels cool to touch" },
        { value: "pitta", label: "Sensitive, warm, prone to redness, moles, or sweat" },
        { value: "kapha", label: "Oily, thick, smooth, cool, soft and pale" }
      ]
    },
    {
      id: "sleep",
      label: "Sleep Pattern & Depth",
      description: "Select your natural sleeping tendencies.",
      options: [
        { value: "vata", label: "Light sleeper, wakes up frequently, easily disturbed" },
        { value: "pitta", label: "Moderate depth, sound sleep, wakes up early alert" },
        { value: "kapha", label: "Deep sleeper, heavy, hard to wake up, sleeps long" }
      ]
    },
    {
      id: "digestion",
      label: "Appetite & Digestive Flow",
      description: "How is your digestion and hunger stability?",
      options: [
        { value: "vata", label: "Irregular appetite, gas/bloating, variable digestion" },
        { value: "pitta", label: "Intense hunger, must eat on time, strong digestion" },
        { value: "kapha", label: "Moderate but slow appetite, heavy feeling after eating" }
      ]
    },
    {
      id: "stress",
      label: "Stress Response & Mental Trait",
      description: "How do you naturally react to sudden stress?",
      options: [
        { value: "vata", label: "Anxious, fearful, mind starts racing" },
        { value: "pitta", label: "Impatient, easily irritated, competitive" },
        { value: "kapha", label: "Calm, slow to react, peaceful, withdrawn" }
      ]
    }
  ];

  const handleSelect = (value: string) => {
    const currentQ = questions[step];
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    
    const query = `
The user has completed a body constitution questionnaire to find their Ayurvedic Dosha balance.
Here are their answers:
- Body Frame: ${answers.frame}
- Skin: ${answers.skin}
- Sleep: ${answers.sleep}
- Digestion: ${answers.digestion}
- Stress Response: ${answers.stress}

Please analyze these selections and respond with:
1. A breakdown of their Vata, Pitta, and Kapha constitution in percentages (e.g. Vata: 40%, Pitta: 35%, Kapha: 25%) based on these selections.
2. A description of their primary Dosha type and their metabolic profile.
3. Structured, premium dietary recommendations (foods to favor, foods to avoid).
4. Suggested daily routine modifications (dinacharya) and ideal exercise style.

Format the response beautifully with clean headers, bullet points, and highlight the percentage breakdown at the very top.
    `;

    const systemInstruction = 
      "You are the Nirogi Tanman AI Ayurvedic expert. Analyze body constitution parameters carefully and provide helpful, structured traditional advice that integrates with a modern active lifestyle. Always add a standard medical disclaimer at the bottom.";

    const res = await generateGeminiContent(query, systemInstruction);

    if (res.success) {
      setResult(res.text);
      setUsedKey(`Fulfillment: Key #${res.usedKeyIndex + 1}`);
    } else {
      toast.error(res.error || "Failed to call the Gemini API. Add or verify your keys in Key Setup.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setUsedKey(null);
  };

  const vataCount = Object.values(answers).filter(v => v === "vata").length;
  const pittaCount = Object.values(answers).filter(v => v === "pitta").length;
  const kaphaCount = Object.values(answers).filter(v => v === "kapha").length;
  const totalAnswers = Object.keys(answers).length || 1;

  const vataPercent = Math.round((vataCount / totalAnswers) * 100);
  const pittaPercent = Math.round((pittaCount / totalAnswers) * 100);
  const kaphaPercent = Math.round((kaphaCount / totalAnswers) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg border border-border bg-hero-gradient">
        <div className="space-y-1">
          <p className="uppercase-label text-primary">Ayurvedic Assessment</p>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            AI Dosha Assessment
          </h1>
          <p className="text-sm text-muted-foreground">Discover your unique body constitution (Vata, Pitta, Kapha) and routine rules.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowConfig(!showConfig)} className="flex items-center gap-1.5 shrink-0">
          <Settings className="h-4 w-4" />
          {showConfig ? "Hide Key Setup" : "Setup API Keys"}
        </Button>
      </section>

      {/* Collapsible Key Setup */}
      {showConfig && (
        <div className="animate-in fade-in slide-in-from-top duration-200">
          <ApiKeyConfig />
        </div>
      )}

      {/* survey step / result screen */}
      {!result ? (
        <Card className="surface-panel p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground pb-4 border-b border-border/40">
            <span>Question {step + 1} of {questions.length}</span>
            <span className="font-semibold text-primary">{Math.round(((step + 1) / questions.length) * 100)}% Complete</span>
          </div>

          <div className="space-y-4 py-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground tracking-tight">{questions[step].label}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{questions[step].description}</p>
            </div>

            <div className="grid gap-3 pt-2">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left rounded-lg border p-4 text-sm font-medium transition-all duration-200 hover:border-primary/50 hover:bg-muted/10 ${
                    answers[questions[step].id] === opt.value
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-background text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border/40">
            <Button variant="ghost" size="sm" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>
            {step === questions.length - 1 && Object.keys(answers).length === questions.length ? (
              <Button onClick={handleGenerate} disabled={loading} className="px-6 bg-primary text-primary-foreground">
                {loading ? "Analyzing Constitution..." : "Generate Analysis"}
              </Button>
            ) : (
              <span className="text-xs text-muted-foreground italic">Select an option to proceed</span>
            )}
          </div>
        </Card>
      ) : (
        /* Result Screen */
        <Card className="surface-panel p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Ayurvedic Constitution Profile</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Automated assessment summary</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Retake Assessment
            </Button>
          </div>

          {/* Quick Stats visual */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-950/10 p-4 text-center">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Vata (Air/Ether)</p>
              <p className="text-3xl font-extrabold text-blue-700 mt-1">{vataPercent}%</p>
            </div>
            <div className="rounded-lg border border-amber-100 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-950/10 p-4 text-center">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Pitta (Fire/Water)</p>
              <p className="text-3xl font-extrabold text-amber-700 mt-1">{pittaPercent}%</p>
            </div>
            <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10 p-4 text-center">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Kapha (Earth/Water)</p>
              <p className="text-3xl font-extrabold text-emerald-700 mt-1">{kaphaPercent}%</p>
            </div>
          </div>

          {/* Detailed text results */}
          <div className="rounded-lg border border-border/60 bg-muted/20 p-5 text-sm text-foreground leading-relaxed whitespace-pre-line border-t-2 border-t-primary">
            {result}
          </div>

          {usedKey && (
            <div className="text-[10px] text-muted-foreground font-semibold text-right">
              {usedKey}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default PatientDetailPage;