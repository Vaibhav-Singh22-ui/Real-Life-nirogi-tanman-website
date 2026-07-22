"use client";

import { motion } from "framer-motion";
import { Star, Quote, HeartPulse, CheckCircle2, BadgePercent } from "lucide-react";
import { Card } from "@/components/ui/card";
import doctorVikram from "@/assets/doctor-vikram.jpg";
import yogaMira from "@/assets/yoga-mira.jpg";
import doctorKavya from "@/assets/doctor-kavya.jpg";
import { getImgSrc } from "@/lib/utils";

// Testimonial metrics matching main data
const testimonialsList = [
  {
    name: "Amit Verma",
    age: 44,
    condition: "Reversed Type-2 Diabetes",
    stat: "HbA1c from 7.9% to 5.8%",
    review: "I was skeptical about blending yoga with doctor guidelines, but Nirogi Tanman proved me wrong. My glycemic fluctuations flattened out, and under my doctor's supervision, I have reduced my daily medication by half.",
    rating: 5,
    avatar: doctorVikram,
  },
  {
    name: "Priya Sharma",
    age: 32,
    condition: "Resolved Chronic Lower Back Pain",
    stat: "90% pain reduction in 4 weeks",
    review: "After sitting at a desk for 9 hours daily, my spine was in constant pain. The spine decompression yoga routines prescribed by my yoga therapist Neel Joshi completely changed my mobility. I am pain-free today!",
    rating: 5,
    avatar: yogaMira,
  },
  {
    name: "Dr. Rajesh Kapoor",
    age: 51,
    condition: "Managed Stress & Severe Insomnia",
    stat: "Deep sleep increased by 45 mins",
    review: "As a physician, I understand the physiological cost of chronic stress. Nirogi Tanman's guided pranayama and mindfulness modules systematically re-trained my autonomic nervous system. I now enjoy restorative sleep cycles.",
    rating: 5,
    avatar: doctorKavya,
  },
  {
    name: "Meera Nair",
    age: 38,
    condition: "Digestive & Gut Rejuvenation",
    stat: "No bloating or IBS symptoms in 30 days",
    review: "I had struggled with severe acidity and chronic bloating for years. The personalized nutrition plan and specific herbs prescribed aligned my Agni (digestion) within a month. Incredible change!",
    rating: 5,
    avatar: yogaMira,
  },
  {
    name: "Karan Johar",
    age: 62,
    condition: "Senior Hypertension Management",
    stat: "BP stabilized from 155/95 to 125/80",
    review: "The gentle breathing exercises and regular vital check-ins kept me motivated. Having my cardiologist review my trends online is extremely reassuring and easy.",
    rating: 5,
    avatar: doctorVikram,
  },
  {
    name: "Sneha Patel",
    age: 29,
    condition: "Weight and Metabolic Support",
    stat: "Lost 8 kg & regulated thyroid baseline",
    review: "I loved that the program combined strict medical guidance with daily yoga exercises. It is holistic, scientific, and very easy to follow via the patient app dashboard.",
    rating: 5,
    avatar: doctorKavya,
  },
];

const TestimonialsPage = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-background text-foreground min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 border-b border-border bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent_55%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <HeartPulse className="h-3.5 w-3.5" />
            Patient Health Outcomes
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Success Stories
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Read verified reviews and chronic recovery metrics from patients who transformed their health through integrated plans.
          </p>
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonialsList.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="surface-panel p-6 flex flex-col justify-between border-border bg-card shadow-sm hover:shadow-md transition-all h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/10" />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed italic">
                    "{test.review}"
                  </p>
                </div>
                
                <div className="pt-5 border-t border-border/60 mt-6 flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-full overflow-hidden shrink-0 border border-primary/20 shadow-sm bg-muted">
                    <img src={getImgSrc(test.avatar)} alt={test.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-tight">
                      {test.name}, <span className="text-xs font-normal text-muted-foreground">{test.age}</span>
                    </h4>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider block mt-0.5">
                      {test.condition}
                    </span>
                    <span className="text-[10px] text-[#DDA853] font-bold block mt-0.5">
                      {test.stat}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
