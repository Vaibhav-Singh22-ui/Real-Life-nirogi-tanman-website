"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, ClipboardList, ShieldCheck, ArrowRight, Brain, Lock, CheckCircle2, HeartPulse, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const assessmentTypes = [
  {
    icon: Sparkles,
    title: "AI Tridosha Profiling Engine",
    badge: "Most Popular",
    desc: "Calculate your biological metabolic dosha baseline (Vata, Pitta, Kapha) and receive instant dietary guidelines in 5 minutes.",
    path: "/ai-dosha-assessment",
    cta: "Start Dosha Test",
  },
  {
    icon: Brain,
    title: "Symptom & Metabolic Logger",
    badge: "Realtime AI Companion",
    desc: "Submit gut alerts, joint stiffness indicators, or sleep interruptions directly to our natural language intake assistant.",
    path: "/ai-health-assistant",
    cta: "Chat with Assistant",
  },
  {
    icon: Activity,
    title: "Spine & Posture Decompression Screener",
    badge: "Clinical Metric",
    desc: "Self-evaluate workspace strain, lumbar curvature, and shoulder blade alignment with video guidance.",
    path: "/wellness-assessment",
    cta: "Take Posture Test",
  },
];

const WellnessAssessmentPage = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-24 overflow-hidden">
      {/* HERO HEADER WITH TOP BACKGROUND IMAGE */}
      <section className="relative py-20 md:py-28 border-b border-border overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/services/ai_assistant.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/65 backdrop-blur-[2px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
            <ClipboardList className="h-4 w-4 text-[#DDA853]" />
            Precise Wellness Baseline
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Digital Health & Dosha Assessments
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
            Begin with detailed digital profiling. Our clinical screening maps physiological signals to sync directly with your care specialists.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <Button size="lg" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-2xl px-6 py-3 font-bold text-sm shadow-lg" asChild>
              <Link href="/ai-dosha-assessment">
                Start Instant Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center mb-16">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-extrabold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              <Cpu className="h-4 w-4" />
              Digital Intake Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Calculate Your Health Score Instantly
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
              We compile your lifestyle markers, metabolic logs, and symptom patterns to establish active health profiles. All details automatically sync with your practitioners to support consultation design.
            </p>

            <div className="grid gap-4 pt-2">
              {assessmentTypes.map((type) => (
                <div key={type.title} className="bg-white border border-border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-[#2F5E1A]/10 text-[#2F5E1A] px-2.5 py-0.5 rounded-full">
                        {type.badge}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{type.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-normal max-w-md">{type.desc}</p>
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
          <div className="p-3 bg-emerald-50 text-primary rounded-2xl shrink-0">
            <ShieldCheck className="h-8 w-8 text-[#2F5E1A]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">HIPAA Protected & Encrypted</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-normal">
              All assessment results, metabolic details, and questionnaire history are encrypted under AES-256 protocols, complying directly with HIPAA standard regulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessAssessmentPage;
