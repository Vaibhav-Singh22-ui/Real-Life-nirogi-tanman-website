"use client";

import { motion } from "framer-motion";
import { Video, Play, Clock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const videoSessions = [
  {
    title: "15-Minute Spinal Decompression Routine",
    category: "Yoga Therapy",
    duration: "15 mins",
    instructor: "Neel Joshi, Spine Specialist",
    desc: "A step-by-step mechanical spine correction routine designed to relieve workspace strain.",
    thumb: "/services/yoga_therapy.png",
  },
  {
    title: "Vagal Nerve Breathing & Pranayama",
    category: "Meditation & Stress",
    duration: "10 mins",
    instructor: "Mira Patel, Breathwork Guide",
    desc: "Slow pacing breathwork triggers parasympathetic vagus stimulation to flatten cortisol.",
    thumb: "/services/ai_assistant.png",
  },
  {
    title: "Vedic Cooking: Agni Digest Rebuild",
    category: "Clinical Nutrition",
    duration: "22 mins",
    instructor: "Radhika Iyer, Nutritionist",
    desc: "Ayurvedic recipe guidelines to restore metabolic digestion fire and lower bloating.",
    thumb: "/services/clinical_nutrition.png",
  },
];

const VideosPage = () => {
  const handlePlayVideo = (title: string) => {
    toast.success(`Playing: "${title}". (Video interface would launch here)`);
  };

  return (
    <section className="section-band font-['Manrope',sans-serif]">
      <div className="container space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Media Library</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Video Lectures & Sessions</h1>
          <p className="max-w-2xl text-muted-foreground font-light text-sm">
            Watch interactive postural classes, Ayurvedic cooking guidelines, and breathing sessions led by certified guides.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoSessions.map((session, idx) => (
            <motion.div
              key={session.title}
              whileHover={{ y: -6 }}
              className="cursor-pointer"
              onClick={() => handlePlayVideo(session.title)}
            >
              <Card className="surface-panel overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-muted flex items-center justify-center overflow-hidden group">
                    <img
                      src={session.thumb}
                      alt={session.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 fill-primary text-primary ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {session.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </span>
                      <span>By {session.instructor}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {session.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {session.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosPage;
