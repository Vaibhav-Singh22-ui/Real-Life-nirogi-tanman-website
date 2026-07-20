import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Leaf,
  ShieldCheck,
  Sparkles,
  Waves,
  HeartPulse,
  Activity,
  CheckCircle2,
  Award,
  BookOpen,
  Users,
  FileText,
  PhoneCall,
  Compass,
  Building2,
  Sparkle,
  ArrowUpRight,
  Star,
  Quote,
  Clock,
  Calendar,
  Video,
  Stethoscope,
  Cpu,
  Layers,
  Check,
  ChevronRight,
  AlertCircle,
  Moon,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import nirogiHero from "@/assets/nirogi-hero.png";
import nirogiHero2 from "@/assets/nirogi-hero-2.png";
import nirogiYoga from "@/assets/nirogi-yoga.png";
import nirogiYoga2 from "@/assets/nirogi-yoga-2.png";
import nirogiNutrition from "@/assets/nirogi-nutrition.jpg";
import nirogiNutrition2 from "@/assets/nirogi-nutrition-2.jpg";
import nirogiDoctor from "@/assets/nirogi-doctor.jpg";
import doctorVikram from "@/assets/doctor-vikram.jpg";
import yogaMira from "@/assets/yoga-mira.jpg";
import doctorKavya from "@/assets/doctor-kavya.jpg";
import PractitionerCard from "@/components/app/PractitionerCard";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { doctors, faqItems, yogaExperts } from "@/data/health-data";
import { cn, getImgSrc } from "@/lib/utils";

const heroSlides = [
  {
    id: "vedic",
    image: nirogiHero,
    title: "Vedic & Preventive Care",
    subtitle: "Nirogi Tanman Holistic Wellness",
    description: "Experience proactive health coaching that aligns your body, mind, and spirit.",
    icon: Sparkles,
    ctaText: "Book Consultation",
    ctaLink: "/book-consultation",
  },
  {
    id: "yoga",
    image: nirogiYoga,
    title: "Therapeutic Yoga Programs",
    subtitle: "Mindful Recovery",
    description: "Restore mobility, strength, and inner peace with custom instructor-guided routines.",
    icon: Waves,
    ctaText: "Find Yoga Experts",
    ctaLink: "/yoga-experts",
  },
  {
    id: "ayurveda-herbs",
    image: nirogiHero2,
    title: "Ayurvedic Herbal Remedies",
    subtitle: "Natural Healing",
    description: "Custom herbal preparations and detox therapies based on classic Vedic guidelines.",
    icon: Sparkles,
    ctaText: "Book Consultation",
    ctaLink: "/book-consultation",
  },
  {
    id: "meditation",
    image: nirogiYoga2,
    title: "Guided Meditation & Pranayama",
    subtitle: "Zen Consciousness",
    description: "Calm your nervous system, reduce chronic stress, and optimize sleep cycles with breathwork.",
    icon: Waves,
    ctaText: "Find Yoga Experts",
    ctaLink: "/yoga-experts",
  },
];

const servicePathways = [
  {
    title: "Clinical Consultation",
    description: "Private consultations with verified MDs and specialists. Get rigorous diagnoses and clinical care.",
    path: "/doctors",
    cta: "Consult a Doctor",
    icon: Stethoscope,
    badge: "100% Verified MDs",
    bgColor: "hover:border-[#2F5E1A]/40",
  },
  {
    title: "Therapeutic Yoga",
    description: "Rebuild mobility and strength with 1-on-1 guides. Access custom routines mapped to your profile.",
    path: "/yoga-experts",
    cta: "Find Yoga Instructors",
    icon: Waves,
    badge: "AYUSH Certified",
    bgColor: "hover:border-amber-500/40",
  },
  {
    title: "AI Diagnostics",
    description: "Access body constitution analysis, symptom checks, and health companions around the clock.",
    path: "/ai-dosha-assessment",
    cta: "Run Assessment",
    icon: Cpu,
    badge: "Instant & Free",
    bgColor: "hover:border-blue-500/40",
  },
  {
    title: "Integrated Plans",
    description: "Complete health memberships combining doctor care, personal trainers, and daily tracking.",
    path: "/pricing",
    cta: "Explore Care Plans",
    icon: Layers,
    badge: "All-Inclusive",
    bgColor: "hover:border-purple-500/40",
  },
];

const lifestyleConcerns = [
  {
    title: "Diabetes & Insulin Resistance",
    icon: Activity,
    description: "Lower HbA1c and manage glucose levels naturally.",
    color: "from-emerald-500/5 to-teal-500/5 hover:shadow-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30",
    iconColor: "text-emerald-600 bg-emerald-100/60 dark:bg-emerald-950/40",
  },
  {
    title: "Stress, Anxiety & Burnout",
    icon: Brain,
    description: "Calm your nervous system, reduce cortisol, and find balance.",
    color: "from-blue-500/5 to-indigo-500/5 hover:shadow-blue-500/5 border-blue-500/10 hover:border-blue-500/30",
    iconColor: "text-blue-600 bg-blue-100/60 dark:bg-blue-950/40",
  },
  {
    title: "Chronic Pain & Joint Health",
    icon: Waves,
    description: "Relieve spinal decompression issues and improve mobility.",
    color: "from-amber-500/5 to-orange-500/5 hover:shadow-amber-500/5 border-amber-500/10 hover:border-amber-500/30",
    iconColor: "text-amber-600 bg-amber-100/60 dark:bg-amber-950/40",
  },
  {
    title: "Hypertension & Heart Care",
    icon: HeartPulse,
    description: "Manage blood pressure and improve vascular health.",
    color: "from-red-500/5 to-rose-500/5 hover:shadow-red-500/5 border-red-500/10 hover:border-red-500/30",
    iconColor: "text-rose-600 bg-rose-100/60 dark:bg-rose-950/40",
  },
  {
    title: "Digestive & Gut Rejuvenation",
    icon: Leaf,
    description: "Settle acidity, IBS, bloating, and align digestion.",
    color: "from-lime-500/5 to-green-500/5 hover:shadow-lime-500/5 border-lime-500/10 hover:border-lime-500/30",
    iconColor: "text-lime-600 bg-lime-100/60 dark:bg-lime-950/40",
  },
  {
    title: "Insomnia & Sleep Cycles",
    icon: Moon,
    description: "Optimize circadian rhythms for deep restorative sleep.",
    color: "from-purple-500/5 to-fuchsia-500/5 hover:shadow-purple-500/5 border-purple-500/10 hover:border-purple-500/30",
    iconColor: "text-purple-600 bg-purple-100/60 dark:bg-purple-950/40",
  },
];

const approachSteps = [
  {
    number: "01",
    title: "AI Diagnostics & Dosha Mapping",
    description: "Complete clinical and Vedic intake questions to map your metabolic baseline and Ayurvedic doshas.",
    icon: Cpu,
    color: "from-blue-500/10 to-indigo-500/5 hover:border-blue-500/30 text-blue-600 bg-blue-100/50",
  },
  {
    number: "02",
    title: "Clinical Doctor Triage",
    description: "Consult 1-on-1 with a board-certified MD or Ayurvedic specialist to establish care parameters.",
    icon: Stethoscope,
    color: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/30 text-emerald-600 bg-emerald-100/50",
  },
  {
    number: "03",
    title: "Personalized Yoga & Nutrition",
    description: "Receive posture-correction yoga sequences and a diet plan tailored specifically to your vata/pitta/kapha scale.",
    icon: Waves,
    color: "from-amber-500/10 to-orange-500/5 hover:border-amber-500/30 text-amber-600 bg-amber-100/50",
  },
  {
    number: "04",
    title: "Continuous Monitoring & AI Chat",
    description: "Log vitals daily, set reminders, and chat with our 24/7 AI Health Assistant to maintain habits.",
    icon: Sparkles,
    color: "from-purple-500/10 to-fuchsia-500/5 hover:border-purple-500/30 text-purple-600 bg-purple-100/50",
  },
];

const featuredPrograms = [
  {
    id: "prog-gut",
    title: "30-Day Gut Rejuvenation",
    category: "Digestive Health",
    duration: "4 Weeks",
    intensity: "Gentle to Moderate",
    description: "Restore your gut microbiome and eliminate bloating through targeted Ayurvedic nutrition and restorative yoga therapy.",
    includes: ["2 Doctor Consultations", "Custom Gut Nutrition Guide", "Daily Restorative Yoga Routine", "AI Dosha Mapping & Reminders"],
    price: "₹3,999",
    image: nirogiNutrition2,
  },
  {
    id: "prog-metabolic",
    title: "Metabolic Health & Diabetes Reversal",
    category: "Cardio-Metabolic Care",
    duration: "12 Weeks",
    intensity: "Moderate",
    description: "A clinically supervised program combining doctor care, metabolic yoga, and low-glycemic dietary plans to lower HbA1c.",
    includes: ["6 Doctor Consultations", "Continuous Glucose Tracking Support", "12 Live Yoga Sessions", "24/7 AI Clinical Assistant Support"],
    price: "₹9,999",
    image: nirogiNutrition,
  },
  {
    id: "prog-spine",
    title: "Spine Decompression & Posture Care",
    category: "Musculoskeletal Wellness",
    duration: "6 Weeks",
    intensity: "Therapeutic",
    description: "Align your posture, relieve chronic lower back strain, and build core stability using targeted yoga therapy routines.",
    includes: ["1 Specialist Assessment", "12 Group Therapeutic Sessions", "Spine Mobility Video Library", "Daily Pain-Level Tracking & Alerts"],
    price: "₹4,499",
    image: nirogiYoga2,
  },
];

const featuredProducts = [
  {
    id: "ashwagandha-stress-relief",
    name: "Ashwagandha Calming Complex",
    description: "Premium Ashwagandha extract to help body adapt to stress and improve sleep quality.",
    image: "/ashwagandha_product.png",
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.9,
    options: ["60 Capsules", "120 Capsules"],
    reviewsCount: 312,
    stock: 12,
    category: "Stress Relief"
  },
  {
    id: "shilajit-gold-capsules",
    name: "Shilajit Gold Capsules",
    description: "Premium purification with gold dust for vitality, energy, and strength.",
    image: "/shilajit_gold_product.png",
    price: 899,
    originalPrice: 1599,
    discount: 44,
    rating: 4.7,
    options: ["1 Month", "2 Months", "3 Months"],
    reviewsCount: 124,
    stock: 3,
    category: "Vitality"
  },
  {
    id: "ayuja-capsules",
    name: "Ayuja Capsules",
    description: "Pure Ayurvedic blend for immune support, stress relief, and cellular rejuvenation.",
    image: "/ayuja_product.png",
    price: 1299,
    originalPrice: 2199,
    discount: 42,
    rating: 4.8,
    options: ["90 Days", "2 Months", "1 Month"],
    reviewsCount: 156,
    stock: 25,
    category: "Immunity"
  },
];

const patientTestimonials = [
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
];

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBooking, setActiveBooking] = useState<any | null>(null);

  // Contact Form state variables
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; desc: string } | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    setSubmitting(true);
    setSuccessInfo(null);

    setTimeout(() => {
      setSubmitting(false);
      setSuccessInfo({
        title: "Message Sent!",
        desc: "Thank you for contacting care coordination. We will get back to your inbox within 2 hours."
      });
      toast.success("Enquiry received successfully!");

      // Reset text inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  // Mobile collapsed programs state
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5500);

    const savedBooking = localStorage.getItem("nirogi_active_booking");
    if (savedBooking) {
      try {
        setActiveBooking(JSON.parse(savedBooking));
      } catch (e) {
        console.error("Error reading active booking", e);
      }
    }

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const swipeDistance = touchEndX - touchStartX.current;
    const swipeThreshold = 48;

    if (swipeDistance <= -swipeThreshold) {
      goToNextSlide();
    } else if (swipeDistance >= swipeThreshold) {
      goToPreviousSlide();
    }

    touchStartX.current = null;
  };

  const filteredProducts = selectedCategory === "All" 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === selectedCategory);

  const toggleProgramExpansion = (id: string) => {
    setExpandedProgramId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden font-['Manrope',sans-serif]">
      {/* Consultation Reminder Top Banner */}
      {activeBooking && (
        <div className="bg-amber-500 text-amber-950 px-4 py-3 text-center text-xs md:text-sm font-bold flex items-center justify-center gap-3 border-b border-amber-600 relative z-50">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 animate-pulse" />
          <span>
            UPCOMING APPOINTMENT: Your video session with {activeBooking.practitionerName} ({activeBooking.practitionerTitle}) is scheduled for {activeBooking.date} at {activeBooking.timeSlot}.
          </span>
          <Button variant="ghost" size="sm" className="bg-amber-950 text-white hover:bg-amber-900 border border-amber-800 rounded-lg text-[10px] font-extrabold px-3 py-1.5 shrink-0" asChild>
            <Link href="/patient/dashboard">Join Consultation Room</Link>
          </Button>
        </div>
      )}

      {/* 1. Hero Carousel */}
      <section className="border-b border-border bg-hero-gradient">
        <div
          className="relative h-[65vh] min-h-[480px] sm:h-[calc(100vh-5rem)] sm:min-h-[600px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Hero services carousel"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroSlides[activeSlide].id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={getImgSrc(heroSlides[activeSlide].image)}
                alt={heroSlides[activeSlide].title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/45 z-10" />

              <div className="absolute inset-0 flex items-center z-20">
                <div className="container px-4 sm:px-6 md:px-12 mx-auto">
                  <div className="max-w-3xl text-white space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-primary/40 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                    >
                      <Sparkles className="h-4 w-4 text-[#DDA853]" />
                      {heroSlides[activeSlide].subtitle}
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] text-balance"
                    >
                      {heroSlides[activeSlide].title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-sm sm:text-base md:text-xl text-white/90 font-light max-w-2xl leading-relaxed"
                    >
                      {heroSlides[activeSlide].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.5 }}
                      className="pt-4 flex flex-col sm:flex-row gap-3"
                    >
                      <Button className="min-w-44 bg-primary text-primary-foreground hover:bg-primary/95 text-sm sm:text-base font-bold h-11 sm:h-12 shadow-lg hover:shadow-primary/20 transition-all rounded-xl" asChild>
                        <Link href={heroSlides[activeSlide].ctaLink}>
                          {heroSlides[activeSlide].ctaText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="min-w-44 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sm sm:text-base font-bold h-11 sm:h-12 rounded-xl" asChild>
                        <Link href="/about">
                          Learn Our Approach
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-15 pointer-events-none" />

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 flex w-[80%] -translate-x-1/2 items-center justify-center gap-2 z-30">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"}`}
                aria-label={`Play slide ${index + 1}`}
                aria-current={activeSlide === index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Integrated Wellness Proposition */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left Content Column */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                <Activity className="h-3.5 w-3.5 animate-pulse" />
                Integrated Healthcare Model
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                One Unified Journey to Proactive Health
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                Connecting verified doctors, yoga therapists, and 24/7 AI metrics mapping inside a single digital recovery ecosystem.
              </p>

              {/* Bold Metrics List widget */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
                <div className="space-y-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-primary block">94%</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Patient Recovery Rate</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-primary block">10k+</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Consultation Sessions</span>
                </div>
              </div>
            </div>

            {/* Right Widget Column: Interactive Integrated Loop SVG Diagram */}
            <div className="bg-muted/30 border border-border p-6 sm:p-8 rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px]" />
              
              {/* Graphic Diagram */}
              <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto drop-shadow-md">
                {/* Circular feedback track */}
                <circle cx="120" cy="120" r="75" fill="none" stroke="currentColor" className="text-primary/15" strokeWidth="2.5" />
                <circle cx="120" cy="120" r="75" fill="none" stroke="currentColor" className="text-primary/40 animate-spin duration-[40s] origin-center" strokeWidth="2.5" strokeDasharray="12,12" />

                {/* Central brand badge */}
                <circle cx="120" cy="120" r="28" className="fill-card stroke-border" strokeWidth="1" />
                <text x="120" y="117" textAnchor="middle" className="text-[10px] font-black fill-primary uppercase leading-none font-sans">Nirogi</text>
                <text x="120" y="129" textAnchor="middle" className="text-[8px] font-bold fill-muted-foreground uppercase leading-none font-sans">Ecosystem</text>

                {/* Node 1: Clinical (Top) */}
                <g className="translate-y-[-10px]">
                  <circle cx="120" cy="45" r="22" className="fill-card stroke-border hover:stroke-primary transition-all duration-300" strokeWidth="1.5" />
                  <circle cx="120" cy="45" r="16" className="fill-primary/10 text-primary" />
                  <path d="M120 37v16M112 45h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
                  <text x="120" y="78" textAnchor="middle" className="text-[8px] font-extrabold fill-foreground uppercase tracking-wide">MD Doctors</text>
                </g>

                {/* Node 2: Yoga (Bottom Right) */}
                <g className="translate-x-[15px]">
                  <circle cx="185" cy="158" r="22" className="fill-card stroke-border hover:stroke-amber-500 transition-all duration-300" strokeWidth="1.5" />
                  <circle cx="185" cy="158" r="16" className="fill-amber-500/10 text-amber-600" />
                  {/* Small wave path represent yoga */}
                  <path d="M178 158c3.5-3 5.5-3 9 0s5.5 3 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-amber-600" />
                  <text x="185" y="191" textAnchor="middle" className="text-[8px] font-extrabold fill-foreground uppercase tracking-wide">Yoga Guides</text>
                </g>

                {/* Node 3: AI diagnostics (Bottom Left) */}
                <g className="translate-x-[-15px]">
                  <circle cx="55" cy="158" r="22" className="fill-card stroke-border hover:stroke-blue-500 transition-all duration-300" strokeWidth="1.5" />
                  <circle cx="55" cy="158" r="16" className="fill-blue-500/10 text-blue-600" />
                  {/* Small spark star path for AI */}
                  <path d="M55 150v16M47 158h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-600" />
                  <text x="55" y="191" textAnchor="middle" className="text-[8px] font-extrabold fill-foreground uppercase tracking-wide">24/7 AI Sync</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Healthcare Practitioners */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          {/* Trust Badges Banner */}
          <div className="max-w-5xl mx-auto bg-muted/30 border border-border rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 mb-16 text-center md:text-left">
            <div className="space-y-1 max-w-xs">
              <h4 className="text-base sm:text-lg font-bold text-foreground">Clinically Certified</h4>
              <p className="text-muted-foreground text-xs font-medium">All healthcare practitioners are vetted prior to session onboarding.</p>
            </div>
            <div className="h-px w-full md:h-12 md:w-px bg-border" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-foreground">AYUSH Certified Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-foreground">100% Verified MDs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-foreground">HIPAA Compliant Cloud</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1.5">Trusted Experts</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Featured Healthcare Doctors</h2>
            </div>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl text-xs font-bold" asChild>
              <Link href="/doctors">View All Doctors</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {doctors.slice(0, 3).map((doctor) => (
              <motion.div key={doctor.id} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <PractitionerCard
                  id={doctor.id}
                  name={doctor.name}
                  title={doctor.specialty}
                  extraLabel="Experience"
                  extraValue={doctor.experience}
                  rating={doctor.rating}
                  fee={doctor.fee}
                  availability={doctor.availability}
                  image={doctor.image}
                  type="doctor"
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1.5">Therapeutic Movement</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Featured Yoga Specialists</h2>
            </div>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl text-xs font-bold" asChild>
              <Link href="/yoga-experts">View All Yoga Experts</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {yogaExperts.slice(0, 3).map((y) => (
              <motion.div key={y.id} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <PractitionerCard
                  id={y.id}
                  name={y.name}
                  title={`Yoga Therapist (${y.specialty})`}
                  extraLabel="Sessions Delivered"
                  extraValue={`${y.sessions}+ sessions`}
                  rating={y.rating}
                  fee="₹1,000"
                  availability="Daily slots available"
                  image={y.image}
                  type="yoga"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nirogi AI Health Suite */}
      <section className="section-band bg-[#FAF8F5] border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="uppercase-label text-primary font-bold tracking-widest text-xs mb-2">Smart Digital Care</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Nirogi AI Health Suite</h2>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.01, y: -6 }}
              className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/10">
                    Vedic Baseline
                  </span>
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Cpu className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">AI Dosha Assessment</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Establish your constitutional baseline by mapping your metabolic profile, sleep patterns, and daily habits.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Vata, Pitta & Kapha metric scales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>15-Minute guided body constitution questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Instant biological baseline report generation</span>
                  </li>
                </ul>
              </div>
              <Button className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-xl py-5" asChild>
                <Link href="/ai-dosha-assessment">
                  Start Dosha Profiling
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01, y: -6 }}
              className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/10">
                    24/7 Co-Pilot
                  </span>
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Nirogi AI Health Assistant</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Consult our advanced AI companion to design customized Ayurvedic diets, analyze lab reports, and log workouts.
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Analyze blood test biomarkers and health logs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Generate custom low-glycemic dietary templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Interactive Box Breathing timer logs</span>
                  </li>
                </ul>
              </div>
              <Button className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-xl py-5" asChild>
                <Link href="/ai-health-assistant">
                  Access AI Assistant
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Lifestyle Concern Navigation */}
      <section className="section-band bg-muted/10 border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="uppercase-label text-primary font-bold tracking-widest text-xs">Targeted Care</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Navigate by Lifestyle Concern</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {lifestyleConcerns.map((concern) => (
              <motion.div
                key={concern.title}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn(
                  "flex gap-4 p-5 rounded-2xl border border-border bg-gradient-to-br hover:shadow-md transition-all cursor-pointer",
                  concern.color
                )}
              >
                <div className={cn("p-3 rounded-xl shrink-0 h-fit transition-transform duration-300 hover:rotate-6", concern.iconColor)}>
                  <concern.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">{concern.title}</h3>
                  <p className="text-muted-foreground text-xs leading-normal">{concern.description}</p>
                  <Link href="/book-consultation" className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline pt-1">
                    Book Specialist
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Service Selection Pathways */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="uppercase-label text-primary font-bold tracking-widest text-xs mb-2">Explore Modules</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Select Your Pathway</h2>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {servicePathways.map((pathway) => (
              <motion.div
                key={pathway.title}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -6 }}
                className={cn(
                  "bg-card border border-border p-6 rounded-3xl shadow-sm flex flex-col justify-between duration-300 group",
                  pathway.bgColor
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/10">
                      {pathway.badge}
                    </span>
                    <pathway.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {pathway.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                    {pathway.description}
                  </p>
                </div>
                <Button variant="ghost" className="w-full text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground border border-primary/20 rounded-xl transition-all duration-300 py-5" asChild>
                  <Link href={pathway.path}>
                    {pathway.cta}
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Featured Products with Category Filters */}
      <section className="section-band bg-muted/10 border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1.5">Purified Supplements</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Featured Wellness Products</h2>
            </div>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl text-xs font-bold self-start sm:self-auto" asChild>
              <Link href="/shop">Browse Store &rarr;</Link>
            </Button>
          </div>

          {/* Product Category Filters */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {["All", "Vitality", "Stress Relief", "Immunity"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="h-full">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 7. Explanation of the Consultation Process */}
      <section className="section-band bg-muted/20 border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="uppercase-label text-primary font-bold tracking-widest text-xs">Seamless Access</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">The Consultation Process</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Stethoscope,
                title: "1. Choose Specialist",
                desc: "Filter doctors or yoga experts by concern, experience, or ratings.",
              },
              {
                icon: Calendar,
                title: "2. Schedule Date & Time",
                desc: "Select a slot for online video consultation or in-person clinic appointments.",
              },
              {
                icon: Video,
                title: "3. Private Video Call",
                desc: "Meet inside our secure HD video interface, private and encrypted.",
              },
              {
                icon: FileText,
                title: "4. Receive Care Plan",
                desc: "Your digital prescription, yoga plans, and meal guides sync instantly to your dashboard.",
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-card border border-border p-6 rounded-2xl space-y-4 hover:border-primary/20 duration-300 shadow-sm">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Programs (Responsive & Collapsible on Mobile) */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="max-w-3xl mb-12 text-left">
            <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1.5">Guided Curated Curriculums</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Featured Wellness Programmes</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((prog) => {
              const isExpanded = expandedProgramId === prog.id;
              return (
                <motion.div
                  key={prog.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-muted">
                      <img
                        src={getImgSrc(prog.image)}
                        alt={prog.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {prog.category}
                      </div>
                    </div>
                    
                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {prog.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-3.5 w-3.5" />
                          {prog.intensity}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug tracking-tight">
                        {prog.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {prog.description}
                      </p>

                      {/* Mobile Expansion Toggler widget */}
                      <div className="block sm:hidden">
                        <button
                          onClick={() => toggleProgramExpansion(prog.id)}
                          className="flex items-center gap-1 text-[11px] font-extrabold text-primary uppercase tracking-wide hover:underline focus:outline-none"
                        >
                          {isExpanded ? (
                            <>
                              Hide details <ChevronUp className="h-3.5 w-3.5" />
                            </>
                          ) : (
                            <>
                              View includes details <ChevronDown className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Checklist wrapper: always visible on desktop, toggled on mobile */}
                      <div className={cn("space-y-2 pt-2 transition-all duration-300", !isExpanded && "hidden sm:block")}>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Program Includes:</p>
                        <ul className="grid grid-cols-1 gap-1.5 text-xs text-muted-foreground">
                          {prog.includes.map((inc, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="truncate">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between font-sans">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Total Enrollment Fee</span>
                      <span className="text-lg sm:text-xl font-extrabold text-foreground">{prog.price}</span>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-xl" asChild>
                      <Link href="/book-consultation">Enroll Now</Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 10. Corporate Wellness segment */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                <Building2 className="h-3.5 w-3.5" />
                Workforce Health
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Empower Your Employees with Corporate Wellness
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Prevent workforce burnout, resolve chronic physical strain, and foster focus. We deliver custom clinical screening, interactive desk yoga sessions, and dietary guidance.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Desk Yoga Workshops", desc: "15-minute alignment routines to relieve computer fatigue." },
                  { title: "Metabolic Risk Screen", desc: "On-site and virtual doctor assessment checks." },
                  { title: "Stress & Resilience Workshops", desc: "Deep pranayama breathing coaching." },
                  { title: "Custom Employee Portals", desc: "Private dashboard access to care team profiles." },
                ].map((item, i) => (
                  <div key={i} className="space-y-1 border-l-2 border-primary/40 pl-4">
                    <h4 className="font-bold text-foreground text-xs">{item.title}</h4>
                    <p className="text-muted-foreground text-[10px] leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-xl h-11" asChild>
                  <Link href="/contact?type=corporate">Request Corporate Plan</Link>
                </Button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border h-80 sm:h-96 lg:h-[450px]">
              <img
                src={getImgSrc(nirogiDoctor)}
                alt="Corporate wellness clinic checking employee health indicators"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-black/90 backdrop-blur-md p-4 rounded-xl border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Average Corporate Retention</span>
                  <span className="text-sm font-black text-primary">92% Engagement Score</span>
                </div>
                <Users className="h-8 w-8 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Educational Resources (Latest Insights) */}
      <section className="section-band bg-background border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1.5">Health Education</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Latest Wellness Insights</h2>
            </div>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl text-xs font-bold self-start md:self-auto" asChild>
              <Link href="/blog">View All Publications</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "How Vedic preventive care improves long-term outcomes",
                desc: "Discover how traditional alignment principles meet modern physiological assessments to prevent metabolic issues.",
                readTime: "5 min read",
                category: "Preventive Care",
                author: "Dr. Kavya Menon",
              },
              {
                title: "Building sustainable nutrition habits for busy schedules",
                desc: "Practical adjustments and dietary templates that keep your blood glucose and metabolic energy stable.",
                readTime: "7 min read",
                category: "Ayurvedic Diet",
                author: "Priya Iyer, Dietitian",
              },
              {
                title: "Yoga therapy for stress, posture, and recovery",
                desc: "A focus on mechanical spine decompression, vagal toning, and daily joint mobility protocols.",
                readTime: "6 min read",
                category: "Yoga Therapy",
                author: "Arjun Dev, Therapist",
              },
            ].map((post, idx) => (
              <Card key={idx} className="surface-panel flex flex-col justify-between p-6 bg-card border-border shadow-sm hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-primary tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {post.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/40 mt-6 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-semibold">By {post.author}</span>
                  <Button variant="link" className="text-primary text-xs font-bold p-0 flex items-center gap-1" asChild>
                    <Link href="/blog">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Explanation of the Wellness Approach */}
      <section className="section-band bg-muted/10 border-b border-border py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.04),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="uppercase-label text-primary font-bold tracking-widest text-xs">Our Methodology</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">The Science Meets Heritage Loop</h2>
          </div>

          {/* Redesigned Methodology Cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto"
          >
            {approachSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -8 }}
                className={cn(
                  "bg-card border border-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                )}
              >
                {/* Background watermarked step number */}
                <div className="absolute right-4 bottom-2 text-7xl font-extrabold text-foreground/[0.03] select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  {step.number}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/10">
                      Step {step.number}
                    </span>
                    <div className={cn("p-2.5 rounded-xl border flex items-center justify-center shrink-0", step.color)}>
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-2.5">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 13. Testimonials Section (Pictorial) */}
      <section className="section-band bg-muted/20 border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="uppercase-label text-primary font-bold tracking-widest text-xs">Success Stories</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Testimonials</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {patientTestimonials.map((test, idx) => (
              <Card key={idx} className="surface-panel p-6 flex flex-col justify-between border-border bg-card shadow-sm hover:shadow-md transition-all">
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
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQs Section */}
      <section className="section-band bg-muted/10 border-b border-border py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
          <Card className="surface-panel overflow-hidden border-border bg-card shadow-sm">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <p className="uppercase-label text-primary font-bold tracking-widest text-xs mb-1">Got Questions?</p>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 sm:px-6 pb-6 pt-0">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`home-faq-${index}`} className="rounded-xl border border-border bg-background px-4">
                    <AccordionTrigger className="text-left text-sm md:text-base font-bold text-foreground hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 14. Contact Us Section */}
      <section className="section-band bg-white border-t border-border py-16 md:py-24 font-['Manrope',sans-serif]">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <p className="uppercase-label text-primary font-bold tracking-widest text-xs">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Contact Care Coordination
            </h2>
            <p className="text-muted-foreground text-sm font-light max-w-xl mx-auto leading-relaxed">
              Have questions or need assistance? Submit your enquiry below and our coordinators will reach out shortly.
            </p>
          </div>

          <Card className="surface-panel rounded-2xl shadow-md border-border overflow-hidden bg-card">
            <CardContent className="p-6 md:p-8">
              {successInfo ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn font-sans">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{successInfo.title}</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">{successInfo.desc}</p>
                  <Button variant="outline" className="rounded-xl text-xs font-bold" onClick={() => setSuccessInfo(null)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="fname" className="font-bold text-xs">First Name</Label>
                      <Input id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="rounded-xl h-11" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="lname" className="font-bold text-xs">Last Name</Label>
                      <Input id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="rounded-xl h-11" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="email" className="font-bold text-xs">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="rounded-xl h-11" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="phone" className="font-bold text-xs">Contact Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact Number" className="rounded-xl h-11" />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="msgText" className="font-bold text-xs">Message / Description</Label>
                    <Textarea
                      id="msgText"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Provide all details here..."
                      className="min-h-28 rounded-xl resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 15. Responsible Disclaimer */}
      <section className="bg-muted py-8 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2.5 text-muted-foreground">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Responsible Wellness Notice</span>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground/80 leading-relaxed font-light">
            <strong>Medical and Wellness Disclaimer:</strong> Nirogi Tanman does not provide emergency medical services.
            The artificial intelligence suggestions, assessments, and habit tracking options are educational in nature and
            do not replace professional clinical diagnosis, treatment plan reviews, or active medication protocols.
            Always consult a verified practitioner before starting new fitness regimens, modifying dietary configurations, or adjusting clinical therapies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

