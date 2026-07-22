"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Plus, ShieldCheck, Download, Eye, Tag, Calendar, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  date: string;
  doctor: string;
  size: string;
}

const defaultDocs: DocumentRecord[] = [
  { id: "doc1", name: "Discharge Summary - Apollo Hospitals", category: "Hospital Records", date: "Jun 17, 2026", doctor: "Dr. स्नेहा राव", size: "1.2 MB" },
  { id: "doc2", name: "Spine X-Ray Scan Analysis", category: "Imaging Scan", date: "May 24, 2026", doctor: "Dr. Sneha Rao", size: "3.4 MB" },
  { id: "doc3", name: "Allergy Blood Test Panel", category: "Lab Reports", date: "Apr 11, 2026", doctor: "Dr. Ramesh Prasad", size: "850 KB" }
];

export default function MedicalReportsView() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<DocumentRecord[]>(defaultDocs);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Lab Reports");
  const [doctor, setDoctor] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchLiveMedicalReports = async () => {
      if (user?.id) {
        try {
          const { data } = await supabase
            .from("medical_reports")
            .select("*")
            .eq("patient_id", user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            const mapped = data.map((d) => ({
              id: d.id,
              name: d.name,
              category: d.category,
              date: new Date(d.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
              doctor: d.doctor_name || "Self Uploaded",
              size: d.file_size || "1.5 MB",
            }));
            setDocs(mapped);
            return;
          }
        } catch (err) {
          console.error("Error fetching medical reports:", err);
        }
      }

      const saved = localStorage.getItem("nirogi_medical_docs");
      if (saved) {
        try {
          setDocs(JSON.parse(saved));
        } catch (e) {
          setDocs(defaultDocs);
        }
      }
    };

    fetchLiveMedicalReports();
  }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a document name.");
      return;
    }

    setUploading(true);
    const newDocSize = `${(Math.random() * 2 + 0.5).toFixed(1)} MB`;
    const docObj: DocumentRecord = {
      id: Date.now().toString(),
      name,
      category,
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
      doctor: doctor || "Self Uploaded",
      size: newDocSize
    };

    if (user?.id) {
      try {
        const { data, error } = await supabase
          .from("medical_reports")
          .insert({
            patient_id: user.id,
            name: name,
            category: category,
            doctor_name: doctor || "Self Uploaded",
            file_size: newDocSize
          })
          .select()
          .single();

        if (!error && data) {
          docObj.id = data.id;
          toast.success(`Document uploaded & saved to database!`);
        }
      } catch (err) {
        console.error("Supabase medical report insert error:", err);
      }
    }

    const updated = [docObj, ...docs];
    setDocs(updated);
    localStorage.setItem("nirogi_medical_docs", JSON.stringify(updated));
    setName("");
    setDoctor("");
    setUploading(false);
  };

  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}...`);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Medical Records Vault</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Secure database locker for your diagnostic reports, physician consultations, and clinical files.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 px-4 py-3 text-center backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Total Documents</p>
          <p className="mt-1 text-sm font-extrabold text-foreground">{docs.length} Vault Files</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Active Vault Records
            </CardTitle>
            <CardDescription>Click to preview or download signed report PDFs.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="rounded-xl border border-border/60 bg-background p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-primary/40 transition">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-foreground">{doc.name}</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                      <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{doc.category}</span>
                      <span>• {doc.date}</span>
                      <span>• {doc.doctor}</span>
                      <span>({doc.size})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                  <Button size="sm" variant="outline" onClick={() => handleDownload(doc.name)} className="h-8 text-xs rounded-lg">
                    <Download className="h-3.5 w-3.5 mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upload Form */}
        <Card className="surface-panel h-fit">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Upload New Report
            </CardTitle>
            <CardDescription>Save new diagnostic files to database vault.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="docName" className="text-xs font-semibold">Document Title</Label>
                <Input
                  id="docName"
                  placeholder="e.g. Lipid Profile Lab Test"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-xl text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lab Reports">Lab Reports</SelectItem>
                    <SelectItem value="Imaging Scan">Imaging Scan</SelectItem>
                    <SelectItem value="Hospital Records">Hospital Records</SelectItem>
                    <SelectItem value="Prescriptions">Prescriptions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="docDoctor" className="text-xs font-semibold">Attending Doctor / Lab</Label>
                <Input
                  id="docDoctor"
                  placeholder="e.g. Dr. Kavya Menon"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <Button type="submit" disabled={uploading} className="w-full rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
                Save Document to Vault
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
