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
  Calendar,
  Clock,
  ClipboardList,
  Users,
  UserRound,
  NotebookTabs,
  Stethoscope,
  Video,
  Pill,
  FileText,
  BadgeDollarSign,
  TrendingUp,
  CheckCircle2,
  Plus,
  Search,
  Download,
  Send,
  Eye,
  Activity,
  Filter,
  Sparkles,
  Phone,
  Mail,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Brain,
  MessageSquare,
  CreditCard,
  Building2,
  FileCheck,
  HeartPulse,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DoctorDetailPageProps = {
  pageKey: string;
};

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({ pageKey }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // State for Prescription Builder
  const [prescriptions, setPrescriptions] = useState([
    { name: "Ashwagandha (KSM-66)", type: "Adaptogen Extract", dosage: "500 mg", frequency: "Twice daily after meals", duration: "30 Days" },
    { name: "Triphala Churna", type: "Ayurvedic Herbal Compound", dosage: "1 tsp", frequency: "At bedtime with warm water", duration: "15 Days" },
  ]);
  const [newMed, setNewMed] = useState({ name: "", type: "Adaptogen", dosage: "", frequency: "", duration: "" });

  const handleAddMed = () => {
    if (!newMed.name || !newMed.dosage) {
      toast.error("Please fill in medication name and dosage.");
      return;
    }
    setPrescriptions(prev => [...prev, newMed]);
    setNewMed({ name: "", type: "Adaptogen", dosage: "", frequency: "", duration: "" });
    toast.success("Medication added to draft prescription.");
  };

  const handleSendRx = () => {
    toast.success("Prescription signed digitally & dispatched to patient app!");
  };

  // Render specialized UI views based on pageKey
  switch (pageKey) {
    case "todays-schedule":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Today's Schedule Timeline</h1>
              <p className="text-xs text-muted-foreground">Manage your OPD & telehealth appointments for today</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 font-semibold">
              <Clock className="h-3.5 w-3.5 mr-1" /> 18 Sessions Scheduled
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="surface-panel p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Morning Shift</p>
                <p className="text-lg font-bold text-foreground">09:00 AM - 01:30 PM</p>
                <p className="text-[11px] text-blue-600 font-semibold">10 Appointments</p>
              </div>
            </Card>

            <Card className="surface-panel p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Afternoon Telehealth</p>
                <p className="text-lg font-bold text-foreground">02:30 PM - 05:00 PM</p>
                <p className="text-[11px] text-purple-600 font-semibold">5 Video Calls</p>
              </div>
            </Card>

            <Card className="surface-panel p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Evening Review</p>
                <p className="text-lg font-bold text-foreground">05:30 PM - 07:00 PM</p>
                <p className="text-[11px] text-emerald-600 font-semibold">3 Follow-ups</p>
              </div>
            </Card>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Timeline Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: "09:30 AM", patient: "Aisha Mehta", type: "Metabolic Review", mode: "In-Clinic", status: "In Progress" },
                { time: "10:00 AM", patient: "Rohan Bhatia", type: "Sleep Disorders", mode: "Telehealth", status: "Waiting" },
                { time: "10:30 AM", patient: "Karan Sharma", type: "Hypertension Follow-up", mode: "In-Clinic", status: "Scheduled" },
                { time: "11:00 AM", patient: "Meera Verma", type: "Preventive Health Check", mode: "Telehealth", status: "Scheduled" },
                { time: "11:30 AM", patient: "Siddharth Malhotra", type: "Chronic Fatigue Evaluation", mode: "In-Clinic", status: "Completed" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-background hover:border-primary/40 transition">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-primary w-20">{item.time}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.patient}</p>
                      <p className="text-xs text-muted-foreground">{item.type} · {item.mode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={item.status === "In Progress" ? "bg-purple-500/10 text-purple-600 border-purple-500/20" : item.status === "Waiting" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}>
                      {item.status}
                    </Badge>
                    <Button size="sm" className="h-8 text-xs">Start Session</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      );

    case "appointments":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Appointments Pipeline</h1>
              <p className="text-xs text-muted-foreground">Filter, schedule, and review patient consultation bookings</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 text-xs h-9"
              />
              <Button size="sm" className="h-9 text-xs"><Plus className="h-3.5 w-3.5 mr-1" /> New Booking</Button>
            </div>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Upcoming & Past Appointments</CardTitle>
                <div className="flex items-center gap-1.5 bg-muted p-1 rounded-lg">
                  {["all", "confirmed", "telehealth", "completed"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition ${activeFilter === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Consultation Focus</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Aisha Mehta", id: "P-8821", date: "Today, 09:30 AM", focus: "Metabolic Review", mode: "In-Clinic", status: "Confirmed" },
                    { name: "Rohan Bhatia", id: "P-4392", date: "Today, 10:00 AM", focus: "Sleep Disorders", mode: "Telehealth", status: "Confirmed" },
                    { name: "Karan Sharma", id: "P-1093", date: "Today, 10:30 AM", focus: "Hypertension", mode: "In-Clinic", status: "In Consultation" },
                    { name: "Deepak Joshi", id: "P-5510", date: "Tomorrow, 02:00 PM", focus: "Ayurvedic Detox", mode: "In-Clinic", status: "Scheduled" },
                    { name: "Sneha Kapur", id: "P-7729", date: "24 Jul, 04:30 PM", focus: "Thyroid Management", mode: "Telehealth", status: "Confirmed" },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <p className="font-bold text-xs text-foreground">{row.name}</p>
                        <p className="text-[11px] text-muted-foreground">{row.id}</p>
                      </TableCell>
                      <TableCell className="text-xs font-semibold">{row.date}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.focus}</TableCell>
                      <TableCell className="text-xs">
                        <span className="inline-flex items-center gap-1 font-medium">
                          {row.mode === "Telehealth" ? <Video className="h-3 w-3 text-primary" /> : <Stethoscope className="h-3 w-3 text-emerald-600" />}
                          {row.mode}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-7 text-xs">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );

    case "patient-details":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Electronic Health Record (EHR) Deep-Dive</h1>
              <p className="text-xs text-muted-foreground">Comprehensive longitudinal medical chart & diagnostics profile</p>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search patient by name or ID..." className="w-60 text-xs h-9" />
              <Button size="sm" className="h-9 text-xs"><Download className="h-3.5 w-3.5 mr-1" /> Export Chart PDF</Button>
            </div>
          </div>

          <Card className="surface-panel p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-border/40 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-xl shrink-0">
                  AM
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-foreground">Aisha Mehta</h2>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-bold">Active Care Plan</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">34 yrs · Female · Blood Group: O+ · Height: 165cm · Weight: 62kg</p>
                  <p className="text-xs text-muted-foreground">Primary Care Physician: Dr. Kavya Menon, MD · Patient ID: #P-8821</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" className="h-9 text-xs"><Phone className="h-3.5 w-3.5 mr-1" /> +91 98765 12345</Button>
                <Button size="sm" variant="outline" className="h-9 text-xs"><Mail className="h-3.5 w-3.5 mr-1" /> aisha.m@nirogi.app</Button>
                <Button size="sm" className="h-9 text-xs"><Stethoscope className="h-3.5 w-3.5 mr-1" /> Start New Consult</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                <p className="text-[11px] text-muted-foreground">Blood Pressure</p>
                <p className="text-lg font-extrabold text-foreground">122/78 mmHg</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Normal (Optimum)</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                <p className="text-[11px] text-muted-foreground">Heart Rate (Resting)</p>
                <p className="text-lg font-extrabold text-foreground">74 bpm</p>
                <p className="text-[10px] text-amber-600 font-semibold">+6 bpm 3-day trend</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                <p className="text-[11px] text-muted-foreground">Fasting Blood Glucose</p>
                <p className="text-lg font-extrabold text-foreground">98 mg/dL</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Normal range</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                <p className="text-[11px] text-muted-foreground">SpO2 Oxygen</p>
                <p className="text-lg font-extrabold text-foreground">99%</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Optimal</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <NotebookTabs className="h-5 w-5 text-primary" /> Diagnoses & Medical History
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-border/60 bg-background space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-foreground">Metabolic Fatigue Syndrome (ICD-10 R53.83)</p>
                    <span className="text-[10px] text-muted-foreground">Logged 12 Jun 2026</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Associated with salivary cortisol diurnal slope variation and high work stress.</p>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-background space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-foreground">Mild Allergic Rhinitis (ICD-10 J30.9)</p>
                    <span className="text-[10px] text-muted-foreground">Logged 04 Mar 2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Triggers include dust pollen and peanut trace exposure.</p>
                </div>
              </div>
            </Card>

            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" /> Active Prescription Regimen
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-border/60 bg-background space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-foreground">Ashwagandha KSM-66 Extract</p>
                    <Badge variant="outline" className="text-[10px]">500 mg · Twice Daily</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Dosage: After breakfast and dinner. Purpose: HPA-axis cortisol stabilization.</p>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-background space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-foreground">Triphala Organic Churna</p>
                    <Badge variant="outline" className="text-[10px]">1 tsp · Bedtime</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Dosage: With warm water. Purpose: Gut microbiome and digestive motility support.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );

    case "revenue":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clinical Revenue & Earnings Dashboard</h1>
              <p className="text-xs text-muted-foreground">Consultation fees, telehealth payouts, and tax receipts tracker</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs px-3 py-1 font-semibold">
              <BadgeDollarSign className="h-3.5 w-3.5 mr-1" /> Next Payout: ₹28,400 (This Friday)
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Total Monthly Revenue</p>
              <p className="text-2xl font-extrabold text-foreground">₹1,84,500</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+18% vs last month</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">In-Clinic Consultations</p>
              <p className="text-2xl font-extrabold text-foreground">₹1,42,000</p>
              <p className="text-[11px] text-muted-foreground">118 OPD Sessions</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Telehealth Video Calls</p>
              <p className="text-2xl font-extrabold text-foreground">₹42,500</p>
              <p className="text-[11px] text-muted-foreground">42 Virtual Calls</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Average Fee / Consult</p>
              <p className="text-2xl font-extrabold text-foreground">₹1,150</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Standard OPD rate</p>
            </Card>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Payout & Settlement History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Settlement ID</TableHead>
                    <TableHead>Payout Date</TableHead>
                    <TableHead>Sessions Included</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Tax Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "SET-9901", date: "15 Jul 2026", sessions: "38 Consultations", amount: "₹43,700", status: "Settled & Dispatched" },
                    { id: "SET-9842", date: "30 Jun 2026", sessions: "42 Consultations", amount: "₹48,300", status: "Settled & Dispatched" },
                    { id: "SET-9781", date: "15 Jun 2026", sessions: "35 Consultations", amount: "₹40,250", status: "Settled & Dispatched" },
                    { id: "SET-9710", date: "31 May 2026", sessions: "45 Consultations", amount: "₹51,750", status: "Settled & Dispatched" },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-xs text-foreground">{row.id}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.date}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.sessions}</TableCell>
                      <TableCell className="text-xs font-bold text-emerald-600">{row.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs"><Download className="h-3.5 w-3.5 mr-1" /> Invoice</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );

    case "prescription-builder":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Digital E-Prescription Builder</h1>
              <p className="text-xs text-muted-foreground">Compose certified adaptogens, herbs & medication regimens</p>
            </div>
            <Button onClick={handleSendRx} className="shadow-md text-xs h-9">
              <Send className="h-3.5 w-3.5 mr-1.5" /> Sign & Dispatch E-Rx
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-6">
            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" /> Add Medication / Adaptogen
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Medication / Herbal Name</Label>
                  <Input
                    placeholder="e.g. Brahmi Vati, Ashwagandha, Metformin"
                    value={newMed.name}
                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Type / Classification</Label>
                  <Input
                    placeholder="e.g. Adaptogen, Herbal Extract, Allopathic"
                    value={newMed.type}
                    onChange={(e) => setNewMed({ ...newMed, type: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Dosage & Quantity</Label>
                  <Input
                    placeholder="e.g. 500 mg, 1 tablet"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Frequency & Timing</Label>
                  <Input
                    placeholder="e.g. Twice daily after meals"
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs">Duration</Label>
                  <Input
                    placeholder="e.g. 30 Days"
                    value={newMed.duration}
                    onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <Button onClick={handleAddMed} variant="secondary" className="w-full text-xs h-9">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Item to Prescription List
              </Button>
            </Card>

            <Card className="surface-panel p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Draft Prescription Summary</h3>
                  <p className="text-xs text-muted-foreground">Patient: Aisha Mehta (#P-8821)</p>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                  Active Draft
                </Badge>
              </div>

              <div className="space-y-3">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-background space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-foreground">{rx.name}</p>
                      <Badge variant="outline" className="text-[10px]">{rx.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Dosage: {rx.dosage} · {rx.frequency}</p>
                    <p className="text-[11px] text-primary font-semibold">Duration: {rx.duration}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      );

    case "notifications":
      return <SharedNotificationsView roleLabel="Doctor" />;

    case "settings":
      return <SharedSettingsView roleLabel="Doctor" />;

    default:
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground capitalize">{pageKey.replace(/-/g, " ")} Workspace</h1>
              <p className="text-xs text-muted-foreground">Clinical management and care coordination tools</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 font-semibold capitalize">
              {pageKey.replace(/-/g, " ")}
            </Badge>
          </div>

          <Card className="surface-panel p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Clinical Workspace Active</h3>
            <p className="text-xs text-muted-foreground">
              Clinical management workspace synced with patient care records.
            </p>
          </Card>
        </div>
      );
  }
};

export default DoctorDetailPage;
