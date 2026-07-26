import { useState } from "react";
import { Calendar, Clock, Filter, Plus, Search, Eye, Download, Trash2, CheckCircle2, X } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

type RoleModulePageProps = {
  title: string;
  description: string;
  roleLabel: string;
  metrics: Array<{ title: string; value: string; change: string; trend: "up" | "down" | "neutral" }>;
  tableColumns: string[];
  tableRows: string[][];
};

const RoleModulePage = ({ title, description, roleLabel, metrics, tableColumns, tableRows }: RoleModulePageProps) => {
  const [rows, setRows] = useState<string[][]>(tableRows);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Standard");
  const [newStatus, setNewStatus] = useState("Active");

  // Filter rows based on search term
  const filteredRows = rows.filter((r) =>
    r.some((cell) => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter a title for the new record.");
      return;
    }

    const todayStr = new Date().toLocaleDateString([], { month: "short", day: "numeric" });
    // Build a new row matching columns length
    const newRow = [
      `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      newTitle,
      newCategory,
      todayStr,
      newStatus,
      "Action",
    ];

    setRows([newRow, ...rows]);
    setNewTitle("");
    setShowModal(false);
    toast.success(`Successfully added record: ${newTitle}`);
  };

  const handleDeleteRow = (index: number, rowName: string) => {
    const updated = rows.filter((_, idx) => idx !== index);
    setRows(updated);
    toast.info(`Removed record: ${rowName || "Item"}`);
  };

  const handleExportData = () => {
    toast.success(`Exporting ${title} report to CSV...`);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header section */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 md:p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">{roleLabel} Workspace</p>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold text-foreground tracking-tight">{title}</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 relative z-10 w-full sm:w-auto">
          <Button variant="outline" onClick={handleExportData} className="w-full sm:w-auto text-xs h-9">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export Report
          </Button>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto text-xs h-9 font-bold">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New {title} Entry</DialogTitle>
                <DialogDescription>Enter record information to update database registry.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="item-title" className="text-xs font-bold">Entry Name / Title</Label>
                  <Input
                    id="item-title"
                    placeholder="e.g. Clinical Audit / New Service Profile"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="item-cat" className="text-xs font-bold">Category</Label>
                    <Input
                      id="item-cat"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="item-status" className="text-xs font-bold">Initial Status</Label>
                    <Input
                      id="item-status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="text-xs h-9"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="font-bold">
                    Save Record
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} trend={item.trend} />
        ))}
      </section>

      {/* Operations Table & Details Grid */}
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="surface-panel shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">Operational Data Registry</CardTitle>
                <CardDescription className="text-xs">Live status feeds & record management</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 text-xs h-8 rounded-lg"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    {tableColumns.map((column) => (
                      <TableHead key={column} className="font-bold text-xs">{column}</TableHead>
                    ))}
                    <TableHead className="text-right font-bold text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRows.map((row, index) => (
                    <TableRow key={`${row[0]}-${index}`} className="hover:bg-muted/30 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <TableCell key={`${cell}-${cellIndex}`} className="text-xs whitespace-nowrap font-medium">
                          {cellIndex === 0 ? (
                            <span className="font-bold text-foreground">{cell}</span>
                          ) : cell === "Active" || cell === "Confirmed" || cell === "Settled & Dispatched" || cell === "Paid" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]" variant="outline">{cell}</Badge>
                          ) : cell === "Pending" || cell === "Waiting" ? (
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]" variant="outline">{cell}</Badge>
                          ) : (
                            cell
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toast.success(`Viewing record: ${row[1] || row[0]}`)}
                            className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
                            title="View Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteRow(index, row[1] || row[0])}
                            className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                            title="Delete Record"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={tableColumns.length + 1} className="text-center py-6 text-xs text-muted-foreground">
                        No records found matching "{searchTerm}".
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-panel shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold">Operational Insights</CardTitle>
              <CardDescription className="text-xs">Real-time telemetry and automation status</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs text-muted-foreground">
              <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-primary text-[11px] uppercase tracking-wider">Sync Active</span>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p className="font-bold text-foreground text-xs">Live Database Connection</p>
                <p className="text-[11px] leading-snug">All operations logged under {roleLabel} workspace are synchronized with global access control policy.</p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between font-semibold text-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> Today Scheduled:</span>
                  <span className="font-bold">14 Tasks</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" /> Avg Turnaround:</span>
                  <span className="font-bold">12 Minutes</span>
                </div>
              </div>
            </CardContent>
          </div>
          <CardContent className="pt-2">
            <Button
              variant="outline"
              onClick={() => toast.success("System audit log refreshed!")}
              className="w-full text-xs font-bold border-border hover:bg-primary/10 hover:text-primary transition h-9"
            >
              Refresh Module Metrics
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default RoleModulePage;