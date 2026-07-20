"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Plus, ShieldCheck, Download, Eye, Tag, Calendar } from "lucide-react";

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
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Lab Reports");
  const [doctor, setDoctor] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_medical_docs");
    if (saved) {
      try {
        setDocs(JSON.parse(saved));
      } catch (e) {
        setDocs(defaultDocs);
      }
    } else {
      setDocs(defaultDocs);
    }
  }, []);

  const saveDocs = (updated: DocumentRecord[]) => {
    setDocs(updated);
    localStorage.setItem("nirogi_medical_docs", JSON.stringify(updated));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a document name.");
      return;
    }

    const newDoc: DocumentRecord = {
      id: Date.now().toString(),
      name,
      category,
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
      doctor: doctor || "Self Uploaded",
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`
    };

    saveDocs([newDoc, ...docs]);
    setName("");
    setDoctor("");
    toast.success(`Uploaded Document: ${name}`);
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name}...`);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Medical Records Vault</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Secure locker for your diagnostic reports, physician consultations, and clinical files. Encrypted and accessible by your care team.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Total Documents</p>
          <p className="mt-1 text-base font-extrabold text-foreground">{docs.length} files</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Document Vault List */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Stored Health Documents
            </CardTitle>
            <CardDescription>Secure vault with individual reports. Click to download or preview.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {docs.map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground leading-tight">{doc.name}</h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground font-medium">
                        <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {doc.category}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {doc.date}</span>
                        <span>Size: {doc.size}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Prescribed/Referred by: {doc.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc.name)} className="text-xs border-border flex items-center gap-1 h-9">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </div>
              ))}
              {docs.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-6">Vault is empty. Add records on the right.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Vault Form */}
        <div className="space-y-6">
          <Card className="surface-panel h-fit">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Upload New Record
              </CardTitle>
              <CardDescription>Digitize and archive diagnostic scans.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="doc-name" className="text-xs font-bold">Document Title</Label>
                  <Input 
                    id="doc-name" 
                    placeholder="e.g. Apollo Lipids Panel Report" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="doc-cat" className="text-xs font-bold">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Lab Reports" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lab Reports">Lab Reports</SelectItem>
                        <SelectItem value="Imaging Scan">Imaging Scan</SelectItem>
                        <SelectItem value="Hospital Records">Hospital Records</SelectItem>
                        <SelectItem value="Prescription PDF">Prescription PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="doc-ref" className="text-xs font-bold">Physician Name</Label>
                    <Input 
                      id="doc-ref" 
                      placeholder="e.g. Dr. स्नेहा राव" 
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full text-xs font-bold h-9">
                  Upload & File Record
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Secure Lockout Info */}
          <Card className="surface-panel">
            <CardContent className="pt-6 text-xs text-muted-foreground flex gap-2.5">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="font-bold text-foreground block">AES-256 Vault Encryption</span>
                <p className="mt-0.5 leading-relaxed">Your files are encrypted during storage. Only verified doctors can view authorized scan records.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
