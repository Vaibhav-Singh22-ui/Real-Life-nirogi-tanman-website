"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star,
  Activity,
  Clock,
  Waves,
  Brain,
  Leaf,
  HeartPulse,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const programmesData: Record<string, {
  title: string;
  subtitle: string;
  image: string;
  icon: any;
  duration: string;
  intensity: string;
  price: string;
  overview: string;
  description: string;
  includes: string[];
  timeline: { step: string; title: string; desc: string }[];
  testimonial: { quote: string; author: string; role: string };
  badgeColor: string;
  iconColor: string;
}> = {
  "stress-sleep": {
    title: "Stress & Sleep Support",
    subtitle: "Rebuild Sleep Rhythm & Calm Autonomic Stress",
    image: "/services/ai_assistant.png",
    icon: Brain,
    duration: "6 Weeks",
    intensity: "Gentle & Restorative",
    price: "₹4,999",
    overview: "Optimize vagal nerve stimulation and rebuild healthy cortisol patterns to resolve chronic exhaustion, anxiety, and insomnia.",
    description: "Our Stress & Sleep program targets hyperactive sympathetic responses. Through coordinated breath timers, daily mindfulness routines, and circadian alignment meals, you systematically restore deep sleep cycles.",
    includes: [
      "2 Consultations with Stress Specialists",
      "12 Guided Breathing & Meditation Sessions",
      "Custom Bedtime Routine Manual",
      "HRV and Sleep Quality Trend Monitoring",
    ],
    timeline: [
      { step: "01", title: "Autonomic Screening", desc: "Log resting heart rate, sleep windows, and daily anxiety levels." },
      { step: "02", title: "Breath & Sound Setup", desc: "Specialist maps calming breathing exercises (Pranayama) suited for your state." },
      { step: "03", title: "Delta Wave Training", desc: "Integrate guided sleep meditations and bedtime wind-down rules." },
      { step: "04", title: "Rhythm Stabilization", desc: "Refine patterns as your deep sleep intervals improve on metrics." }
    ],
    testimonial: {
      quote: "The paced breathing and sound guide calmed my nervous system. I now fall asleep within 10 minutes and sleep deeply.",
      author: "Ananya Roy",
      role: "Corporate Lead"
    },
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    iconColor: "text-blue-600 bg-blue-100/50 border-blue-500/10"
  },
  "metabolic-wellness": {
    title: "Metabolic Wellness",
    subtitle: "Clinically Guided Diabetes and Glucose Reversal",
    image: "/services/clinical_nutrition.png",
    icon: Activity,
    duration: "12 Weeks",
    intensity: "Moderate",
    price: "₹9,999",
    overview: "Manage insulin sensitivity, drop HbA1c values, and manage blood sugar levels under strict medical coordination.",
    description: "This metabolic program merges nutritional biochemistry with targeted movement sequences. By matching low-glycemic dietary protocols with metabolic yoga exercises, we target glucose load reduction safely.",
    includes: [
      "6 Consultations with Board-Certified MDs",
      "Weekly Custom Low-Glycemic Meal Recipes",
      "12 Live Metabolic Yoga Group Classes",
      "24/7 AI Vitals Sync & Anomaly Flags",
    ],
    timeline: [
      { step: "01", title: "Metabolic Baselines", desc: "Submit blood diagnostics (HbA1c, fasting insulin) and metabolic parameters." },
      { step: "02", title: "Dietary Calibration", desc: "Our nutritionist designs a custom anti-inflammatory, low-glycemic menu." },
      { step: "03", title: "Metabolic Exercises", desc: "Engage in specific postures that activate GLUT-4 insulin receptors." },
      { step: "04", title: "Clinical Adjustments", desc: "Doctors review vital logs to adjust medication protocols as indicators decline." }
    ],
    testimonial: {
      quote: "My HbA1c dropped from 7.6 to 5.9 in 3 months. Combining clinical checks with daily yoga made all the difference.",
      author: "Rajesh Shinde",
      role: "Retired Officer"
    },
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    iconColor: "text-emerald-600 bg-emerald-100/50 border-emerald-500/10"
  },
  "weight-management": {
    title: "Weight-Management Support",
    subtitle: "Science-Led Sustainable Fat Loss & Vitality Rebuild",
    image: "/services/yoga_therapy.png",
    icon: TrendingUp,
    duration: "8 Weeks",
    intensity: "Moderate to Active",
    price: "₹5,999",
    overview: "Accelerate your resting metabolic rate, optimize thyroid indicators, and establish long-term fat loss patterns.",
    description: "We avoid crash diets. Our weight management program optimizes endocrine markers and metabolic pacing by combining thermogenic Ayurvedic herbs, calorie-conscious meals, and core strengthening movement.",
    includes: [
      "3 Specialist Consultation Sessions",
      "8-Week Custom Exercise & Movement Routine",
      "Daily Habit Reminders & Water Trackers",
      "Weekly Progression Reviews & Adjustments",
    ],
    timeline: [
      { step: "01", title: "Pacing Assessment", desc: "Calculate resting energy burn and outline cardiovascular thresholds." },
      { step: "02", title: "Herb & Meal Setup", desc: "Incorporate Ayurvedic metabolic herbs alongside custom food plans." },
      { step: "03", title: "Movement Integration", desc: "Start low-impact core activation and metabolic joint movements." },
      { step: "04", title: "Habit Solidification", desc: "Refine guidelines to ensure fat loss results remain permanent." }
    ],
    testimonial: {
      quote: "Lost 9 kilograms, but more importantly, my energy is steady all day. No hunger spikes or fatigue.",
      author: "Sneha Kapoor",
      role: "Design Lead"
    },
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300",
    iconColor: "text-teal-600 bg-teal-100/50 border-teal-500/10"
  },
  "digestive-wellness": {
    title: "Digestive Wellness",
    subtitle: "Reset Gut Microbiome & Resolve Acidity / IBS Issues",
    image: "/services/clinical_nutrition.png",
    icon: Leaf,
    duration: "4 Weeks",
    intensity: "Gentle",
    price: "₹3,999",
    overview: "Heal stomach lining inflammation, settle gut flora imbalances, and eliminate chronic bloating or acidity.",
    description: "Ayurveda maps gut integrity to Agni (digestive fire). We combine probiotic-rich Ayurvedic ferments, elimination protocols, and restorative breathing to ease IBS and strengthen intestinal health.",
    includes: [
      "2 Consultations with Gut Nutritionists",
      "Custom Probiotic & Agni Restoration Recipes",
      "Daily Restorative Abdominal Breathing Guides",
      "Digestive Symptom Tracking & Food Logs",
    ],
    timeline: [
      { step: "01", title: "Symptom Logging", desc: "Identify inflammation triggers, bowel patterns, and bloating times." },
      { step: "02", title: "Elimination Phase", desc: "Remove inflammatory foods and reset with healing herbal soups." },
      { step: "03", title: "Reintroduction & Herbs", desc: "Introduce gut-restoring prebiotics and custom Ayurvedic blends." },
      { step: "04", title: "Long-Term Protection", desc: "Confirm regular digestion patterns and finalize daily gut habits." }
    ],
    testimonial: {
      quote: "My chronic bloating and IBS are completely gone. The simple food choices completely reset my gut comfort.",
      author: "Vikram Seth",
      role: "Financial Analyst"
    },
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    iconColor: "text-amber-600 bg-amber-100/50 border-amber-500/10"
  },
  "senior-wellness": {
    title: "Senior Wellness",
    subtitle: "Preserve Joint Mobility & Vascular Health in Late Adulthood",
    image: "/services/doctor_consult.png",
    icon: Users,
    duration: "8 Weeks",
    intensity: "Mild & Therapeutic",
    price: "₹5,499",
    overview: "Maintain joint safety, control vascular metrics (BP), and support memory focus using low-impact movement.",
    description: "Senior wellness requires targeted joint protections. We design gentle traction movements, blood flow boosters, and memory exercises to help seniors stay independent, balanced, and active.",
    includes: [
      "3 Consultations with Senior Care MDs",
      "8 Weeks of Low-Impact Joint Mobilization Yoga",
      "Memory Focus Exercises & Brain Training Guides",
      "Heart Rate & BP Metric Sync checks",
    ],
    timeline: [
      { step: "01", title: "Mobility & BP Diagnostics", desc: "Review arthritis indicators, joint range limits, and blood pressure trends." },
      { step: "02", title: "Safe Traction Poses", desc: "Introduce joint mobility sequences that protect ligaments." },
      { step: "03", title: "Cardio-Vascular Triage", desc: "Execute breathing methods to relax arteries and steady pressure." },
      { step: "04", title: "Balance Validation", desc: "Observe improved stability metrics and vascular control levels." }
    ],
    testimonial: {
      quote: "My knee pain decreased, and my blood pressure has remained steady. The yoga sequences are gentle and safe.",
      author: "Harish Gupta",
      role: "Retired Principal"
    },
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    iconColor: "text-purple-600 bg-purple-100/50 border-purple-500/10"
  },
  "womens-wellness": {
    title: "Women’s Wellness",
    subtitle: "Regulate Endocrine Metrics & Hormonal Syncing",
    image: "/services/yoga_therapy.png",
    icon: HeartPulse,
    duration: "8 Weeks",
    intensity: "Gentle to Moderate",
    price: "₹6,499",
    overview: "Regulate hormonal cycles, support PCOS/PCOD recovery, and optimize thyroid indicators through target habits.",
    description: "Hormonal balances are deeply tied to stress and metabolic spikes. We combine hormone-balancing nutrition schedules, vagus nerve relaxation, and pelvic stabilization movements to naturally restore balance.",
    includes: [
      "3 Consultations with Endocrine & Women's Health MDs",
      "Weekly PCOS & Thyroid Nutrition Blueprints",
      "Guided Restorative Yoga and Core Activation",
      "Cycle Trend & Mood Indicator logs",
    ],
    timeline: [
      { step: "01", title: "Hormonal Intake", desc: "Review baseline labs, cycle lengths, and physical parameters." },
      { step: "02", title: "Endocrine Diet Plan", desc: "Our nutritionist outlines insulin-stabilizing and anti-inflammatory meals." },
      { step: "03", title: "Pelvic Alignment", desc: "Incorporate core stability poses that ease pelvic congestion." },
      { step: "04", title: "Symptom Optimization", desc: "Log changes and verify hormone-related indicators improve." }
    ],
    testimonial: {
      quote: "Managed to restore my cycles naturally. The combination of dietary guides and stress yoga was magical.",
      author: "Divya Nair",
      role: "Software Developer"
    },
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
    iconColor: "text-rose-600 bg-rose-100/50 border-rose-500/10"
  }
};

const ProgrammesDetailPage = () => {
  const { slug } = useParams();
  
  const prog = useMemo(() => {
    const key = typeof slug === "string" ? slug : "stress-sleep";
    return programmesData[key] ?? programmesData["stress-sleep"];
  }, [slug]);

  const IconComponent = prog.icon;

  return (
    <div className="font-['Manrope',sans-serif] bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. Dynamic Hero Banner Section */}
      <section className="relative py-12 md:py-20 border-b border-border bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent_55%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <Link 
            href="/programmes" 
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-8 group transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Programmes
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest", prog.badgeColor)}>
                <IconComponent className="h-3.5 w-3.5" />
                {prog.title}
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {prog.subtitle}
              </h1>
              
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                {prog.overview}
              </p>

              <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {prog.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4" />
                  {prog.intensity}
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white font-bold px-8 h-12 rounded-xl shadow-lg" asChild>
                  <Link href="/book-consultation">
                    Enroll in Programme
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex flex-col justify-center pl-2">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Total Enrollment Fee</span>
                  <span className="text-xl font-extrabold text-foreground">{prog.price}</span>
                </div>
              </div>
            </motion.div>

            {/* Right details */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6"
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary">Program Includes:</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                {prog.includes.map((inc, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <span className="font-light leading-normal">{inc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Structured Timeline / Roadmap */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-foreground mb-16">
          Your Recovery Roadmap
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {prog.timeline.map((step) => (
            <div key={step.step} className="bg-card border border-border p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
              <div className="absolute right-4 bottom-2 text-6xl font-extrabold text-foreground/[0.02] select-none pointer-events-none">
                {step.step}
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                  Step {step.step}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{step.title}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Program Specific Testimonial */}
      <section className="py-12 border-t border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <div className="flex text-amber-500 gap-0.5 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-sm sm:text-base text-foreground italic leading-relaxed max-w-2xl mx-auto font-light">
            "{prog.testimonial.quote}"
          </p>
          <div className="text-xs font-bold text-muted-foreground">
            {prog.testimonial.author}, <span className="font-normal">{prog.testimonial.role}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgrammesDetailPage;
export { programmesData };
