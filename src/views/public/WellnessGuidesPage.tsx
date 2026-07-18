"use client";

import { motion } from "framer-motion";
import { FileText, Download, Sparkles, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const downloadGuides = [
  {
    title: "Vedic Gut Reset Guidebook",
    pages: "24 Pages",
    fileSize: "4.2 MB",
    category: "Nutrition",
    desc: "A scientific guide to aligning your digestive Agni, balancing meals, and using natural herbal ferments.",
  },
  {
    title: "Vagal Stimulation & Sleep Protocol",
    pages: "18 Pages",
    fileSize: "2.8 MB",
    category: "Mental Balance",
    desc: "Habit configurations, breathing cycles, and bedtime guidelines to stabilize resting heart rate.",
  },
  {
    title: "Therapeutic Posture Alignment Atlas",
    pages: "32 Pages",
    fileSize: "6.5 MB",
    category: "Yoga & Physical",
    desc: "High-resolution anatomical breakdowns of desk-yoga movements to decompression spine discs.",
  },
];

const WellnessGuidesPage = () => {
  const handleDownload = (title: string) => {
    toast.success(`Downloading: "${title}" PDF format manual. Please check downloads folder.`);
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 border-b border-border bg-hero-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent_55%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <BookOpen className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
            Vedic Health Library
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Wellness Guides & Manuals
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Download our scientific e-books, dietary schedules, and posture manuals to align your recovery guidelines.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-16">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              Scientific Resources
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Evidence-Led Wellness Manuals
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Our care team compiles evidence-based guidelines combining anatomical biomechanics and traditional Ayurvedic nutrition. Download free manuals to support your health journey.
            </p>

            <div className="grid gap-4 pt-2">
              {downloadGuides.map((guide) => (
                <div key={guide.title} className="bg-white border border-border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/20 transition-all duration-300 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {guide.category}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{guide.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-light max-w-md">{guide.desc}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto flex items-center gap-1"
                    onClick={() => handleDownload(guide.title)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock cover image */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-white shadow-xl p-4 flex items-center justify-center">
            <img
              src="/guides_cover.png"
              alt="Ayurvedic Wellness Manual book cover"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessGuidesPage;
