"use client";

import { motion } from "framer-motion";
import { Clock, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { programmesData } from "./ProgrammesDetailPage";

const ProgrammesPage = () => {
  const programmes = Object.entries(programmesData).map(([slug, data]) => ({
    slug,
    ...data,
  }));

  return (
    <section className="section-band font-['Manrope',sans-serif]">
      <div className="container space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Targeted Healing Plans</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Wellness Programmes</h1>
          <p className="max-w-2xl text-muted-foreground text-sm font-light">
            Enroll in our structured, condition-focused curriculums supervised by MD doctors, physical yoga experts, and dietary coaches.
          </p>
        </div>

        {/* Programmes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((prog, idx) => (
            <motion.div
              key={prog.slug}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Card className="surface-panel overflow-hidden border border-border/85 bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
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

                    <h3 className="text-lg font-bold text-foreground hover:text-primary leading-snug">
                      <Link href={`/programmes/${prog.slug}`}>{prog.title}</Link>
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {prog.overview}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block">Fee</span>
                    <span className="text-base font-extrabold text-foreground">{prog.price}</span>
                  </div>
                  <Button size="xs" className="bg-primary hover:bg-primary/95 text-xs font-semibold rounded-xl flex items-center gap-1" asChild>
                    <Link href={`/programmes/${prog.slug}`}>
                      View Curriculum
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammesPage;
