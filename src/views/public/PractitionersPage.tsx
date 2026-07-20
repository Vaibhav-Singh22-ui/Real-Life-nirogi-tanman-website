"use client";

import { useState } from "react";
import PractitionerCard from "@/components/app/PractitionerCard";
import { doctors, yogaExperts } from "@/data/health-data";
import { Users, Stethoscope, Waves, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you verify practitioner credentials?",
    answer: "Every doctor holds active MD qualifications, and yoga specialists are certified under government AYUSH standards.",
  },
  {
    question: "Can I change my assigned practitioner?",
    answer: "Yes, you can request a swap through your patient dashboard at any time during an active care plan.",
  },
  {
    question: "How do virtual video calls work?",
    answer: "Appointments are scheduled inside the portal. At the slot time, simply click the 'Join Video Room' link in your dashboard to start a secure video call.",
  },
];

const PractitionersPage = () => {
  const [filter, setFilter] = useState<"all" | "doctor" | "yoga">("all");

  const displayedPractitioners = [
    ...doctors.map(d => ({ ...d, type: "doctor" as const })),
    ...yogaExperts.map(y => ({ ...y, type: "yoga" as const })),
  ].filter(p => filter === "all" || p.type === filter);

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* Hero Header with Background Image */}
      <section 
        className="relative py-24 md:py-32 border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/services/doctor_consult.png')" }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 border border-primary-foreground/20 text-white font-bold text-xs uppercase tracking-widest mx-auto">
            <Users className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Certified Care Team
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Practitioners
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed">
            Consult board-certified MD physicians, traditional Ayurvedic experts, and certified therapeutic yoga instructors in a unified care loop.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl space-y-12">
        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2.5 border-b border-border pb-4 justify-center sm:justify-start">
          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            All Specialists
          </button>
          <button
            onClick={() => setFilter("doctor")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              filter === "doctor"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            <Stethoscope className="h-3.5 w-3.5" />
            Medical Doctors
          </button>
          <button
            onClick={() => setFilter("yoga")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              filter === "yoga"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            <Waves className="h-3.5 w-3.5" />
            Yoga Instructors
          </button>
        </div>

        {/* Grid List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPractitioners.map((p) => (
            <PractitionerCard
              key={p.id}
              id={p.id}
              name={p.name}
              title={p.type === "doctor" ? (p as any).specialty : `Yoga Therapist (${(p as any).specialty})`}
              extraLabel={p.type === "doctor" ? "Experience" : "Sessions"}
              extraValue={p.type === "doctor" ? (p as any).experience : `${(p as any).sessions}+ sessions`}
              rating={p.rating}
              fee={p.type === "doctor" ? (p as any).fee : "₹1,000"}
              availability={p.type === "doctor" ? (p as any).availability : "Daily slots available"}
              image={p.image}
              type={p.type}
            />
          ))}
        </div>

        {/* Generated Related Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 pt-12">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <MessageSquare className="h-4 w-4" />
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Practitioner FAQs</h2>
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
      </section>
    </div>
  );
};

export default PractitionersPage;
