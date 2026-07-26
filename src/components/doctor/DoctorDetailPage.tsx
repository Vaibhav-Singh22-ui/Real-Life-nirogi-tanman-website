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
  PhoneOff,
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
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl border border-border/60 bg-background hover:border-primary/40 transition gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-primary w-20 shrink-0">{item.time}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.patient}</p>
                      <p className="text-xs text-muted-foreground">{item.type} · {item.mode}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                    <Badge variant="outline" className={item.status === "In Progress" ? "bg-purple-500/10 text-purple-600 border-purple-500/20" : item.status === "Waiting" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}>
                      {item.status}
                    </Badge>
                    <Button size="sm" className="w-full sm:w-auto h-8 text-xs">Start Session</Button>
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 text-xs h-9"
              />
              <Button size="sm" className="h-9 text-xs w-full sm:w-auto"><Plus className="h-3.5 w-3.5 mr-1" /> New Booking</Button>
            </div>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base font-bold">Upcoming & Past Appointments</CardTitle>
                <div className="flex flex-wrap items-center gap-1.5 bg-muted p-1 rounded-lg">
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
            <CardContent className="overflow-x-auto">
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

    case "patient-queue":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">OPD & Telehealth Patient Triage Queue</h1>
              <p className="text-xs text-muted-foreground">Real-time checked-in patients awaiting clinical consultation</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button onClick={() => toast.success("Calling Next Patient: Aisha Mehta to Consultation Room #2")} className="bg-primary text-primary-foreground text-xs h-9 font-bold">
                <Phone className="h-3.5 w-3.5 mr-1.5" /> Call Next Patient
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="surface-panel p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Waiting Room Total</p>
                <p className="text-2xl font-extrabold text-foreground">8 Patients</p>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs">Avg Wait: 14m</Badge>
            </Card>
            <Card className="surface-panel p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">In Consultation</p>
                <p className="text-2xl font-extrabold text-foreground">2 Sessions</p>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-xs">Active Desk</Badge>
            </Card>
            <Card className="surface-panel p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-extrabold text-foreground">12 OPD Patients</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">96% On Time</Badge>
            </Card>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base font-bold">Live Checked-In Queue Roster</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Filter queue by patient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-xs h-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { queueNo: "Q-01", name: "Aisha Mehta", age: "34/F", time: "09:30 AM", status: "In Consultation", mode: "In-Clinic", priority: "Normal" },
                { queueNo: "Q-02", name: "Rohan Bhatia", age: "45/M", time: "10:00 AM", status: "Waiting", mode: "Telehealth", priority: "High" },
                { queueNo: "Q-03", name: "Karan Sharma", age: "29/M", time: "10:30 AM", status: "Checked In", mode: "In-Clinic", priority: "Normal" },
                { queueNo: "Q-04", name: "Meera Verma", age: "52/F", time: "11:00 AM", status: "Checked In", mode: "Telehealth", priority: "Normal" },
              ].filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <div key={item.queueNo} className="p-4 rounded-xl border border-border/60 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-primary/40 transition">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-lg shrink-0">{item.queueNo}</span>
                    <div>
                      <p className="font-extrabold text-sm text-foreground">{item.name} <span className="text-xs text-muted-foreground font-normal">({item.age})</span></p>
                      <p className="text-xs text-muted-foreground">Scheduled: {item.time} · Mode: {item.mode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                    <Badge variant="outline" className={item.priority === "High" ? "bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs"}>
                      {item.priority} Priority
                    </Badge>
                    <Button size="sm" onClick={() => toast.success(`Started consultation for ${item.name}`)} className="h-8 text-xs font-bold">
                      Start Consult
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      );

    case "consultation":
    case "video-call":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Active Telehealth & Clinical Consultation Suite</h1>
              <p className="text-xs text-muted-foreground">Live HD video stream, digital stethoscope & real-time clinical notes</p>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/20 text-xs px-3 py-1 font-bold animate-pulse">
              <Video className="h-3.5 w-3.5 mr-1" /> Session Live: 14m 22s
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6">
            <Card className="surface-panel overflow-hidden border-border/80 shadow-lg flex flex-col justify-between">
              <div className="relative aspect-video bg-slate-900 rounded-t-xl overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
                  alt="Patient Video Telehealth Stream"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Aisha Mehta (#P-8821)
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur-md p-2 rounded-2xl border border-border shadow-xl">
                  <Button size="icon" variant="outline" onClick={() => toast.info("Microphone toggled")} className="h-10 w-10 rounded-xl">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => toast.info("Video camera toggled")} className="h-10 w-10 rounded-xl">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => toast.success("Consultation session ended and archived.")} className="h-10 w-10 rounded-xl font-bold">
                    <PhoneOff className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">Network Latency: <strong className="text-emerald-600">18ms (Optimal)</strong></span>
                  <span className="font-semibold text-muted-foreground">Audio Stream: <strong className="text-foreground">Encrypted WebRTC</strong></span>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-panel shadow-md p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
                <FileText className="h-4 w-4 text-primary" /> Live Clinical Notes & Observation
              </h3>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Subjective Symptoms</Label>
                  <Input placeholder="Patient complains of evening fatigue and restless sleep..." className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Objective Vitals Telemetry</Label>
                  <Input placeholder="BP: 122/78 mmHg | HR: 74 bpm | Temp: 98.4 F" className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Ayurvedic Samprapti & Assessment</Label>
                  <Input placeholder="Vata aggravation in Manovaha Srotas with mild Agni Mandya" className="text-xs h-9" />
                </div>
                <Button onClick={() => toast.success("Clinical note saved to patient record!")} className="w-full text-xs font-bold h-9 mt-2">
                  Save Clinical Note
                </Button>
              </div>
            </Card>
          </div>
        </div>
      );

    case "medical-notes":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clinical SOAP Notes Editor</h1>
              <p className="text-xs text-muted-foreground">Structured clinical documentation (Subjective, Objective, Assessment, Plan)</p>
            </div>
            <Button onClick={() => toast.success("SOAP note compiled & attached to patient EHR!")} className="bg-primary text-primary-foreground text-xs h-9 font-bold">
              <FileCheck className="h-3.5 w-3.5 mr-1.5" /> Save & Sign SOAP Note
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="surface-panel p-5 space-y-3">
              <Label className="text-xs font-bold text-primary uppercase tracking-wider">Subjective (S)</Label>
              <textarea
                placeholder="Patient history, chief complaint, symptom onset, and subjective severity ratings..."
                className="w-full h-32 p-3 text-xs rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </Card>
            <Card className="surface-panel p-5 space-y-3">
              <Label className="text-xs font-bold text-primary uppercase tracking-wider">Objective (O)</Label>
              <textarea
                placeholder="Physical examination findings, vital signs telemetry, diagnostic lab markers..."
                className="w-full h-32 p-3 text-xs rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </Card>
            <Card className="surface-panel p-5 space-y-3">
              <Label className="text-xs font-bold text-primary uppercase tracking-wider">Assessment (A)</Label>
              <textarea
                placeholder="Differential diagnoses, ICD-10 coding, Ayurvedic Dosha imbalance evaluation..."
                className="w-full h-32 p-3 text-xs rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </Card>
            <Card className="surface-panel p-5 space-y-3">
              <Label className="text-xs font-bold text-primary uppercase tracking-wider">Plan (P)</Label>
              <textarea
                placeholder="Prescription regimen, follow-up timeline, dietary modifications, diagnostic orders..."
                className="w-full h-32 p-3 text-xs rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </Card>
          </div>
        </div>
      );

    case "reports":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Diagnostic Lab Reports & Scans Desk</h1>
              <p className="text-xs text-muted-foreground">Review, verify, and approve diagnostic findings submitted by lab portals</p>
            </div>
            <Button onClick={() => toast.success("Lab report batch approved & attached to patient profile.")} className="bg-primary text-primary-foreground text-xs h-9 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Approve Batch
            </Button>
          </div>

          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold">Pending Diagnostic Review Queue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { name: "Aisha Mehta", doc: "Cortisol Diurnal Rhythm Panel", date: "Jul 22, 2026", status: "Flagged High", size: "1.4 MB" },
                { name: "Rohan Bhatia", doc: "Polysomnography Sleep Study", date: "Jul 20, 2026", status: "Normal", size: "4.8 MB" },
                { name: "Karan Sharma", doc: "Lipid Profile & HbA1c", date: "Jul 18, 2026", status: "Normal", size: "920 KB" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/60 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-primary/40 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <p className="font-extrabold text-xs text-foreground">{item.doc}</p>
                      <p className="text-[11px] text-muted-foreground">Patient: {item.name} · Date: {item.date} ({item.size})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                    <Badge variant="outline" className={item.status.includes("High") ? "bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs"}>
                      {item.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Downloading PDF for ${item.doc}`)} className="h-8 text-xs font-bold">
                      <Download className="h-3.5 w-3.5 mr-1" /> PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      );

    case "availability":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">OPD & Telehealth Slot Manager</h1>
              <p className="text-xs text-muted-foreground">Configure weekly consultation working hours and video call slots</p>
            </div>
            <Button onClick={() => toast.success("Working schedule & consultation slots updated!")} className="bg-primary text-primary-foreground text-xs h-9 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Save Weekly Schedule
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
                <Clock className="h-5 w-5 text-primary" /> Shift Hours & Slot Timings
              </h3>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Morning OPD Shift</Label>
                  <Input defaultValue="09:00 AM - 01:30 PM" className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Afternoon Telehealth Shift</Label>
                  <Input defaultValue="02:30 PM - 05:00 PM" className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold">Consultation Slot Duration</Label>
                  <Input defaultValue="20 Minutes per patient" className="text-xs h-9" />
                </div>
              </div>
            </Card>

            <Card className="surface-panel p-5 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
                <Calendar className="h-5 w-5 text-primary" /> Active Working Days
              </h3>
              <div className="space-y-2.5">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                  <div key={day} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-background text-xs font-bold">
                    <span>{day}</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">Active Shifts</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      );

    case "analytics":
    case "medical-history":
      return (
        <div className="space-y-6 font-['Manrope',sans-serif]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clinical Performance & Longitudinal Analytics</h1>
              <p className="text-xs text-muted-foreground">Practice metrics, patient compliance, and diagnostic recovery rates</p>
            </div>
            <Button onClick={() => toast.success("Analytics report downloaded.")} className="bg-primary text-primary-foreground text-xs h-9 font-bold">
              <Download className="h-3.5 w-3.5 mr-1.5" /> Download Analytics PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Total Consultations</p>
              <p className="text-2xl font-extrabold text-foreground">348 Sessions</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+14% vs last month</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Patient Satisfaction</p>
              <p className="text-2xl font-extrabold text-foreground">4.9 / 5.0</p>
              <p className="text-[11px] text-emerald-600 font-semibold">98% positive reviews</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Rx Adherence Rate</p>
              <p className="text-2xl font-extrabold text-foreground">91%</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Optimal compliance</p>
            </Card>
            <Card className="surface-panel p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Avg Resolution Time</p>
              <p className="text-2xl font-extrabold text-foreground">18 Days</p>
              <p className="text-[11px] text-emerald-600 font-semibold">-3 days recovery</p>
            </Card>
          </div>
        </div>
      );

    case "notifications":
      return <SharedNotificationsView />;

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
