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
  TrendingUp,
  ShieldCheck,
  Stethoscope,
  Info,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Static Image Imports
import progStressSleep from "@/assets/prog-stress-sleep.png";
import progMetabolic from "@/assets/prog-metabolic.png";
import progWeight from "@/assets/prog-weight.png";
import progDigestive from "@/assets/prog-digestive.png";
import progSenior from "@/assets/prog-senior.png";
import progWomens from "@/assets/prog-womens.png";

// Doctor and Specialist Avatars
import doctorKavya from "@/assets/doctor-kavya.jpg";
import doctorRhea from "@/assets/doctor-rhea.jpg";
import doctorVikram from "@/assets/doctor-vikram.jpg";
import nutritionPriya from "@/assets/nutrition-priya.jpg";
import nutritionAnjali from "@/assets/nutrition-anjali.jpg";
import yogaArjun from "@/assets/yoga-arjun.jpg";
import yogaMira from "@/assets/yoga-mira.jpg";

const programmesData: Record<string, {
  title: string;
  subtitle: string;
  image: any;
  icon: any;
  duration: string;
  intensity: string;
  price: string;
  category: string;
  overview: string;
  includes: string[];
  timeline: { step: string; title: string; desc: string }[];
  testimonial: { quote: string; author: string; role: string };
  badgeColor: string;
  iconColor: string;
  leadSpecialists: { name: string; role: string; avatar: any }[];
  parametersTracked: { name: string; target: string; desc: string }[];
  scientificPoints: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "stress-sleep": {
    title: "Stress & Sleep Support",
    subtitle: "Rebuild Sleep Rhythm & Calm Autonomic Stress",
    image: progStressSleep,
    icon: Brain,
    duration: "6 Weeks",
    intensity: "Gentle & Restorative",
    price: "₹4,999",
    category: "Mind & Sleep",
    overview: "Optimize vagal nerve stimulation and rebuild healthy cortisol patterns to resolve chronic exhaustion, anxiety, and insomnia.",
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
    iconColor: "text-blue-600 bg-blue-100/50 border-blue-500/10",
    leadSpecialists: [
      { name: "Dr. Kavya Menon", role: "MD Ayurveda & Stress Specialist", avatar: doctorKavya },
      { name: "Arjun Dev", role: "Pranayama & Meditation Coach", avatar: yogaArjun }
    ],
    parametersTracked: [
      { name: "Heart Rate Variability (HRV)", target: "+15% to 25% increase", desc: "Measures autonomic nervous system balance." },
      { name: "Sleep Efficiency Ratio", target: ">85% sleep window efficiency", desc: "Tracks time spent in deep & REM sleep states." },
      { name: "Daily Stress Index", target: "-40% reduction in mental fatigue", desc: "Self-logged autonomic indicators verified by coach." }
    ],
    scientificPoints: [
      { title: "Vagal Stimulation", desc: "Resonant breathing at 6 bpm increases vagal nerve signaling to calm somatic stress." },
      { title: "HRV Stabilization", desc: "Monitors heart rate variability to guide parasympathetic nervous recovery." },
      { title: "Circadian Syncing", desc: "Melatonin-friendly dietary templates reset circadian sleep-wake cycles naturally." }
    ],
    faqs: [
      { q: "Do I need any special sleep tracking device?", a: "No, a simple mobile fitness tracker or smartwatch is helpful but not mandatory. We also provide manual sleep logging protocols directly inside your dashboard." },
      { q: "How long until I see improvements in sleep depth?", a: "Most participants report improved sleep latency (falling asleep faster) and reduced nighttime awakenings within the first 10-14 days of starting the breath-sound routines." },
      { q: "Is this program suitable for severe clinical insomnia?", a: "Yes, our MD Ayurveda specialists work alongside modern protocols to help you gradually transition toward natural sleep cycles safely." }
    ]
  },
  "metabolic-wellness": {
    title: "Metabolic Wellness",
    subtitle: "Clinically Guided Diabetes and Glucose Reversal",
    image: progMetabolic,
    icon: Activity,
    duration: "12 Weeks",
    intensity: "Moderate",
    price: "₹9,999",
    category: "Metabolic Care",
    overview: "Manage insulin sensitivity, drop HbA1c values, and manage blood sugar levels under strict medical coordination.",
    includes: [
      "6 Consultations with Board-Certified MDs",
      "Weekly Custom Low-Glycemic Meal Recipes",
      "12 Live Metabolic Yoga Group Classes",
      "24/7 AI Vitals Sync & Anomaly Flags",
    ],
    timeline: [
      { step: "01", title: "Metabolic Baselines", desc: "Submit blood diagnostics (HbA1c, fasting insulin) and metabolic parameters." },
      { step: "02", title: "Dietary Calibration", desc: "Our nutritionist designs a custom anti-inflammatory, low-glycemic menu." },
      { step: "03", title: "Metabolic Exercises", desc: "Postures trigger muscle receptors to increase glucose absorption." },
      { step: "04", title: "Clinical Adjustments", desc: "Doctors review vital logs to adjust medication protocols as indicators decline." }
    ],
    testimonial: {
      quote: "My HbA1c dropped from 7.6 to 5.9 in 3 months. Combining clinical checks with daily yoga made all the difference.",
      author: "Rajesh Shinde",
      role: "Retired Officer"
    },
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    iconColor: "text-emerald-600 bg-emerald-100/50 border-emerald-500/10",
    leadSpecialists: [
      { name: "Dr. Vikram Shah", role: "MD Internal Medicine & Metabolism", avatar: doctorVikram },
      { name: "Priya Iyer", role: "Clinical Dietitian & Diabetes Coach", avatar: nutritionPriya }
    ],
    parametersTracked: [
      { name: "HbA1c Levels", target: "Drop of 0.8% to 1.5%", desc: "Indicates average 3-month blood glucose control." },
      { name: "Fasting Insulin Sensitivity", target: "Optimize baseline metrics", desc: "Measures cellular glucose absorption efficiency." },
      { name: "Postprandial Spikes", target: "Smooth curve under 140 mg/dL", desc: "Limits metabolic blood vessel strain." }
    ],
    scientificPoints: [
      { title: "Pancreatic Circulation", desc: "Targeted abdominal postures improve vascular flow to insulin-producing tissues." },
      { title: "GLUT-4 Upregulation", desc: "Specific muscle contraction sequences upregulate cellular glucose clearance." },
      { title: "Hepatic Load Reduction", desc: "Low-glycemic dietary protocols limit fat storage in liver tissue." }
    ],
    faqs: [
      { q: "Can I participate if I am on insulin?", a: "Yes, the clinical team monitors your blood sugar logs daily. As your insulin sensitivity improves, your doctor will adjust your insulin dosage accordingly." },
      { q: "What does weekly recipe calibration involve?", a: "Our dietitian analyzes your daily glucose curves and logs, then adjusts carbohydrate ratios and fiber sources to prevent blood sugar spikes." },
      { q: "Do I need to submit blood tests beforehand?", a: "Yes, we request a recent HbA1c and fasting lipid panel. If you don't have them, our care coordination team can arrange a home collection." }
    ]
  },
  "weight-management": {
    title: "Weight-Management Support",
    subtitle: "Science-Led Sustainable Fat Loss & Vitality Rebuild",
    image: progWeight,
    icon: TrendingUp,
    duration: "8 Weeks",
    intensity: "Moderate to Active",
    price: "₹5,999",
    category: "Lifestyle & Vitality",
    overview: "Accelerate your resting metabolic rate, optimize thyroid indicators, and establish long-term fat loss patterns.",
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
    iconColor: "text-teal-600 bg-teal-100/50 border-teal-500/10",
    leadSpecialists: [
      { name: "Dr. Rhea Sharma", role: "MD Ayurvedic Endocrinology", avatar: doctorRhea },
      { name: "Anjali Sen", role: "Metabolic Nutrition Coach", avatar: nutritionAnjali }
    ],
    parametersTracked: [
      { name: "Resting Metabolic Rate (RMR)", target: "+10% to 15% increase", desc: "Measures active daily calorie burn at rest." },
      { name: "Waist-to-Hip Ratio", target: "Drop of 0.05 to 0.08 units", desc: "Tracks visceral fat reduction." },
      { name: "Thyroid Profile (TSH)", target: "Balanced T3/T4 conversion", desc: "Monitors optimal glandular activity." }
    ],
    scientificPoints: [
      { title: "Thermogenic Lipolysis", desc: "Ayurvedic metabolic herbs trigger cellular fat oxidation." },
      { title: "Active Muscle Mass", desc: "Core strengthening postures stimulate high-metabolic-rate muscle tissue." },
      { title: "Endocrine Pacing", desc: "Prevents basal metabolic rate drops common in simple calorie reduction." }
    ],
    faqs: [
      { q: "Is this a crash diet program?", a: "Absolutely not. We design dense, anti-inflammatory meal templates that satisfy hunger while keeping insulin levels low to prompt continuous fat burning." },
      { q: "How many hours of exercise are required?", a: "We require just 25-30 minutes of low-impact metabolic activation yoga and core exercises, 4-5 times a week." },
      { q: "Are the herbal supplements safe to take long term?", a: "All recommended herbs are standard, heavily researched, non-toxic formulations. Our doctors review your liver/kidney status to customize doses." }
    ]
  },
  "digestive-wellness": {
    title: "Digestive Wellness",
    subtitle: "Reset Gut Microbiome & Resolve Acidity / IBS Issues",
    image: progDigestive,
    icon: Leaf,
    duration: "4 Weeks",
    intensity: "Gentle",
    price: "₹3,999",
    category: "Gut Health",
    overview: "Heal stomach lining inflammation, settle gut flora imbalances, and eliminate chronic bloating or acidity.",
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
    iconColor: "text-amber-600 bg-emerald-100/50 border-amber-500/10",
    leadSpecialists: [
      { name: "Dr. Kavya Menon", role: "MD Ayurvedic Gastroenterology", avatar: doctorKavya },
      { name: "Priya Iyer", role: "Functional Gut Nutritionist", avatar: nutritionPriya }
    ],
    parametersTracked: [
      { name: "Digestive Index (Agni)", target: "Eliminate bloating & reflux", desc: "Measures functional digestion cycles." },
      { name: "Bowel Regularity", target: "Consistent daily stool scale", desc: "Tracks gut motility and hydration." },
      { name: "Systemic Inflammation", target: "Drop in bloating scale", desc: "Indicates mucosal wall healing." }
    ],
    scientificPoints: [
      { title: "Agni Restoration", desc: "Standard Ayurvedic digestive enzymes and herbs reset gut acidity." },
      { title: "Vagal Gut Activation", desc: "Mindful abdominal breathing triggers vagus nerve control over digestion." },
      { title: "Mucosal Reset", desc: "Short-term exclusion templates allow intestinal wall lining recovery." }
    ],
    faqs: [
      { q: "I have IBS-D. Will this program work for me?", a: "Yes, our plans are customized for both hyper-motility (IBS-D) and sluggish-motility (IBS-C) using binding or lubricating food plans respectively." },
      { q: "What is the elimination phase?", a: "For 7-10 days, we temporarily remove common gut irritants (gluten, nightshades, processed dairy) and supply soothing herbal broths to reset gut lining." },
      { q: "Are fermentations and probiotics included?", a: "Yes, we integrate traditional Ayurvedic probiotic preparations (like Takra) along with modern clinical gut support." }
    ]
  },
  "senior-wellness": {
    title: "Senior Wellness",
    subtitle: "Preserve Joint Mobility & Vascular Health in Late Adulthood",
    image: progSenior,
    icon: Users,
    duration: "8 Weeks",
    intensity: "Mild & Therapeutic",
    price: "₹5,499",
    category: "Lifestyle & Vitality",
    overview: "Maintain joint safety, control vascular metrics (BP), and support memory focus using low-impact movement.",
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
    iconColor: "text-purple-600 bg-purple-100/50 border-purple-500/10",
    leadSpecialists: [
      { name: "Dr. Vikram Shah", role: "MD Geriatric Care Specialist", avatar: doctorVikram },
      { name: "Mira Nair", role: "Senior Therapeutic Yoga Coach", avatar: yogaMira }
    ],
    parametersTracked: [
      { name: "Joint Mobility Index", target: "+20% flexibility range", desc: "Measures articular range of motion." },
      { name: "Blood Pressure (BP)", target: "Stabilize under 130/80 mmHg", desc: "Tracks cardiovascular vessel resistance." },
      { name: "Balance & Fall Prevention", target: "Improved Single-Leg Stance time", desc: "Verifies sensory-motor coordination." }
    ],
    scientificPoints: [
      { title: "Synovial Mobilization", desc: "Gentle non-weight-bearing joint traction promotes synovia flow." },
      { title: "Arterial Decompression", desc: "Pranayama breath cycles slow heart rates to naturally lower pressure." },
      { title: "Sensory-Motor Sync", desc: "Stabilization routines protect balance control pathways in late adulthood." }
    ],
    faqs: [
      { q: "My knees are very weak. Is yoga safe for me?", a: "Yes. All classes are fully customized, incorporating chair yoga, wall supports, and padded bolsters. There are no high-impact joint stresses." },
      { q: "Can my doctor coordinate with my existing cardiologist?", a: "Yes, our geriatric specialist can review your current medications and coordinate recommendations with your cardiologist." },
      { q: "How are balance exercises conducted online?", a: "Classes are guided live by senior therapists who visually verify your posture, setup, and safety boundaries in real time." }
    ]
  },
  "womens-wellness": {
    title: "Women’s Wellness",
    subtitle: "Regulate Endocrine Metrics & Hormonal Syncing",
    image: progWomens,
    icon: HeartPulse,
    duration: "8 Weeks",
    intensity: "Gentle to Moderate",
    price: "₹6,499",
    category: "Metabolic Care",
    overview: "Regulate hormonal cycles, support PCOS/PCOD recovery, and optimize thyroid indicators through target habits.",
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
    iconColor: "text-rose-600 bg-rose-100/50 border-rose-500/10",
    leadSpecialists: [
      { name: "Dr. Rhea Sharma", role: "MD Gynecology & Hormonal Health", avatar: doctorRhea },
      { name: "Anjali Sen", role: "Women's Health Diet Coach", avatar: nutritionAnjali }
    ],
    parametersTracked: [
      { name: "Cycle Regularity", target: "Standard 28-35 day window", desc: "Tracks hormonal rhythm stability." },
      { name: "Luteal Phase Comfort", target: "-70% drop in cramps & PMS", desc: "Measures progesterone-estrogen ratios." },
      { name: "Glandular Markers", target: "Optimize LH/FSH and thyroid levels", desc: "Verifies endocrine recovery indicators." }
    ],
    scientificPoints: [
      { title: "Insulin Stabilization", desc: "Anti-inflammatory menus limit blood glucose spikes that disrupt ovulation." },
      { title: "Phase-Syncing Nutrition", desc: "Nutrition adapts to estrogen-progesterone shifts across cycle phases." },
      { title: "Pelvic Decongestion", desc: "Targeted posture routines promote lymphatic and venous pelvic drainage." }
    ],
    faqs: [
      { q: "Can this help me manage PCOD/PCOS symptoms?", a: "Absolutely. Our medical nutrition plans focus on managing insulin spikes, which is the primary driver of excess androgen production in PCOS." },
      { q: "What is cycle syncing?", a: "Cycle syncing aligns your nutrition and physical exercise intensity with the follicular, ovulatory, luteal, and menstrual phases of your cycle." },
      { q: "Is this program safe during fertility treatments?", a: "Yes, our clinicians design gentle restorative protocols that support your endocrine system without interfering with your medical cycles." }
    ]
  }
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
 
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
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
              
              <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
                {prog.subtitle}
              </h1>
              
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                {prog.overview}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5 bg-muted/40 px-3.5 py-2 rounded-xl border border-border">
                  <Clock className="h-4 w-4 text-primary" />
                  Duration: {prog.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-muted/40 px-3.5 py-2 rounded-xl border border-border">
                  <Activity className="h-4 w-4 text-primary" />
                  Pacing: {prog.intensity}
                </span>
                <span className="flex items-center gap-1.5 bg-muted/40 px-3.5 py-2 rounded-xl border border-border">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Clinically Supervised
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button size="lg" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white font-bold px-8 h-12 rounded-xl shadow-lg shrink-0" asChild>
                  <Link href="/book-consultation">
                    Enroll in Programme
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex flex-col justify-center sm:pl-2">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Total Enrollment Fee</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-foreground">{prog.price}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Media Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border h-64 md:h-80 w-full group bg-muted">
                <img
                  src={prog.image.src}
                  alt={prog.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#DDA853]">Premium Curriculum</span>
                  <h4 className="text-lg font-bold">{prog.title} Pathway</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Program Details & Lead Care Specialists */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-5xl border-b border-border/60">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left Column: Includes Checklist */}
          <Card className="surface-panel overflow-hidden border border-border bg-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5" />
              Program Curriculum Includes:
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground">
              {prog.includes.map((inc, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="font-light leading-normal">{inc}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Right Column: Lead Care Specialists */}
          <Card className="surface-panel overflow-hidden border border-border bg-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <Users className="h-4.5 w-4.5" />
              Your Lead Care Team:
            </h3>
            <div className="space-y-4">
              {prog.leadSpecialists.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-all duration-300">
                  <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-primary/20 bg-muted">
                    <img src={spec.avatar.src} alt={spec.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-foreground leading-snug">{spec.name}</h4>
                    <p className="text-[11px] text-muted-foreground font-light leading-normal">{spec.role}</p>
                    <div className="inline-flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/5">
                      <Stethoscope className="h-3 w-3" />
                      Care Guide
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Parameters Tracked & Clinical Metrics */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-5xl border-b border-border/60">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="uppercase-label text-primary">Biometric Goals</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Parameters We Track & Optimize
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto">
            Our medical team monitors your biomarkers and subjective indicators on a continuous cycle to customize your care paths.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {prog.parametersTracked.map((param, index) => (
            <Card key={index} className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:border-primary/20 duration-300">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/10 uppercase tracking-wider">
                  Marker {index + 1}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-foreground leading-snug">{param.name}</h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-normal">{param.desc}</p>
                </div>
              </div>
              <div className="pt-5 border-t border-border/40 mt-6">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Target Goal</span>
                <span className="text-sm font-extrabold text-primary">{param.target}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Structured Timeline / Roadmap */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-5xl border-b border-border/60">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="uppercase-label text-primary">Roadmap to Recovery</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Your Recovery Roadmap
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prog.timeline.map((step) => (
            <div key={step.step} className="bg-card border border-border p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:shadow-md transition-all duration-300">
              <div className="absolute right-4 bottom-2 text-7xl font-extrabold text-foreground/[0.03] select-none pointer-events-none">
                {step.step}
              </div>
              <div className="space-y-4 z-10">
                <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/10">
                  Step {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground leading-snug">{step.title}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Scientific & Clinical Basis */}
      <section className="py-16 md:py-24 bg-muted/15 border-b border-border/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="uppercase-label text-primary">Evidence-Based Care</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Scientific & Heritage Basis
            </h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            {prog.scientificPoints.map((point, index) => (
              <Card key={index} className="surface-panel border border-border bg-card p-6 rounded-2xl shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 border border-primary/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {point.title}
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {point.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Program-Specific Accordion FAQs */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-foreground mb-12">
          Program Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2.5">
          {prog.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`prog-faq-${index}`} className="rounded-xl border border-border bg-card px-5 shadow-sm">
              <AccordionTrigger className="text-left text-sm md:text-base font-bold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pb-4 font-light border-t border-border/40 pt-3">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 7. Program Specific Testimonial */}
      <section className="py-16 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <div className="flex text-amber-500 gap-0.5 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-base sm:text-lg text-foreground italic leading-relaxed max-w-2xl mx-auto font-light">
            "{prog.testimonial.quote}"
          </p>
          <div className="text-xs sm:text-sm font-bold text-muted-foreground">
            {prog.testimonial.author}, <span className="font-normal">{prog.testimonial.role}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgrammesDetailPage;
export { programmesData };
