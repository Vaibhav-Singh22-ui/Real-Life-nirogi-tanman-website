import doctorKavyaImage from "@/assets/doctor-kavya.jpg";
import doctorVikramImage from "@/assets/doctor-vikram.jpg";
import doctorRheaImage from "@/assets/doctor-rhea.jpg";

import yogaArjunImage from "@/assets/yoga-arjun.jpg";
import yogaMiraImage from "@/assets/yoga-mira.jpg";
import yogaNeelImage from "@/assets/yoga-neel.jpg";

export const metricsCards = [
  { title: "Health Score", value: "86", change: "+4.2%", trend: "up" },
  { title: "Resting Heart Rate", value: "68 bpm", change: "-2.1%", trend: "up" },
  { title: "Sleep Quality", value: "7h 42m", change: "+18 min", trend: "up" },
  { title: "Water Intake", value: "2.1 L", change: "84% goal", trend: "neutral" },
];

export const healthTrend = [
  { day: "Mon", score: 79, sleep: 7.1, steps: 6800 },
  { day: "Tue", score: 81, sleep: 7.4, steps: 7200 },
  { day: "Wed", score: 82, sleep: 7.6, steps: 8400 },
  { day: "Thu", score: 83, sleep: 7.3, steps: 7900 },
  { day: "Fri", score: 84, sleep: 7.8, steps: 9100 },
  { day: "Sat", score: 85, sleep: 8, steps: 9800 },
  { day: "Sun", score: 86, sleep: 7.7, steps: 8700 },
];

export const upcomingAppointments = [
  { id: "AP-3188", doctor: "Dr. Kavya Menon", specialty: "Integrative Medicine", date: "Today", time: "5:30 PM", mode: "Video" },
  { id: "AP-3197", doctor: "Dr. Meera Iyer", specialty: "Nutrition", date: "Jul 8", time: "11:15 AM", mode: "In Clinic" },
  { id: "AP-3202", doctor: "Dr. Rohan Das", specialty: "Yoga Therapy", date: "Jul 10", time: "7:00 AM", mode: "Session" },
];

export const doctors = [
  { id: "dr-kavya-menon", name: "Dr. Kavya Menon", specialty: "Integrative Medicine", experience: "14 years", rating: 4.9, fee: "₹1,800", availability: "Next available today", image: doctorKavyaImage },
  { id: "dr-vikram-shah", name: "Dr. Vikram Shah", specialty: "Cardio-Metabolic Care", experience: "11 years", rating: 4.8, fee: "₹1,600", availability: "Available tomorrow", image: doctorVikramImage },
  { id: "dr-rhea-singh", name: "Dr. Rhea Singh", specialty: "Lifestyle Medicine", experience: "9 years", rating: 4.7, fee: "₹1,400", availability: "Slots open this week", image: doctorRheaImage },
];

export const nutritionists: any[] = [];

export const yogaExperts = [
  { id: "yg-01", name: "Arjun Dev", specialty: "Therapeutic Yoga", sessions: 210, rating: 4.9, image: yogaArjunImage },
  { id: "yg-02", name: "Mira Patel", specialty: "Breathwork", sessions: 168, rating: 4.8, image: yogaMiraImage },
  { id: "yg-03", name: "Neel Joshi", specialty: "Mobility & Spine", sessions: 192, rating: 4.7, image: yogaNeelImage },
];

export const blogPosts = [
  { id: "understanding-dosha-balance", title: "Understanding Dosha Balance for Daily Energy", category: "Ayurveda", date: "Jul 2, 2026", excerpt: "A practical guide to aligning your meals, movement, and sleep with your body constitution." },
  { id: "sleep-and-inflammation", title: "How Sleep Quality Impacts Inflammation", category: "Lifestyle", date: "Jun 24, 2026", excerpt: "What your wearable data may be missing and how to build deeper recovery habits." },
  { id: "preventive-health-dashboard", title: "Designing Your Preventive Health Dashboard", category: "Digital Health", date: "Jun 14, 2026", excerpt: "How to combine diagnostics, coaching, and habits into one sustainable plan." },
];

export const faqItems = [
  {
    question: "How does Nirogi Tanman personalize healthcare plans?",
    answer: "Our platform combines your health inputs, session history, and lifestyle patterns to generate evidence-led recommendations from doctors, nutritionists, and yoga experts.",
  },
  {
    question: "Can I switch between online and in-clinic consultations?",
    answer: "Yes. Each practitioner profile displays available consultation modes and scheduling windows.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Nirogi Tanman uses role-based access and encrypted transport to protect health records and communication across modules.",
  },
  {
    question: "Does the AI assistant replace doctor consultation?",
    answer: "No. The AI assistant supports education and habit guidance, while diagnosis and prescriptions are provided by licensed professionals.",
  },
];

export const roleOverview = [
  { role: "Patient", path: "/patient/dashboard", description: "Track health metrics, appointments, plans, and personalized guidance." },
  { role: "Doctor", path: "/doctor/dashboard", description: "Manage consultations, queues, notes, prescriptions, and follow-up care." },
  { role: "Yoga Instructor", path: "/yoga/dashboard", description: "Build routines, track attendance, and deliver therapeutic sessions." },
  { role: "Admin", path: "/admin/dashboard", description: "Operate platform users, revenue, support, analytics, and governance." },
];
