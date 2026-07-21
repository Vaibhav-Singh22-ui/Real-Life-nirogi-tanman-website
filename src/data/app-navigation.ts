import {
  Activity,
  BadgeDollarSign,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  Clock,
  ClipboardList,
  CreditCard,
  FileText,
  HeartPulse,
  Home,
  LayoutDashboard,
  Leaf,
  LifeBuoy,
  MessageSquare,
  Moon,
  NotebookTabs,
  Pill,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  UserRound,
  Video,
  Waves,
  ShoppingCart,
  Building2,
  Cpu,
} from "lucide-react";
import type { AppRole, NavItem } from "@/types/navigation";

export const publicNavItems = [
  { label: "Home", path: "/", icon: Home },
  {
    label: "About",
    path: "/about",
    icon: Leaf,
    subItems: [
      { label: "About NirogiTanman", path: "/about", icon: Leaf },
      { label: "Our Wellness Approach", path: "/wellness-approach", icon: Sparkles },
      { label: "Corporate Wellness", path: "/corporate-wellness", icon: Building2 },
      { label: "Practitioners", path: "/practitioners", icon: Users },
      { label: "Testimonials", path: "/testimonials", icon: MessageSquare },
    ],
  },
  {
    label: "Services",
    path: "/services",
    icon: HeartPulse,
    subItems: [
      { label: "Ayurveda", path: "/services/ayurveda", icon: Leaf },
      { label: "Naturopathy", path: "/services/naturopathy", icon: Stethoscope },
      { label: "Yoga", path: "/services/yoga", icon: Waves },
      { label: "Meditation", path: "/services/meditation", icon: Moon },
      { label: "Lifestyle & Diet Guidance", path: "/services/lifestyle-diet", icon: Sparkles },
    ],
  },
  { label: "Shop", path: "/shop", icon: ShoppingCart },
  {
    label: "Programmes",
    path: "/programmes",
    icon: Calendar,
    subItems: [
      { label: "Stress & Sleep Support", path: "/programmes/stress-sleep", icon: Moon },
      { label: "Metabolic Wellness", path: "/programmes/metabolic-wellness", icon: Activity },
      { label: "Weight-Management Support", path: "/programmes/weight-management", icon: TrendingUp },
      { label: "Digestive Wellness", path: "/programmes/digestive-wellness", icon: Leaf },
      { label: "Senior Wellness", path: "/programmes/senior-wellness", icon: Users },
      { label: "Women’s Wellness", path: "/programmes/womens-wellness", icon: HeartPulse },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    icon: BookOpen,
    subItems: [
      { label: "Wellness Assessment", path: "/wellness-assessment", icon: Cpu },
      { label: "Articles", path: "/resources/articles", icon: BookOpen },
      { label: "Videos", path: "/resources/videos", icon: Video },
      { label: "Wellness Guides", path: "/resources/guides", icon: FileText },
      { label: "FAQs", path: "/faqs", icon: MessageSquare },
    ],
  },
  { label: "Contact", path: "/contact", icon: MessageSquare },
];

export const patientSidebar: NavItem[] = [
  { label: "Dashboard", path: "/patient/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", path: "/patient/ai-assistant", icon: Brain },
  { label: "AI Dosha Assessment", path: "/patient/ai-dosha-assessment", icon: Sparkles },
  { label: "Health Reports", path: "/patient/health-reports", icon: FileText },
  { label: "Medical Reports", path: "/patient/medical-reports", icon: NotebookTabs },
  { label: "Prescriptions", path: "/patient/prescriptions", icon: Pill },
  { label: "Appointments", path: "/patient/appointments", icon: Calendar },
  { label: "Bookings", path: "/patient/bookings", icon: BookOpen },
  { label: "Diet Planner", path: "/patient/diet-planner", icon: Utensils },
  { label: "Yoga Planner", path: "/patient/yoga-planner", icon: Waves },
  { label: "Lifestyle Planner", path: "/patient/lifestyle-planner", icon: Leaf },
  { label: "Sleep Tracker", path: "/patient/sleep-tracker", icon: Moon },
  { label: "Water Intake", path: "/patient/water-intake", icon: Activity },
  { label: "Exercise", path: "/patient/exercise", icon: TrendingUp },
  { label: "Mood", path: "/patient/mood", icon: HeartPulse },
  { label: "Weight", path: "/patient/weight", icon: Activity },
  { label: "Blood Pressure", path: "/patient/blood-pressure", icon: Activity },
  { label: "Blood Sugar", path: "/patient/blood-sugar", icon: Activity },
  { label: "Payments", path: "/patient/payments", icon: CreditCard },
];

export type NavGroup = {
  groupLabel: string;
  items: NavItem[];
};

export const doctorSidebarGroups: NavGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
      { label: "Today's Schedule", path: "/doctor/todays-schedule", icon: Clock },
    ],
  },
  {
    groupLabel: "Clinical OPD & Care",
    items: [
      { label: "Appointments", path: "/doctor/appointments", icon: ClipboardList },
      { label: "Patient Queue", path: "/doctor/patient-queue", icon: Users },
      { label: "Patient Details", path: "/doctor/patient-details", icon: UserRound },
      { label: "Medical History", path: "/doctor/medical-history", icon: NotebookTabs },
      { label: "Consultation Room", path: "/doctor/consultation", icon: Stethoscope },
      { label: "Video Tele-Call", path: "/doctor/video-call", icon: Video },
    ],
  },
  {
    groupLabel: "Rx & Diagnostics",
    items: [
      { label: "Prescription Builder", path: "/doctor/prescription-builder", icon: Pill },
      { label: "Clinical Notes", path: "/doctor/medical-notes", icon: FileText },
      { label: "Reports", path: "/doctor/reports", icon: ClipboardList },
    ],
  },
  {
    groupLabel: "Practice & Earnings",
    items: [
      { label: "Availability", path: "/doctor/availability", icon: Calendar },
      { label: "Revenue", path: "/doctor/revenue", icon: BadgeDollarSign },
      { label: "Analytics", path: "/doctor/analytics", icon: TrendingUp },
    ],
  },
];

export const yogaSidebarGroups: NavGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Dashboard", path: "/yoga/dashboard", icon: LayoutDashboard },
      { label: "Calendar", path: "/yoga/calendar", icon: Calendar },
    ],
  },
  {
    groupLabel: "Therapy & Students",
    items: [
      { label: "Patients", path: "/yoga/patients", icon: Users },
      { label: "Attendance", path: "/yoga/attendance", icon: ClipboardList },
      { label: "Progress", path: "/yoga/progress", icon: TrendingUp },
    ],
  },
  {
    groupLabel: "Asana & Routines",
    items: [
      { label: "Routine Builder", path: "/yoga/yoga-routine-builder", icon: Waves },
      { label: "Exercise Library", path: "/yoga/exercise-library", icon: Activity },
      { label: "Meditation Sessions", path: "/yoga/meditation-sessions", icon: Moon },
    ],
  },
];

export const patientSidebarGroups: NavGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Dashboard", path: "/patient/dashboard", icon: LayoutDashboard },
      { label: "Bookings", path: "/patient/bookings", icon: Calendar },
    ],
  },
  {
    groupLabel: "Personal Wellness",
    items: [
      { label: "Profile", path: "/patient/profile", icon: UserRound },
      { label: "Diet Planner", path: "/patient/diet-planner", icon: Utensils },
      { label: "Yoga Planner", path: "/patient/yoga-planner", icon: Waves },
      { label: "Lifestyle Planner", path: "/patient/lifestyle-planner", icon: Leaf },
      { label: "Sleep Tracker", path: "/patient/sleep-tracker", icon: Moon },
      { label: "Water Intake", path: "/patient/water-intake", icon: Activity },
    ],
  },
  {
    groupLabel: "Clinical Records",
    items: [
      { label: "Prescriptions", path: "/patient/prescriptions", icon: Pill },
      { label: "Vitals Tracker", path: "/patient/vitals-tracker", icon: HeartPulse },
      { label: "Mood Tracker", path: "/patient/mood", icon: HeartPulse },
      { label: "Medical Reports", path: "/patient/medical-reports", icon: NotebookTabs },
    ],
  },
];

export const adminSidebarGroups: NavGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Analytics", path: "/admin/analytics", icon: TrendingUp },
      { label: "Revenue", path: "/admin/revenue", icon: BadgeDollarSign },
    ],
  },
  {
    groupLabel: "User Management",
    items: [
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Doctors", path: "/admin/doctors", icon: Stethoscope },
      { label: "Yoga Instructors", path: "/admin/yoga-instructors", icon: Waves },
      { label: "Appointments", path: "/admin/appointments", icon: Calendar },
      { label: "Payments", path: "/admin/payments", icon: CreditCard },
      { label: "Subscriptions", path: "/admin/subscriptions", icon: BadgeDollarSign },
    ],
  },
  {
    groupLabel: "Content & Support",
    items: [
      { label: "CMS", path: "/admin/cms", icon: NotebookTabs },
      { label: "Blogs", path: "/admin/blogs", icon: BookOpen },
      { label: "FAQs", path: "/admin/faqs", icon: MessageSquare },
      { label: "Testimonials", path: "/admin/testimonials", icon: Users },
      { label: "Reports", path: "/admin/reports", icon: FileText },
      { label: "Services", path: "/admin/services", icon: HeartPulse },
      { label: "Support Tickets", path: "/admin/support-tickets", icon: LifeBuoy },
    ],
  },
  {
    groupLabel: "System Security",
    items: [
      { label: "Roles", path: "/admin/roles", icon: ShieldCheck },
      { label: "Permissions", path: "/admin/permissions", icon: ShieldCheck },
      { label: "Audit Logs", path: "/admin/audit-logs", icon: FileText },
    ],
  },
];

export const roleSidebarGroups: Record<AppRole, NavGroup[]> = {
  patient: patientSidebarGroups,
  doctor: doctorSidebarGroups,
  yoga: yogaSidebarGroups,
  admin: adminSidebarGroups,
};

export const roleSidebars: Record<AppRole, NavItem[]> = {
  patient: patientSidebarGroups.flatMap(g => g.items),
  doctor: doctorSidebarGroups.flatMap(g => g.items),
  yoga: yogaSidebarGroups.flatMap(g => g.items),
  admin: adminSidebarGroups.flatMap(g => g.items),
};
