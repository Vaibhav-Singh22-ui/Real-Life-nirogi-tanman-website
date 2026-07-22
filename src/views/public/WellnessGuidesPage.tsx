"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles, BookOpen, Search, Eye, Check, ShieldCheck, ArrowRight, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const downloadGuides = [
  {
    id: "gut-reset",
    title: "Vedic Gut Reset Guidebook",
    pages: "24 Pages",
    fileSize: "4.2 MB",
    category: "Nutrition",
    format: "Interactive PDF",
    downloads: "4.8k",
    desc: "A scientific guide to aligning your digestive Agni, balancing meals, and using natural herbal ferments.",
    cover: "/guides_cover.png",
    author: "Dr. Radhika Iyer, Clinical Nutritionist",
    topics: ["Agni Rebuild Protocol", "Herbal Tea Recipes", "Elimination Diet Chart", "Gut-Brain Connection"],
  },
  {
    id: "vagal-sleep",
    title: "Vagal Stimulation & Sleep Protocol",
    pages: "18 Pages",
    fileSize: "2.8 MB",
    category: "Mental Balance",
    format: "PDF Manual",
    downloads: "3.2k",
    desc: "Habit configurations, breathing cycles, and bedtime guidelines to stabilize resting heart rate.",
    cover: "/services/ai_assistant.png",
    author: "Mira Patel, Breathwork Specialist",
    topics: ["Parasympathetic Reset", "Pranayama Cycles", "Sleep Architecture", "Melatonin Support"],
  },
  {
    id: "posture-atlas",
    title: "Therapeutic Posture Alignment Atlas",
    pages: "32 Pages",
    fileSize: "6.5 MB",
    category: "Yoga & Physical",
    format: "Illustrated Atlas",
    downloads: "6.1k",
    desc: "High-resolution anatomical breakdowns of desk-yoga movements to decompress spine discs.",
    cover: "/services/yoga_therapy.png",
    author: "Neel Joshi, Spine Specialist",
    topics: ["Lumbar Support Drills", "Cervical Strain Relief", "Desk Ergonomics", "15-Min Daily Sequence"],
  },
  {
    id: "dosha-nutrition",
    title: "Tridosha Dietary & Recipe Companion",
    pages: "40 Pages",
    fileSize: "8.1 MB",
    category: "Ayurveda",
    format: "Recipe Book",
    downloads: "5.4k",
    desc: "Personalized ingredient selection rules tailored for Vata, Pitta, and Kapha body constitution balances.",
    cover: "/services/clinical_nutrition.png",
    author: "Dr. Vikram Seth, Senior Vaidya",
    topics: ["Dosha Test Key", "Seasonal Eating Guide", "50+ Sattvic Recipes", "Spice Synergy Chart"],
  },
];

const categories = ["All", "Nutrition", "Mental Balance", "Yoga & Physical", "Ayurveda"];

const WellnessGuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewGuide, setPreviewGuide] = useState<(typeof downloadGuides)[0] | null>(null);

  const filteredGuides = downloadGuides.filter((guide) => {
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (guide: (typeof downloadGuides)[0]) => {
    toast.success(`Preparing "${guide.title}" PDF manual... Download will start shortly.`);
    setTimeout(() => {
      toast.info(`Downloaded "${guide.title}" (${guide.fileSize}). Please check your downloads folder.`);
    }, 1500);
  };

  return (
    <div className="font-['Manrope',sans-serif] bg-[#FAF8F5] text-foreground min-h-screen pb-24 overflow-hidden">
      {/* HERO HEADER WITH TOP BACKGROUND IMAGE */}
      <section className="relative py-20 md:py-28 border-b border-border overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/guides_cover.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/65 backdrop-blur-[2px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
            <BookOpen className="h-4 w-4 text-[#DDA853]" />
            Digital Health Library
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Wellness Guides & E-Books
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
            Download our scientific e-books, dietary schedules, and posture alignment manuals to support your health journey.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Input
              type="search"
              placeholder="Search manuals, e-books, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 text-sm bg-white/95 border-none rounded-2xl shadow-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white h-12"
            />
            <Search className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 space-y-12">
        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-[#2F5E1A] border-[#2F5E1A] text-white shadow-md scale-105"
                    : "bg-white border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Guide Banner Spotlight */}
        {!searchQuery && selectedCategory === "All" && (
          <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 text-[#2F5E1A] text-xs font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-[#2F5E1A]" />
                Featured Clinical Manual
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground leading-tight">
                Vedic Gut Reset & Agni Guidebook
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                Authored by senior clinical nutritionists, this 24-page handbook breaks down metabolic digestion repair into actionable daily meal schedules.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-bold text-foreground">
                <span className="bg-[#FAF8F5] border border-border px-3 py-1.5 rounded-xl">24 Pages</span>
                <span className="bg-[#FAF8F5] border border-border px-3 py-1.5 rounded-xl">4.2 MB PDF</span>
                <span className="bg-[#FAF8F5] border border-border px-3 py-1.5 rounded-xl">4.8k Downloads</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  onClick={() => handleDownload(downloadGuides[0])}
                  className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  Download PDF Manual
                </Button>

                <Button
                  onClick={() => setPreviewGuide(downloadGuides[0])}
                  variant="outline"
                  className="border-border rounded-xl py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview Guide
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border bg-[#F8FAF7] p-4 flex items-center justify-center">
              <img
                src="/guides_cover.png"
                alt="Guide cover preview"
                className="rounded-xl max-h-72 object-contain drop-shadow-md"
              />
            </div>
          </div>
        )}

        {/* Guides Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {selectedCategory === "All" ? "All Manuals & Guides" : `${selectedCategory} Manuals`}
              <span className="text-xs font-normal text-muted-foreground">({filteredGuides.length} available)</span>
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredGuides.map((guide) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase bg-[#2F5E1A]/10 text-[#2F5E1A] px-2.5 py-0.5 rounded-full">
                          {guide.category}
                        </span>
                        <h4 className="text-lg font-bold text-foreground mt-2 leading-snug">{guide.title}</h4>
                      </div>

                      <div className="h-14 w-14 shrink-0 rounded-xl bg-[#F8FAF7] border border-border p-1.5 flex items-center justify-center">
                        <img src={guide.cover} alt={guide.title} className="h-full w-full object-cover rounded-lg" />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-normal leading-relaxed">{guide.desc}</p>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Topics Covered:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.topics.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-semibold bg-[#FAF8F5] border border-border text-muted-foreground px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Check className="h-2.5 w-2.5 text-primary" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
                    <div className="text-[11px] text-muted-foreground font-semibold">
                      <span>{guide.pages}</span> • <span>{guide.fileSize}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewGuide(guide)}
                        className="rounded-xl text-xs font-bold border-border"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Preview
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleDownload(guide)}
                        className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security & Verification Banner */}
        <div className="bg-white border border-border p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
          <div className="p-3 bg-emerald-50 text-primary rounded-2xl shrink-0">
            <ShieldCheck className="h-8 w-8 text-[#2F5E1A]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Peer-Reviewed & Free Access</h4>
            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              All downloadable manuals are published under Creative Commons healthcare license and vetted by licensed medical practitioners.
            </p>
          </div>
        </div>
      </section>

      {/* PREVIEW GUIDE MODAL */}
      <Dialog open={!!previewGuide} onOpenChange={() => setPreviewGuide(null)}>
        {previewGuide && (
          <DialogContent className="sm:max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-2xl">
            <DialogHeader className="space-y-2 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#2F5E1A] bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                  {previewGuide.category}
                </span>
                <span className="text-xs text-muted-foreground font-semibold">• {previewGuide.pages}</span>
              </div>
              <DialogTitle className="text-2xl font-extrabold text-foreground">{previewGuide.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="bg-[#F8FAF7] border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <img src={previewGuide.cover} alt={previewGuide.title} className="h-44 w-auto rounded-xl object-contain shadow-md" />
                <div className="space-y-3 text-left">
                  <h5 className="font-bold text-sm text-foreground">Document Details</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{previewGuide.desc}</p>
                  <div className="text-xs font-semibold text-foreground space-y-1">
                    <p>Author: <span className="text-primary">{previewGuide.author}</span></p>
                    <p>Format: <span className="text-muted-foreground">{previewGuide.format}</span></p>
                    <p>File Size: <span className="text-muted-foreground">{previewGuide.fileSize}</span></p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-xs text-foreground uppercase tracking-wider">Manual Outline & Chapters</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {previewGuide.topics.map((t, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-center gap-2 font-medium text-foreground">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span>Chapter {i + 1}: {t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button variant="outline" onClick={() => setPreviewGuide(null)} className="rounded-xl text-xs font-bold">
                  Close Preview
                </Button>

                <Button
                  onClick={() => {
                    handleDownload(previewGuide);
                    setPreviewGuide(null);
                  }}
                  className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Full PDF ({previewGuide.fileSize})
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default WellnessGuidesPage;
