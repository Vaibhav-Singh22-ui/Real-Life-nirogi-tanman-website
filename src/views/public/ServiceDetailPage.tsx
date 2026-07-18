"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Leaf, 
  Waves, 
  Brain, 
  HeartPulse, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star,
  Activity,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Avatars from testimonials for matching design
const doctorVikram = "/doctor-vikram.jpg";
const yogaMira = "/yoga-mira.jpg";
const doctorKavya = "/doctor-kavya.jpg";

const servicesData: Record<string, {
  title: string;
  subtitle: string;
  image: string;
  icon: any;
  overview: string;
  description: string;
  pillars: { title: string; desc: string }[];
  timeline: { step: string; title: string; desc: string }[];
  testimonial: { quote: string; author: string; role: string; avatar: string };
  badgeColor: string;
  iconColor: string;
}> = {
  "doctor-consultations": {
    title: "Doctor Consultations",
    subtitle: "Clinical Care Guided by Science & Tradition",
    image: "/services/doctor_consult.png",
    icon: Stethoscope,
    overview: "Get evidence-based clinical consultations with board-certified physicians, integrative MDs, and Ayurvedic experts tailored to your specific chronic parameters.",
    description: "Our medical practitioners go beyond symptomatic management. We evaluate your complete patient history, lab results, and genomic indicators alongside Ayurvedic metabolic parameters to outline a clear recovery roadmap.",
    pillars: [
      { title: "Dual Triage Approach", desc: "Every assessment combines clinical diagnostic frameworks with Ayurvedic dosha profiling." },
      { title: "Empathetic Listeners", desc: "Enjoy 1-on-1 consultations where your voice is heard, addressing chronic pain and lifestyle factors." },
      { title: "Coordinated Care", desc: "Our MDs directly collaborate with clinical nutritionists and yoga therapists to align your targets." }
    ],
    timeline: [
      { step: "01", title: "Comprehensive Intake", desc: "Submit symptoms, blood markers, and complete the digital dosha balance sheet." },
      { step: "02", title: "1-on-1 Consult Session", desc: "Discuss historical factors and establish clinical targets with your doctor." },
      { step: "03", title: "Care Plan Integration", desc: "Doctor designs your unified prescription, nutrition rules, and therapy goals." },
      { step: "04", title: "Bi-Weekly Progression Reviews", desc: "Sync diagnostic trends and refine parameters with regular check-ins." }
    ],
    testimonial: {
      quote: "The dual approach of medical science and Ayurvedic profiling gave me a clear recovery roadmap. My blood pressure is fully controlled, and I feel vibrant.",
      author: "Dr. Vikram Sethi",
      role: "Patient & Cardiologist",
      avatar: doctorVikram
    },
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    iconColor: "text-emerald-600 bg-emerald-100/50 border-emerald-500/10"
  },
  "clinical-nutrition": {
    title: "Clinical Nutrition",
    subtitle: "Condition-focused Ayurvedic Dietary Interventions",
    image: "/services/clinical_nutrition.png",
    icon: Leaf,
    overview: "Optimize your digestion, correct metabolic imbalances, and reverse chronic conditions with highly targeted dietary plans from certified clinical nutritionists.",
    description: "In Ayurveda, food is medicine (Ahara). We merge modern nutritional biochemistry with Ayurvedic rules of eating based on your active dosha state to restore digestive fire (Agni).",
    pillars: [
      { title: "Agni Alignment", desc: "Optimize bio-accessibility of nutrients by tailoring ingredients to strengthen digestive fire." },
      { title: "Low Glycemic Focus", desc: "Support metabolic conditions like insulin resistance using high-fiber, anti-inflammatory wholefoods." },
      { title: "Gut Rejuvenation", desc: "Restore the gut microbiome with customized ferments, herbs, and elimination protocols." }
    ],
    timeline: [
      { step: "01", title: "Dietary Baseline Logs", desc: "Log your daily meals, cravings, energy cycles, and bowel parameters." },
      { step: "02", title: "Specialist Consultation", desc: "Align with your clinical nutritionist to review inflammatory triggers and dosha rules." },
      { step: "03", title: "Custom Meal Blueprint", desc: "Receive weekly custom meal schedules, recipes, and spice recommendations." },
      { step: "04", title: "Adaptive Progression", desc: "Modify plans dynamically based on your energy levels and digestive feedback." }
    ],
    testimonial: {
      quote: "My nutritionist mapped a plan that respected my pitta imbalance while keeping my insulin spikes in check. My HbA1c dropped to 5.6%!",
      author: "Radhika Iyer",
      role: "Patient",
      avatar: yogaMira
    },
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300",
    iconColor: "text-teal-600 bg-teal-100/50 border-teal-500/10"
  },
  "yoga-therapy": {
    title: "Yoga Therapy",
    subtitle: "Decompress, Realign & Restore Autonomic Balance",
    image: "/services/yoga_therapy.png",
    icon: Waves,
    overview: "Receive posture-correcting yoga sequences, spine decompression routines, and therapeutic breathing exercises designed to align your physiology.",
    description: "Yoga therapy utilizes deliberate movement, breathing rhythms (Pranayama), and restorative positioning to calm the nervous system, lower cortisol, and rebuild core spine stability under clinical guidance.",
    pillars: [
      { title: "Anatomy Focused", desc: "Exercises are designed targeting spine alignment, joint safety, and core stabilization." },
      { title: "Vagal Stimulation", desc: "Regulate stress hormones by stimulating the parasympathetic nervous system through breath." },
      { title: "Clinical Onboarding", desc: "Yoga sequences are adapted to match clinical warnings defined by your doctor." }
    ],
    timeline: [
      { step: "01", title: "Postural & Breathing Screening", desc: "Log mobility scores, flexibility barriers, and respiratory parameters." },
      { step: "02", title: "1-on-1 Routine Design", desc: "Therapist constructs posture-correction modifications suited for your spine." },
      { step: "03", title: "Guided Execution", desc: "Join interactive video sessions or follow structured visual routine guides." },
      { step: "04", title: "Compliance Tracking", desc: "Update daily pain logs, and watch as your alignment metrics systematically improve." }
    ],
    testimonial: {
      quote: "The spine decompression yoga sessions completely resolved my lower back strain. I can finally sit and stand pain-free after years of discomfort.",
      author: "Manoj Rawat",
      role: "Software Architect",
      avatar: doctorKavya
    },
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    iconColor: "text-amber-600 bg-amber-100/50 border-amber-500/10"
  },
  "ai-health-assistant": {
    title: "AI Health Assistant",
    subtitle: "24/7 Companion for Habit Mapping & Dosha Checks",
    image: "/services/ai_assistant.png",
    icon: Brain,
    overview: "Access real-time answers, record symptoms, log daily dosha balances, and stay on track with automated reminders powered by clinical models.",
    description: "Our AI Health Assistant acts as an always-on clinical companion. It analyzes your daily vitals logs, answers wellness questions, maps habit milestones, and coordinates check-ins with your care team.",
    pillars: [
      { title: "Instant Dosha Checks", desc: "Log daily digestion and mood patterns to instantly update your kapha/pitta/vata scale." },
      { title: "Habit Reinforcement", desc: "Receive timely reminders for water intake, therapeutic postures, and prescription times." },
      { title: "Clinical Coordination", desc: "Critical flags are automatically escalated to your human doctor for review." }
    ],
    timeline: [
      { step: "01", title: "Intake Calibration", desc: "Synchronize your baseline reports and medical goals with the assistant." },
      { step: "02", title: "Daily Metrics Log", desc: "Chat naturally to record sleep cycles, water, mood, and digestion logs." },
      { step: "03", title: "Weekly Wellness Summary", desc: "Get diagnostic projections and habit mapping charts showing consistency." },
      { step: "04", title: "Escalation Pathways", desc: "Receive alerts to schedule check-ins if vital trends start sliding." }
    ],
    testimonial: {
      quote: "The 24/7 AI companion kept me accountable to my metabolic program. It's like having a wellness guide in my pocket at all times.",
      author: "Pooja Hegde",
      role: "Corporate Executive",
      avatar: doctorVikram
    },
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    iconColor: "text-blue-600 bg-blue-100/50 border-blue-500/10"
  },
  "preventive-health-monitoring": {
    title: "Preventive Health Monitoring",
    subtitle: "Track Vital Trends & Prevent Disease Escalation",
    image: "/services/preventive_monitoring.png",
    icon: HeartPulse,
    overview: "Maintain longitudinal vital trackers, monitor early metabolic risk signals, and keep your care team synced before warnings emerge.",
    description: "Proactive care requires regular vital logging. We compile heart rate patterns, blood pressure, glucose fluctuations, and sleep quality to create a dashboard accessible to both you and your doctor.",
    pillars: [
      { title: "Trend Analytics", desc: "Visualize clear progress graphs mapping out blood pressure and glucose over weeks." },
      { title: "Team Coordination", desc: "Clinicians receive notifications if metrics drift outside safe zones." },
      { title: "Secure Lockers", desc: "All medical records are stored under secure AES logs with HIPAA standard access audits." }
    ],
    timeline: [
      { step: "01", title: "Device Synchronization", desc: "Link wearable logs and record vitals inside your patient portal." },
      { step: "02", title: "Continuous Vital Checks", desc: "Input metrics like blood sugar and vitals in your simple dashboard." },
      { step: "03", title: "Automated Analysis", desc: "Algorithms flag anomalous spikes or cardiovascular stress indicators." },
      { step: "04", title: "Proactive Review", desc: "Doctor reviews longitudinal trends to adjust dose protocols early." }
    ],
    testimonial: {
      quote: "Monitoring my vitals let my care team adjust my diabetic targets early. Preventive diagnostics saved me from an emergency clinic visit.",
      author: "Siddharth Sen",
      role: "Retired Professor",
      avatar: doctorKavya
    },
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    iconColor: "text-purple-600 bg-purple-100/50 border-purple-500/10"
  },
  "ayurveda": {
    title: "Ayurveda",
    subtitle: "Restore Metabolic Balance Through Vedic Guidelines",
    image: "/services/ayurveda_detail.png",
    icon: Leaf,
    overview: "Optimize elemental dosha configuration, remove toxic accumulation (ama), and realign natural healing triggers.",
    description: "Ayurvedic therapy aligns your metabolism with constitutional rules. We map your vata/pitta/kapha characteristics to curate precise herbal remedies, oil massage suggestions, and customized seasonal habits.",
    pillars: [
      { title: "Panchakarma Detox", desc: "Systematic purification strategies to reset cell integrity." },
      { title: "Herbal Remedies", desc: "Select custom herbs like Ashwagandha, Shilajit, and Triphala mapped to active doshas." },
      { title: "Circadian Syncing", desc: "Align eating and sleep windows to strengthen biological rhythms." }
    ],
    timeline: [
      { step: "01", title: "Constitutional Profiling", desc: "Complete AI intake questionnaire to calculate dosha levels." },
      { step: "02", title: "Practitioner Consultation", desc: "Consult our verified Ayurvedic experts to check tongue and pulse indicators." },
      { step: "03", title: "Herbal Prescription", desc: "Receive custom formulas and detailed seasonal routine manuals." },
      { step: "04", title: "Baseline Monitoring", desc: "Track daily energy levels and log changes inside your patient app." }
    ],
    testimonial: {
      quote: "Correcting my Pitta dosha completely resolved my acidity and restored my sleep depth. The Vedic guidelines are incredibly simple to follow.",
      author: "Praveen Mehta",
      role: "Operations Manager",
      avatar: doctorVikram
    },
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    iconColor: "text-emerald-600 bg-emerald-100/50 border-emerald-500/10"
  },
  "naturopathy": {
    title: "Naturopathy",
    subtitle: "Accelerate Cellular Healing via Drugless Interventions",
    image: "/services/naturopathy_detail.png",
    icon: Stethoscope,
    overview: "Use natural elements (hydrotherapy, mud-packs, acupuncture, fasting) to eliminate toxins and restore vital energy.",
    description: "Naturopathy treats the root cause by removing internal obstacles. We design therapies that leverage raw elements, fasting cycles, acupuncture, and mud treatments to ignite your body's self-healing mechanisms under clinical supervision.",
    pillars: [
      { title: "Hydrotherapy resets", desc: "Apply alternate hot/cold compresses to stimulate vascular response." },
      { title: "Mud Balances", desc: "Use therapeutic earth packs on stomach or joints to draw out inflammation." },
      { title: "Clinical Fasting", desc: "Induce cellular autophagy with structured intermittent juice fasts." }
    ],
    timeline: [
      { step: "01", title: "Vitals Consultation", desc: "Clinical review to outline safe parameters and rule out contraindications." },
      { step: "02", title: "Mud & Water Prescription", desc: "Schedule specific Elemental therapies matched to your inflammatory markers." },
      { step: "03", title: "Acupuncture Alignment", desc: "Stimulate microvascular blood flow and pain-deactivation nodes." },
      { step: "04", title: "Regime Compliance Log", desc: "Update inflammation level indicators weekly inside your health portal." }
    ],
    testimonial: {
      quote: "Alternate hot-cold compresses and mud packs resolved my joint stiffness. My inflammation markers dropped to normal limits.",
      author: "Radha Deshmukh",
      role: "Yoga Instructor",
      avatar: doctorKavya
    },
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300",
    iconColor: "text-teal-600 bg-teal-100/50 border-teal-500/10"
  },
  "yoga": {
    title: "Yoga",
    subtitle: "Decompress Spine Joint Stiffness & Realign Physiology",
    image: "/services/yoga_detail.png",
    icon: Waves,
    overview: "Custom dynamic/static posture alignments to decompress lumbar discs, stretch hamstrings, and stabilize joints.",
    description: "Therapeutic yoga uses biomechanics to address mechanical issues. Postures are customized to avoid injury, decompress spinal vertebrae, and retrain muscles to maintain proper alignment.",
    pillars: [
      { title: "Joint Safety Rules", desc: "Postures are customized based on clinical limits to safeguard ligaments." },
      { title: "Vertebral Decompression", desc: "Use specific stretching vectors to ease lower back disc compression." },
      { title: "Muscle Activation", desc: "Activate glutes and deep core stabilizers to support the spine." }
    ],
    timeline: [
      { step: "01", title: "Flexibility Screening", desc: "Assess motion ranges and identify joint limitations." },
      { step: "02", title: "Sequence Configuration", desc: "Our specialists outline specific posture alterations tailored for your body." },
      { step: "03", title: "1-on-1 Practice", desc: "Perform movements under video guidelines from verified trainers." },
      { step: "04", title: "Daily Vitals Update", desc: "Log compliance metrics and pain indexes to review progression." }
    ],
    testimonial: {
      quote: "The personalized spine alignment poses completely resolved my lower back strain. I can sit comfortably for hours now.",
      author: "Neeraj Rawat",
      role: "Architect",
      avatar: doctorKavya
    },
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    iconColor: "text-amber-600 bg-amber-100/50 border-amber-500/10"
  },
  "meditation": {
    title: "Meditation",
    subtitle: "Calm Autonomic Stress Responses & Optimize Sleep Cycles",
    image: "/services/meditation_detail.png",
    icon: Brain,
    overview: "Use breath coordination (Pranayama) and focused attention methods to lower heart rate and reduce cortisol.",
    description: "Meditation functions as a clinical tool to tone the vagal nerve. By practicing breath pacing, mindfulness, and yoga nidra, you rebuild deep restorative sleep patterns and settle chronic stress.",
    pillars: [
      { title: "Vagal Stimulation", desc: "Paced breathing triggers your parasympathetic system to lower heart rate." },
      { title: "Attention Training", desc: "Quiet constant thoughts using simple somatic breath counters." },
      { title: "Circadian Sleep Sync", desc: "Implement calming audio sessions before bedtime to aid delta-wave cycles." }
    ],
    timeline: [
      { step: "01", title: "Stress Baseline Log", desc: "Review HRV indicators, sleep times, and daily focus limits." },
      { step: "02", title: "Breathing Instruction", desc: "Receive specific pranayama timers (e.g., box breathing) from guides." },
      { step: "03", title: "Somatic Exercises", desc: "Access guided mindfulness tracks and relaxation logs." },
      { step: "04", title: "Restoration Tracking", desc: "Watch sleep depth values increase on your wellness app charts." }
    ],
    testimonial: {
      quote: "Focused breathing routines calmed my daily work anxiety and extended my deep sleep cycles by 40 minutes.",
      author: "Sneha Sen",
      role: "HR Executive",
      avatar: doctorVikram
    },
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    iconColor: "text-blue-600 bg-blue-100/50 border-blue-500/10"
  },
  "lifestyle-diet": {
    title: "Lifestyle & Diet Guidance",
    subtitle: "Optimize Agni & Metabolic Trends with Targeted Foods",
    image: "/services/clinical_nutrition.png",
    icon: Activity,
    overview: "Condition-focused nutrition plans to manage glycemic levels, acidity, and metabolic trends.",
    description: "Food is the cornerstone of wellness (Ahara). We coordinate nutritional chemistry with Ayurvedic rules, helping you select wholefoods, optimize meal times, and heal gut flora according to your body's parameters.",
    pillars: [
      { title: "Gut Microbiome Focus", desc: "Rebuild helpful gut bacteria using natural prebiotics and spices." },
      { title: "Low Glycemic Options", desc: "Flatten blood sugar spikes using fiber-rich, anti-inflammatory meals." },
      { title: "Elimination Protocols", desc: "Settle food sensitivities by removing common inflammatory triggers." }
    ],
    timeline: [
      { step: "01", title: "Nutrition Logging", desc: "Log daily meals, energy patterns, and digestive behavior." },
      { step: "02", title: "Nutritionist Consult", desc: "Collaborate with a certified dietitian to map nutritional needs." },
      { step: "03", title: "Custom Meal Schedule", desc: "Receive structured weekly meal plans, recipes, and shopping lists." },
      { step: "04", title: "Dynamic Adjustments", desc: "Update recipes dynamically based on vital logs and bloating checks." }
    ],
    testimonial: {
      quote: "Changing my meals and spice profiles balanced my digestion. My HbA1c dropped to 5.7% without strict dieting.",
      author: "Pooja Roy",
      role: "Patient",
      avatar: doctorVikram
    },
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    iconColor: "text-purple-600 bg-purple-100/50 border-purple-500/10"
  }
};


const ServiceDetailPage = () => {
  const { slug } = useParams();
  
  const service = useMemo(() => {
    const key = typeof slug === "string" ? slug : "doctor-consultations";
    return servicesData[key] ?? servicesData["doctor-consultations"];
  }, [slug]);

  const IconComponent = service.icon;

  return (
    <div className="font-['Manrope',sans-serif] bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. Dynamic Hero Banner Section */}
      <section className="relative py-12 md:py-20 border-b border-border bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent_55%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Back link */}
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-8 group transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Services
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest", service.badgeColor)}>
                <IconComponent className="h-3.5 w-3.5" />
                {service.title}
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {service.subtitle}
              </h1>
              
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                {service.overview}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white font-bold px-8 h-12 rounded-xl shadow-lg hover:shadow-primary/10" asChild>
                  <Link href="/book-consultation">
                    Book Consultation
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border rounded-xl font-bold h-12" asChild>
                  <Link href="/pricing">
                    View Care Plans
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Image Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-border shadow-lg bg-muted"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-extrabold text-[#2F5E1A] uppercase tracking-wider">100% Proactive Care</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars of Recovery */}
      <section className="py-16 md:py-24 bg-muted/10 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="uppercase-label text-primary font-bold tracking-widest text-xs">Healthcare Foundation</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">Core Pillars of Recovery</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -5 }}
                className="bg-card border border-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 rounded-2xl flex flex-col justify-between group hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className={cn("p-2.5 rounded-xl border flex items-center justify-center shrink-0 w-11 h-11", service.iconColor)}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Care Process & Onboarding Timeline */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="uppercase-label text-primary font-bold tracking-widest text-xs">Patient Journey</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">How Care Onboarding Works</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {service.timeline.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border/80 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group min-h-[200px]"
              >
                <div className="absolute right-3 bottom-1 text-6xl font-black text-foreground/[0.02] select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  {step.step}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/10">
                      Step {step.step}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-normal mt-2">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Patient Testimonial Banner */}
      <section className="py-16 md:py-24 bg-muted/5 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="uppercase-label text-primary font-bold tracking-widest text-xs">Patient Success</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Recovery Testimonial</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border/80 shadow-sm p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 bg-muted">
              <img 
                src={service.testimonial.avatar} 
                alt={service.testimonial.author} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="space-y-4 text-center md:text-left flex-1 min-w-0">
              <div className="flex justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-accent text-accent" />
                ))}
              </div>
              
              <blockquote className="text-sm sm:text-base text-foreground font-medium italic leading-relaxed">
                "{service.testimonial.quote}"
              </blockquote>
              
              <div>
                <cite className="text-xs sm:text-sm font-black text-foreground not-italic block">{service.testimonial.author}</cite>
                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wide block">{service.testimonial.role}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Consultation CTA */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.1),transparent_60%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Begin Your Wellness Program?
          </h2>
          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Book a clinical profiling session today. Connect directly with MD physicians, Ayurvedic experts, and personal therapists under one dashboard.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button size="lg" className="bg-[#DDA853] hover:bg-[#c9953d] text-primary-foreground font-extrabold text-xs sm:text-sm px-8 h-12 rounded-xl shadow-lg" asChild>
              <Link href="/book-consultation">
                Book Consultation Now
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ServiceDetailPage;
