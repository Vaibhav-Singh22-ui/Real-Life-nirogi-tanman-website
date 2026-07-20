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
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Payments & Billing</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Review invoices, plan subscriptions, auto-pay methods, and receipt history in your billing center.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 flex gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-none">Last Billing</p>
            <p className="mt-1 text-base font-extrabold text-foreground">₹4,250</p>
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
