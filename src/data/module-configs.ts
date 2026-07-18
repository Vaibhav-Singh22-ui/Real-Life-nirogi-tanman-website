export type ModuleConfig = {
  title: string;
  description: string;
};

export const doctorConfigs: Record<string, ModuleConfig> = {
  dashboard: {
    title: "Doctor Dashboard",
    description: "Clinical workflow overview with patient insights and scheduling controls.",
  },
  "todays-schedule": {
    title: "Today's Schedule",
    description: "View and manage today's appointments and priorities.",
  },
  appointments: {
    title: "Appointments",
    description: "Manage consultation pipeline and patient interactions.",
  },
  "patient-queue": {
    title: "Patient Queue",
    description: "Monitor check-ins and triage queue in real time.",
  },
  "patient-details": {
    title: "Patient Details",
    description: "Patient profile with history, vitals, and longitudinal trends.",
  },
  "medical-history": {
    title: "Medical History",
    description: "Structured historical records for diagnosis continuity.",
  },
  consultation: {
    title: "Consultation",
    description: "In-session care workspace for findings and recommendations.",
  },
  "video-call": {
    title: "Video Call Screen",
    description: "Remote consultation module with note sync and follow-up actions.",
  },
  "prescription-builder": {
    title: "Prescription Builder",
    description: "Create and share digital prescriptions with safety checks.",
  },
  "medical-notes": {
    title: "Medical Notes",
    description: "Clinician notes with structured templates and timeline context.",
  },
  reports: {
    title: "Reports",
    description: "Clinical reports and care outcomes summary.",
  },
  availability: {
    title: "Availability",
    description: "Control consultation slots and clinic hours.",
  },
  revenue: {
    title: "Revenue",
    description: "Consultation earning overview and payout tracking.",
  },
  analytics: {
    title: "Analytics",
    description: "Performance insights across patient outcomes and workload.",
  },
  notifications: {
    title: "Notifications",
    description: "Care alerts, schedule updates, and patient messages.",
  },
  settings: {
    title: "Settings",
    description: "Doctor profile, preferences, and account security.",
  },
};

export const yogaConfigs: Record<string, ModuleConfig> = {
  dashboard: {
    title: "Yoga Instructor Dashboard",
    description: "Session planning, patient progress, and attendance overview.",
  },
  patients: {
    title: "Patients",
    description: "Patients enrolled in yoga therapy programs.",
  },
  "yoga-routine-builder": {
    title: "Yoga Routine Builder",
    description: "Create adaptive routines based on diagnosis and flexibility level.",
  },
  "exercise-library": {
    title: "Exercise Library",
    description: "Curated movement and asana reference library.",
  },
  "meditation-sessions": {
    title: "Meditation Sessions",
    description: "Guided session schedules and compliance tracking.",
  },
  attendance: {
    title: "Attendance",
    description: "Track class attendance and engagement metrics.",
  },
  progress: {
    title: "Progress",
    description: "Therapy progression and routine effectiveness insights.",
  },
  calendar: {
    title: "Calendar",
    description: "Session and consultation calendar management.",
  },
  notifications: {
    title: "Notifications",
    description: "Routine reminders and follow-up alerts.",
  },
  settings: {
    title: "Settings",
    description: "Instructor profile and delivery preferences.",
  },
};

export const adminConfigs: Record<string, ModuleConfig> = {
  dashboard: {
    title: "Admin Dashboard",
    description: "Platform operations command center with governance and growth metrics.",
  },
  analytics: {
    title: "Analytics",
    description: "Cross-role analytics, conversion funnels, and retention insights.",
  },
  revenue: {
    title: "Revenue",
    description: "Billing, subscriptions, and financial performance overview.",
  },
  users: {
    title: "Users",
    description: "Manage patient and practitioner user accounts.",
  },
  doctors: {
    title: "Doctors",
    description: "Doctor onboarding and profile governance.",
  },
  "yoga-instructors": {
    title: "Yoga Instructors",
    description: "Yoga instructor management and allocations.",
  },
  appointments: {
    title: "Appointments",
    description: "Platform-wide appointment and fulfillment oversight.",
  },
  payments: {
    title: "Payments",
    description: "Transaction records and reconciliation workflows.",
  },
  subscriptions: {
    title: "Subscriptions",
    description: "Membership and renewal operations.",
  },
  cms: {
    title: "CMS",
    description: "Manage dynamic content blocks and messaging.",
  },
  blogs: {
    title: "Blogs",
    description: "Publish and schedule educational content.",
  },
  faqs: {
    title: "FAQs",
    description: "Knowledge base operations and updates.",
  },
  testimonials: {
    title: "Testimonials",
    description: "Review and publish patient testimonials.",
  },
  reports: {
    title: "Reports",
    description: "Generate operational and care quality reports.",
  },
  services: {
    title: "Services",
    description: "Manage service catalog and pricing definitions.",
  },
  "support-tickets": {
    title: "Support Tickets",
    description: "Customer support queue and issue resolution.",
  },
  roles: {
    title: "Roles",
    description: "Control access and role assignments.",
  },
  permissions: {
    title: "Permissions",
    description: "Fine-grained authorization management.",
  },
  "audit-logs": {
    title: "Audit Logs",
    description: "Operational and security event timeline.",
  },
  settings: {
    title: "Settings",
    description: "Global platform and governance settings.",
  },
};
