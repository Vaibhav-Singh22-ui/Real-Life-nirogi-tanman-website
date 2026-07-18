"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, Stethoscope, Waves, Leaf, CheckCircle2, Activity, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const approachPillars = [
  {
    icon: Cpu,
    title: "1. Diagnostic Baseline Mapping",
    desc: "We analyze your lifestyle markers, blood chemistry, and Ayurvedic dosha attributes to map metabolic baselines.",
  },
  {
    icon: Stethoscope,
    title: "2. Clinical Coordinated Care",
    desc: "Board-certified doctors collaborate with nutritionists and physical trainers to customize medical limits.",
  },
  {
    icon: Waves,
    title: "3. Postural Yoga Sequences",
    desc: "Receive customized breathing exercises (Pranayama) and spinal decompression postures mapped to your diagnostic indicators.",
  },
  {
    icon: Leaf,
    title: "4. Preventive AI Habit Sync",
    desc: "Log vitals, set reminders, and query our 24/7 AI health companion to sustain lifestyle modifications.",
  },
];

const faqs = [
  {
    question: "What makes this approach different from standard clinics?",
    answer: "We don't just treat symptoms. We sync clinical lab indicators (like blood panels) with traditional Ayurvedic dosha imbalances for a unified remedy.",
  },
  {
    question: "How often are wellness plans adjusted?",
    answer: "Weekly. The AI logs your daily habits and flags vital updates, which our experts review to refine postures or food lists.",
  },
  {
    question: "Can I use the app to track my vitals?",
    answer: "Yes, our digital dashboard maps blood sugar, HRV, blood pressure, and sleep patterns directly into your medical record.",
  },
];

const OurWellnessApproachPage = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* Hero Header with Background Image */}
      <section 
        className="relative py-24 md:py-32 border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/services/preventive_monitoring.png')" }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 border border-primary-foreground/20 text-white font-bold text-xs uppercase tracking-widest mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Science & Tradition Synergy
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Wellness Approach
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed">
            Nirogi Tanman connects diagnostic medicine, physical realignment therapy, and Ayurvedic habits into a single, proactive loop.
          </p>
        </div>
      </section>

      {/* Side-by-Side Detailed Section */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <Activity className="h-4 w-4" />
              Integrated Healthcare
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Vedic Heritage Meets Clinical Precision
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Instead of managing isolated symptoms, we evaluate your complete physiological baseline. By matching traditional dosha indicators with clinical labs, our experts design structured, long-term programs.
            </p>
            
            <div className="space-y-4 pt-2 border-t border-border/60">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-foreground">Preventive Vital Monitoring</h4>
                  <p className="text-[11px] text-muted-foreground leading-normal font-light">Monitor HbA1c, heart rate, and metabolic trends in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-foreground">Integrated Direct Consultations</h4>
                  <p className="text-[11px] text-muted-foreground leading-normal font-light">Your MD doctor and yoga trainer share one unified health record.</p>
                </div>
              </div>
            </div>

            {/* Statistics badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white border border-border p-4 rounded-2xl shadow-sm">
                <span className="text-3xl font-black text-primary block">94%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Recovery rate</span>
              </div>
              <div className="bg-white border border-border p-4 rounded-2xl shadow-sm">
                <span className="text-3xl font-black text-[#DDA853] block">10k+</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Completed sessions</span>
              </div>
            </div>
          </div>

          {/* Premium Illustration box */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-white shadow-xl p-4 flex items-center justify-center">
            <img
              src="/wellness_approach.png"
              alt="Ayurvedic clinical wellness indicators illustration"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {approachPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              whileHover={{ y: -6 }}
              className="bg-card border border-border/80 bg-white p-6 rounded-2xl hover:border-primary/20 duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Generated Related Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <MessageSquare className="h-4 w-4" />
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Wellness Approach FAQs</h2>
          </div>
          
          <div className="bg-white border border-border p-5 rounded-3xl shadow-sm">
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

        {/* Bottom Banner */}
        <div className="bg-primary text-primary-foreground py-16 text-center rounded-3xl relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(221,168,83,0.1),transparent_50%)] animate-pulse" />
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto px-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Take Control of Your Health?</h2>
            <p className="text-xs sm:text-sm text-primary-foreground/80 font-light leading-relaxed">
              Schedule a virtual or in-clinic consult with our practitioners and receive your tailored wellness plan.
            </p>
            <div className="pt-2 flex justify-center">
              <Button className="bg-[#DDA853] hover:bg-[#c99540] text-primary-foreground font-black rounded-xl text-xs h-10 px-6" asChild>
                <Link href="/book-consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default OurWellnessApproachPage;
