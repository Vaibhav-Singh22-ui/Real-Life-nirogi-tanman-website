"use client";

import { useState } from "react";
import { Building2, Users, Award, Activity, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const corporateOffers = [
  {
    title: "Interactive Desk Yoga",
    desc: "15-minute scheduled stretch routines to correct posture and relieve shoulder decompression stiffness.",
  },
  {
    title: "Metabolic Risk Screenings",
    desc: "Clinically coordinated metabolic baseline diagnostic parameters with on-site or virtual doctor reviews.",
  },
  {
    title: "Stress & Resilience Workshops",
    desc: "Deep breathing (Pranayama) courses designed to reduce autonomic response to cognitive loads.",
  },
  {
    title: "Custom Employee Portals",
    desc: "Dedicated dashboard logs to monitor water levels, exercise metrics, and scheduling windows.",
  },
];

const faqs = [
  {
    question: "What is the minimum team size for custom portals?",
    answer: "We support corporate setups starting from 10 employees, with customized dashboards and scheduled desk-yoga sessions.",
  },
  {
    question: "How do employees access the sessions?",
    answer: "They can log into our secure web panel or join scheduled live streams directly from their desktops.",
  },
  {
    question: "Are medical screening results shared with the employer?",
    answer: "No, all health statistics and consultations are fully private and HIPAA-protected. The employer only receives anonymous, aggregated workforce health indices.",
  },
];

const CorporateWellnessPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "10-50",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! Our team will reach out within 24 hours.");
    setFormData({ name: "", email: "", company: "", employees: "10-50", message: "" });
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* Hero Header with Background Image */}
      <section 
        className="relative py-24 md:py-32 border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/services/yoga_therapy.png')" }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 border border-primary-foreground/20 text-white font-bold text-xs uppercase tracking-widest mx-auto">
            <Building2 className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Workforce Resilience
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Corporate Wellness
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed">
            Foster employee focus, decompress physical strain, and curb professional burnout with integrated corporate plans.
          </p>
        </div>
      </section>

      {/* Main Corporate Content */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
          {/* Features Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <Activity className="h-4 w-4" />
              Workforce Health
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Empower Your Employees with Corporate Wellness
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Prevent workforce burnout, resolve chronic physical strain, and foster focus. We deliver custom clinical screening, interactive desk yoga sessions, and dietary guidance.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {corporateOffers.map((item, idx) => (
                <div key={idx} className="space-y-1.5 border-l-2 border-primary/50 pl-4">
                  <h4 className="font-bold text-xs text-foreground leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-normal font-light">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-primary" />
                <span className="text-[11px] font-bold text-foreground">92% Engagement Score</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-primary" />
                <span className="text-[11px] font-bold text-foreground">Custom Corporate Portals</span>
              </div>
            </div>
          </div>

          {/* Asset Image */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-white shadow-xl p-4 flex items-center justify-center">
            <img
              src="/corporate_wellness.png"
              alt="Corporate employee desk stretching wellness exercise"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Generated Related Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <MessageSquare className="h-4 w-4" />
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Corporate Wellness FAQs</h2>
          </div>
          
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border last:border-b-0 py-1">
                  <AccordionTrigger className="text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors text-left py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Form Card Column */}
        <div className="max-w-3xl mx-auto">
          <Card className="surface-panel p-6 sm:p-8 border-border bg-white shadow-lg rounded-3xl">
            <h3 className="text-lg font-bold text-foreground mb-1">Request Corporate Proposal</h3>
            <p className="text-[11px] text-muted-foreground mb-6 font-light leading-relaxed">
              Fill out the query parameters and our program coordinators will draft a custom setup for your team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-[#FAF8F5] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter business email"
                    className="w-full rounded-xl border border-border bg-[#FAF8F5] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Enter company name"
                    className="w-full rounded-xl border border-border bg-[#FAF8F5] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Number of Employees</label>
                  <select
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full rounded-xl border border-border bg-[#FAF8F5] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="10-50">10 to 50 employees</option>
                    <option value="51-200">51 to 200 employees</option>
                    <option value="201-1000">201 to 1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Brief Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your health goals or specific concerns..."
                  rows={4}
                  className="w-full rounded-xl border border-border bg-[#FAF8F5] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold py-5 mt-2">
                Submit Proposal Inquiry
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CorporateWellnessPage;
