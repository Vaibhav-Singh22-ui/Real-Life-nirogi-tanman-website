"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Activity, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { programmesData } from "./ProgrammesDetailPage";
import { getImgSrc } from "@/lib/utils";

const ProgrammesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Metabolic Care", "Mind & Sleep", "Gut Health", "Lifestyle & Vitality"];

  const programmes = Object.entries(programmesData).map(([slug, data]) => ({
    slug,
    ...data,
  }));

  const filteredProgrammes = activeCategory === "All"
    ? programmes
    : programmes.filter(p => p.category === activeCategory);

  return (
    <section className="section-band font-['Manrope',sans-serif] bg-background text-foreground min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-left max-w-3xl">
          <p className="uppercase-label text-primary font-bold tracking-widest text-xs">Targeted Healing Plans</p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Wellness Programmes
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            Enroll in our structured, condition-focused curriculums supervised by board-certified MD doctors, therapeutic yoga experts, and clinical nutrition coaches.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-border/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programmes Grid */}
        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProgrammes.map((prog) => (
              <motion.div
                key={prog.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="h-full group"
              >
                <Card className="surface-panel overflow-hidden border border-border bg-card hover:shadow-lg hover:border-primary/25 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    {/* Visual Card Image Header */}
                    <div className="relative h-48 w-full bg-muted overflow-hidden">
                      <img
                        src={getImgSrc(prog.image)}
                        alt={prog.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10">
                        {prog.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3.5 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          {prog.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-3.5 w-3.5 text-primary" />
                          {prog.intensity}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        <Link href={`/programmes/${prog.slug}`}>{prog.title}</Link>
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">
                        {prog.overview}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase font-bold block">Enrollment Fee</span>
                      <span className="text-base font-extrabold text-foreground">{prog.price}</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/95 text-xs font-bold rounded-xl flex items-center gap-1 h-10 px-4" asChild>
                      <Link href={`/programmes/${prog.slug}`}>
                        View Curriculum
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Diagnostic Assessment Prompt Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border p-8 rounded-3xl mt-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[150px] pointer-events-none" />
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full border border-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-[#DDA853]" />
              Ayurvedic Constitution Analysis
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              Unsure which programme fits your metabolic profile?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Take our quick AI-driven Dosha Assessment to discover your body constitution and get a direct clinical recommendation from our doctors.
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-xl h-11 shrink-0 px-6 relative z-10" asChild>
            <Link href="/ai-dosha-assessment">
              Start Assessment &rarr;
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default ProgrammesPage;
