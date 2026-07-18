"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, ClipboardList, ShieldCheck, ArrowRight, Brain, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const assessmentTypes = [
  {
    icon: Sparkles,
    title: "AI Dosha Profiling",
    badge: "Recommended",
    desc: "Calculate your metabolic dosha levels (Vata, Pitta, Kapha) and calculate your biological score in 15 minutes.",
    path: "/ai-dosha-assessment",
    cta: "Start Dosha Test",
  },
  {
    icon: Brain,
    title: "Symptom & Metric Logs",
    badge: "Realtime Companion",
    desc: "Submit gut alerts, joint indicators, or sleep interruptions using our smart natural language loggers.",
    path: "/ai-health-assistant",
    cta: "Chat with Assistant",
  },
];

const WellnessAssessmentPage = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 border-b border-border bg-hero-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent_55%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <ClipboardList className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Precise Wellness Baseline
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Wellness Assessments
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Begin with detailed digital profiling. Our clinical screening maps physiological signals to sync with your care specialists.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center mb-16">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <Cpu className="h-4 w-4" />
              Digital Intake Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Calculate Your Health Score Instantly
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We compile your lifestyle markers, metabolic logs, and symptom patterns to establish active health profiles. All details automatically sync with your practitioners to support consultation design.
            </p>

            <div className="grid gap-4 pt-2">
              {assessmentTypes.map((type) => (
                <div key={type.title} className="bg-white border border-border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/20 transition-all duration-300 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {type.badge}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{type.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-light max-w-md">{type.desc}</p>
                  </div>
                  <Button size="sm" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto" asChild>
                    <Link href={type.path}>
                      {type.cta}
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Asset Image */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-white shadow-xl p-4 flex items-center justify-center">
            <img
              src="/wellness_assessment.png"
              alt="Interactive wellness assessment dashboards"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* HIPAA Security Block */}
        <div className="bg-white border border-border p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm max-w-4xl mx-auto">
          <div className="p-3 bg-[#6EF3A5]/10 text-primary rounded-2xl shrink-0">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">HIPAA Protected Infrastructure</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal font-light">
              All assessment results, metabolic details, and questionnaire history are encrypted under AES-256 protocols, complying directly with HIPAA standard rules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessAssessmentPage;
