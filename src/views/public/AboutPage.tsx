"use client";

import { motion } from "framer-motion";
import { HeartPulse, Sparkles, Activity, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Nirogi Tanman coordinate care?",
    answer: "Our doctors and yoga experts share a HIPAA-secure panel to sync records, adjusting postures and dietary guidelines to match your symptoms.",
  },
  {
    question: "Is my diagnostic data safe?",
    answer: "Yes, all files are encrypted under AES-256 standards. Only clinicians actively assigned to your plan can review records.",
  },
  {
    question: "Can I consult physically?",
    answer: "Yes, we offer both virtual video consultations and scheduled physical slots at our accredited partner centers.",
  },
];

const AboutPage = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* 1. Hero Banner with Background Image */}
      <section 
        className="relative py-24 md:py-32 border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/services/doctor_consult.png')" }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 border border-primary-foreground/20 text-white font-bold text-xs uppercase tracking-widest mx-auto">
            <HeartPulse className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Vedic Healthcare Pioneers
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            About Nirogi Tanman
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed">
            Unifying preventive clinical medicine, traditional Ayurvedic nutrition, and therapeutic movement inside a secure digital recovery loop.
          </p>
        </div>
      </section>

      {/* 2. Visual Split Section */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <Activity className="h-4 w-4" />
              Integrated Care Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              A Connected Journey to Proactive Health
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We connect board-certified doctors, dietitians, and yoga trainers inside one patient portal. By sharing vital metrics and logs, we ensure every guideline is customized to match your metabolic dosha indicators and clinical thresholds.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/60">
              <div className="space-y-1">
                <span className="text-3xl font-black text-primary block">94%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Patient recovery index</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#DDA853] block">100%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Verified MD practitioners</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border bg-white shadow-xl p-4 flex items-center justify-center h-80 sm:h-96 lg:h-[420px]">
            <img
              src="/services/doctor_consult.png"
              alt="Medical doctor discussing digital health indicators"
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3. Core Values Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-20">
          {[
            {
              title: "Integrated Care",
              desc: "Doctors and yoga instructors collaborate around a single patient health record to ensure total alignment.",
            },
            {
              title: "Data-Led Decisions",
              desc: "Wellness plans dynamically adapt based on daily vitals logs, sleep trackers, and progress metrics.",
            },
            {
              title: "Trust & Governance",
              desc: "Role-specific access control cabinets and fully secure data transport protocols defend your privacy.",
            },
          ].map((val, idx) => (
            <motion.div
              key={val.title}
              whileHover={{ y: -6 }}
              className="bg-white border border-border p-6 rounded-2xl shadow-sm space-y-4 hover:border-primary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">{val.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 4. Generated Related Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <MessageSquare className="h-4 w-4" />
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">About Nirogi Tanman FAQs</h2>
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

export default AboutPage;