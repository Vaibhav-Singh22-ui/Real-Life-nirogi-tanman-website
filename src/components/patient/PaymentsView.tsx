"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard, Sparkles, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const defaultInvoices: Invoice[] = [
  { id: "inv1", date: "Jul 11, 2026", description: "Monthly Integrative Care Plan Subscription", amount: "₹4,250", status: "Paid" },
  { id: "inv2", date: "Jun 24, 2026", description: "Doctor Specialist Consultation Fee (Dr. Sneha)", amount: "₹1,200", status: "Paid" },
  { id: "inv3", date: "Jun 11, 2026", description: "Monthly Integrative Care Plan Subscription", amount: "₹4,250", status: "Paid" },
  { id: "inv4", date: "May 28, 2026", description: "Ayurvedic Herbal Supplements Kit (Agni-V)", amount: "₹1,850", status: "Paid" }
];

export default function PaymentsView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [autoPay, setAutoPay] = useState(true);

  useEffect(() => {
    setInvoices(defaultInvoices);
  }, []);

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Downloading Invoice ${id}...`);
  };

  const handleToggleAutoPay = () => {
    setAutoPay(!autoPay);
    toast.info(`AutoPay ${!autoPay ? "Enabled" : "Disabled"}`);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Payments & Billing</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Review invoices, plan subscriptions, auto-pay methods, and receipt history in your billing center.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 flex gap-4 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">Last Billing</p>
            <p className="mt-1 text-sm font-extrabold text-foreground">₹4,250</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Renewal Date</p>
            <p className="mt-1 text-base font-extrabold text-foreground">Aug 11</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Billing Invoices */}
        <Card className="surface-panel">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Invoice History
            </CardTitle>
            <CardDescription>Records of your past subscription payments and appointments fees.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground tracking-wide block uppercase leading-none mb-1">
                      {inv.date} · Invoice: {inv.id}
                    </span>
                    <h4 className="font-bold text-sm text-foreground">{inv.description}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Amount: {inv.amount}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-green-600 bg-green-500/10 px-2.5 py-1 rounded-full">
                      {inv.status}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(inv.id)} className="text-xs border-border">
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Billing Widgets */}
        <div className="space-y-6">
          {/* Active plan card */}
          <Card className="surface-panel bg-primary/[0.02]">
            <CardHeader className="pb-3 border-b border-border/40">
              <span className="text-[9px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase w-fit block mb-1">
                Active Plan
              </span>
              <CardTitle className="text-lg">Integrative Core Plan</CardTitle>
              <CardDescription>Monthly plan covering Ayurveda and Naturopathy consultation desks.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                <span>Billing Frequency:</span>
                <span className="text-muted-foreground">Monthly</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                <span>Amount:</span>
                <span>₹4,250</span>
              </div>
              
              <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">AutoPay Renewals</span>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">UPI AutoPay will charge automatically</p>
                </div>
                <button 
                  onClick={handleToggleAutoPay}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors relative ${
                    autoPay ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full bg-card shadow transition-transform ${
                    autoPay ? "translate-x-6" : "translate-x-0"
                  }`} />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Secure Payment Policy */}
          <Card className="surface-panel">
            <CardContent className="pt-6 text-xs text-muted-foreground space-y-3.5">
              <div className="flex gap-2.5">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">PCI-DSS Compliant</span>
                  <p className="mt-0.5 leading-relaxed">Transactions are processed over encrypted SSL tunnels using tokenized card standards.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
