export type PatientPageKey =
  | "ai-assistant"
  | "ai-dosha-assessment"
  | "health-reports"
  | "medical-reports"
  | "prescriptions"
  | "appointments"
  | "diet-planner"
  | "yoga-planner"
  | "lifestyle-planner"
  | "sleep-tracker"
  | "water-intake"
  | "exercise"
  | "mood"
  | "weight"
  | "blood-pressure"
  | "blood-sugar"
  | "notifications"
  | "payments"
  | "profile"
  | "settings"
  | "calendar";

type PatientPageContent = {
  title: string;
  description: string;
  focusLabel: string;
  focusValue: string;
  metrics: Array<{ label: string; value: string; helper: string }>;
  priorities: string[];
  timeline: Array<{ time: string; event: string; detail: string }>;
};

export const patientPages: Record<PatientPageKey, PatientPageContent> = {
  "ai-assistant": {
    title: "AI Assistant",
    description: "Personalized health guidance built from your activity, routines, and care history.",
    focusLabel: "Today’s prompt",
    focusValue: "Ask for a meal + movement plan for low-energy days",
    metrics: [
      { label: "Insights generated", value: "14", helper: "Last 7 days" },
      { label: "Tasks completed", value: "9/12", helper: "This week" },
      { label: "Follow-up reminders", value: "3", helper: "Pending" },
    ],
    priorities: [
      "Review morning hydration suggestion",
      "Confirm dinner timing recommendation",
      "Enable bedtime wind-down reminder",
    ],
    timeline: [
      { time: "08:10", event: "Morning summary", detail: "Energy trend: moderate" },
      { time: "13:25", event: "Meal suggestion", detail: "Fiber-forward lunch recommended" },
      { time: "20:45", event: "Sleep prep", detail: "Screen-off reminder sent" },
    ],
  },
  "ai-dosha-assessment": {
    title: "AI Dosha Assessment",
    description: "Track constitution signals and keep your routine aligned with your current state.",
    focusLabel: "Current balance",
    focusValue: "Vata elevated — calm + warming routine recommended",
    metrics: [
      { label: "Assessments", value: "5", helper: "This month" },
      { label: "Routine adherence", value: "82%", helper: "7-day trend" },
      { label: "Nutrition alignment", value: "4.2/5", helper: "Average score" },
    ],
    priorities: [
      "Prefer warm meals at dinner",
      "Move intense workouts to morning",
      "Keep evening stimulation low",
    ],
    timeline: [
      { time: "07:30", event: "Assessment check-in", detail: "Dryness and variable appetite logged" },
      { time: "12:40", event: "Diet adjustment", detail: "Grounding lunch suggested" },
      { time: "18:15", event: "Routine refinement", detail: "Breathwork block added" },
    ],
  },
  "health-reports": {
    title: "Health Reports",
    description: "Monitor biomarker trends with clear comparisons and physician-ready context.",
    focusLabel: "Latest report",
    focusValue: "Inflammation markers improved vs previous cycle",
    metrics: [
      { label: "Reports uploaded", value: "12", helper: "All time" },
      { label: "Reviewed", value: "10", helper: "By care team" },
      { label: "Needs attention", value: "2", helper: "Flagged" },
    ],
    priorities: [
      "Share latest thyroid report with doctor",
      "Add fasting context to blood panel",
      "Schedule re-test reminder",
    ],
    timeline: [
      { time: "Jun 26", event: "Panel uploaded", detail: "Comprehensive blood panel" },
      { time: "Jun 28", event: "Doctor note", detail: "Recommended lipid follow-up" },
      { time: "Jul 03", event: "Trend update", detail: "CRP decreased by 11%" },
    ],
  },
  "medical-reports": {
    title: "Medical Reports",
    description: "Central record of diagnoses, treatment notes, and document history.",
    focusLabel: "Recent summary",
    focusValue: "Follow-up recommended in 4 weeks",
    metrics: [
      { label: "Documents", value: "28", helper: "Stored" },
      { label: "Specialists involved", value: "4", helper: "Active" },
      { label: "Pending uploads", value: "1", helper: "Missing scan" },
    ],
    priorities: [
      "Upload discharge summary",
      "Tag allergy notes for quick access",
      "Confirm latest medication history",
    ],
    timeline: [
      { time: "Jun 17", event: "Specialist report", detail: "Endocrine consultation added" },
      { time: "Jun 24", event: "Revision", detail: "Medication notes updated" },
      { time: "Jul 01", event: "Review complete", detail: "Primary physician signed" },
    ],
  },
  prescriptions: {
    title: "Prescriptions",
    description: "Keep track of active medicines, refill cycles, and adherence reminders.",
    focusLabel: "Next refill",
    focusValue: "Metformin refill due in 3 days",
    metrics: [
      { label: "Active medicines", value: "4", helper: "Current plan" },
      { label: "Adherence", value: "89%", helper: "30-day" },
      { label: "Refills this month", value: "2", helper: "Completed" },
    ],
    priorities: [
      "Set refill reminder for evening dose",
      "Mark missed dose with reason",
      "Review side-effect log with doctor",
    ],
    timeline: [
      { time: "08:00", event: "Morning dose", detail: "Marked as taken" },
      { time: "14:00", event: "Reminder", detail: "Supplement alert triggered" },
      { time: "21:00", event: "Evening dose", detail: "Pending confirmation" },
    ],
  },
  appointments: {
    title: "Appointments",
    description: "Manage upcoming consultations and keep every follow-up organized.",
    focusLabel: "Next appointment",
    focusValue: "Nutrition review tomorrow at 11:15 AM",
    metrics: [
      { label: "Upcoming", value: "4", helper: "Next 14 days" },
      { label: "Completed", value: "16", helper: "Last 90 days" },
      { label: "Rescheduled", value: "1", helper: "This week" },
    ],
    priorities: [
      "Upload latest meal log before review",
      "Prepare blood pressure readings",
      "Confirm video-call connectivity",
    ],
    timeline: [
      { time: "Today 5:30 PM", event: "Doctor follow-up", detail: "Video consultation" },
      { time: "Jul 08", event: "Nutrition review", detail: "In-clinic" },
      { time: "Jul 10", event: "Yoga therapy", detail: "Morning session" },
    ],
  },
  "diet-planner": {
    title: "Diet Planner",
    description: "Build daily meal structure that aligns with your goals and care plan.",
    focusLabel: "Today’s nutrition goal",
    focusValue: "Protein target: 92g",
    metrics: [
      { label: "Meal compliance", value: "84%", helper: "This week" },
      { label: "Planned meals", value: "21", helper: "Weekly" },
      { label: "Healthy swaps", value: "6", helper: "Applied" },
    ],
    priorities: [
      "Prep high-fiber breakfast",
      "Add post-workout snack",
      "Reduce late caffeine intake",
    ],
    timeline: [
      { time: "07:45", event: "Breakfast", detail: "Completed with recommended portion" },
      { time: "13:00", event: "Lunch", detail: "Protein + greens plan ready" },
      { time: "19:30", event: "Dinner", detail: "Light, warm meal suggested" },
    ],
  },
  "yoga-planner": {
    title: "Yoga Planner",
    description: "Follow a condition-aware yoga schedule with guided progression.",
    focusLabel: "Session focus",
    focusValue: "Lower-back mobility and breath synchronization",
    metrics: [
      { label: "Sessions planned", value: "5", helper: "This week" },
      { label: "Sessions done", value: "3", helper: "Completion" },
      { label: "Avg duration", value: "28 min", helper: "Per session" },
    ],
    priorities: [
      "Complete morning mobility flow",
      "Add evening 10-min breathwork",
      "Track stiffness level post-session",
    ],
    timeline: [
      { time: "06:50", event: "Morning flow", detail: "Completed 24 minutes" },
      { time: "16:30", event: "Posture check", detail: "Coach note available" },
      { time: "21:15", event: "Wind-down", detail: "Guided stretches pending" },
    ],
  },
  "lifestyle-planner": {
    title: "Lifestyle Planner",
    description: "Coordinate sleep, stress, movement, and hydration into one daily plan.",
    focusLabel: "Primary objective",
    focusValue: "Stabilize energy through consistent sleep and meal timing",
    metrics: [
      { label: "Habit streak", value: "11 days", helper: "Current" },
      { label: "Daily targets met", value: "6/8", helper: "Average" },
      { label: "Stress score", value: "Low", helper: "Last 3 days" },
    ],
    priorities: [
      "Walk 20 minutes post-lunch",
      "Take hydration breaks every 2 hours",
      "Begin digital sunset by 10 PM",
    ],
    timeline: [
      { time: "08:30", event: "Routine start", detail: "Morning checklist complete" },
      { time: "15:00", event: "Recovery break", detail: "Breath reset suggested" },
      { time: "22:00", event: "Sleep prep", detail: "Low-light mode enabled" },
    ],
  },
  "sleep-tracker": {
    title: "Sleep Tracker",
    description: "Track sleep quality, schedule consistency, and next-day recovery impact.",
    focusLabel: "Last night",
    focusValue: "7h 26m sleep with 88% quality",
    metrics: [
      { label: "Avg sleep", value: "7h 18m", helper: "7-day" },
      { label: "Consistency", value: "86%", helper: "Bedtime variance" },
      { label: "Sleep debt", value: "42 min", helper: "Rolling" },
    ],
    priorities: [
      "Shift bedtime earlier by 20 min",
      "Avoid screens after 10 PM",
      "Keep room temperature stable",
    ],
    timeline: [
      { time: "22:35", event: "In bed", detail: "Started wind-down routine" },
      { time: "03:20", event: "Wake event", detail: "4-minute interruption" },
      { time: "06:01", event: "Wake-up", detail: "Recovery status: good" },
    ],
  },
  "water-intake": {
    title: "Water Intake",
    description: "Track hydration through the day and adjust goals with activity levels.",
    focusLabel: "Today’s goal",
    focusValue: "2.7L target",
    metrics: [
      { label: "Consumed", value: "1.9L", helper: "So far" },
      { label: "Completion", value: "70%", helper: "Day progress" },
      { label: "Reminders sent", value: "4", helper: "Today" },
    ],
    priorities: [
      "Complete 400ml before dinner",
      "Carry refill bottle during commute",
      "Log post-workout hydration",
    ],
    timeline: [
      { time: "08:15", event: "Morning hydration", detail: "350ml logged" },
      { time: "12:10", event: "Midday target", detail: "Reached 1.2L" },
      { time: "17:40", event: "Reminder", detail: "300ml pending" },
    ],
  },
  exercise: {
    title: "Exercise",
    description: "Plan and track movement sessions with intensity and recovery balance.",
    focusLabel: "Today’s workout",
    focusValue: "35 min brisk walk + mobility circuit",
    metrics: [
      { label: "Active minutes", value: "142", helper: "This week" },
      { label: "Goal completion", value: "78%", helper: "Weekly" },
      { label: "Recovery score", value: "Good", helper: "Current" },
    ],
    priorities: [
      "Finish evening mobility set",
      "Log exertion score after workout",
      "Add one strength session this week",
    ],
    timeline: [
      { time: "07:20", event: "Warm-up", detail: "Completed in 8 min" },
      { time: "07:30", event: "Main set", detail: "Walk with interval bursts" },
      { time: "20:00", event: "Cooldown", detail: "Pending" },
    ],
  },
  mood: {
    title: "Mood",
    description: "Journal emotional patterns and correlate them with sleep, food, and activity.",
    focusLabel: "Current trend",
    focusValue: "Mood stability improving over 10 days",
    metrics: [
      { label: "Entries", value: "18", helper: "This month" },
      { label: "Calm days", value: "9", helper: "Last 14 days" },
      { label: "Trigger notes", value: "3", helper: "Active" },
    ],
    priorities: [
      "Log midday energy shift",
      "Add context after high-stress moments",
      "Review patterns before next consult",
    ],
    timeline: [
      { time: "09:00", event: "Morning check-in", detail: "Mood: steady" },
      { time: "14:30", event: "Stress note", detail: "Workload spike captured" },
      { time: "21:10", event: "Reflection", detail: "Day closed with gratitude entry" },
    ],
  },
  weight: {
    title: "Weight",
    description: "Track trend-based weight changes with context from sleep and nutrition.",
    focusLabel: "Weekly direction",
    focusValue: "-0.4 kg from previous week",
    metrics: [
      { label: "Current", value: "71.8 kg", helper: "Morning reading" },
      { label: "4-week trend", value: "-1.6 kg", helper: "Sustainable pace" },
      { label: "Goal progress", value: "64%", helper: "To target" },
    ],
    priorities: [
      "Keep sodium moderate this week",
      "Maintain protein consistency",
      "Record measurement at same time daily",
    ],
    timeline: [
      { time: "Mon", event: "Weight logged", detail: "72.2 kg" },
      { time: "Wed", event: "Weight logged", detail: "72.0 kg" },
      { time: "Fri", event: "Weight logged", detail: "71.8 kg" },
    ],
  },
  "blood-pressure": {
    title: "Blood Pressure",
    description: "Log blood pressure readings and monitor trends for proactive care.",
    focusLabel: "Latest reading",
    focusValue: "122 / 80 mmHg",
    metrics: [
      { label: "Readings", value: "11", helper: "This week" },
      { label: "In range", value: "82%", helper: "7-day" },
      { label: "Alerts", value: "1", helper: "Mildly elevated" },
    ],
    priorities: [
      "Measure before caffeine in morning",
      "Capture evening relaxation reading",
      "Share weekly summary with doctor",
    ],
    timeline: [
      { time: "07:10", event: "Morning reading", detail: "124 / 82" },
      { time: "14:15", event: "Midday reading", detail: "121 / 79" },
      { time: "20:40", event: "Evening reading", detail: "122 / 80" },
    ],
  },
  "blood-sugar": {
    title: "Blood Sugar",
    description: "Track glucose values with meal and activity context for better control.",
    focusLabel: "Fasting value",
    focusValue: "96 mg/dL",
    metrics: [
      { label: "Checks", value: "15", helper: "This week" },
      { label: "In range", value: "87%", helper: "Target band" },
      { label: "Post-meal spikes", value: "2", helper: "Observed" },
    ],
    priorities: [
      "Log post-dinner reading",
      "Tag readings with meal notes",
      "Review spike days with nutritionist",
    ],
    timeline: [
      { time: "06:55", event: "Fasting", detail: "96 mg/dL" },
      { time: "12:50", event: "Post-lunch", detail: "132 mg/dL" },
      { time: "20:55", event: "Post-dinner", detail: "Pending" },
    ],
  },
  notifications: {
    title: "Notifications",
    description: "Manage reminders and care alerts so nothing important is missed.",
    focusLabel: "Unread alerts",
    focusValue: "5 pending",
    metrics: [
      { label: "Today", value: "12", helper: "Notifications received" },
      { label: "Action required", value: "3", helper: "Needs response" },
      { label: "Muted categories", value: "1", helper: "Promotional" },
    ],
    priorities: [
      "Confirm tomorrow appointment reminder",
      "Acknowledge medication alert",
      "Adjust sleep reminder timing",
    ],
    timeline: [
      { time: "09:40", event: "Appointment reminder", detail: "Tomorrow at 11:15 AM" },
      { time: "14:10", event: "Hydration nudge", detail: "300ml pending" },
      { time: "19:20", event: "Medication alert", detail: "Evening dose due" },
    ],
  },
  payments: {
    title: "Payments",
    description: "Track consultations, subscriptions, and invoice history in one place.",
    focusLabel: "Next due",
    focusValue: "Monthly wellness plan renews on Jul 12",
    metrics: [
      { label: "This month", value: "₹6,450", helper: "Total paid" },
      { label: "Pending", value: "₹1,200", helper: "Upcoming invoice" },
      { label: "Successful payments", value: "9", helper: "Last 3 months" },
    ],
    priorities: [
      "Download June invoice",
      "Verify auto-pay method",
      "Review consultation package usage",
    ],
    timeline: [
      { time: "Jun 11", event: "Subscription paid", detail: "UPI AutoPay" },
      { time: "Jun 24", event: "Consultation billed", detail: "Card payment complete" },
      { time: "Jul 12", event: "Renewal", detail: "Scheduled" },
    ],
  },
  profile: {
    title: "Profile",
    description: "Maintain personal details, emergency contacts, and health context.",
    focusLabel: "Profile completion",
    focusValue: "92% complete",
    metrics: [
      { label: "Personal details", value: "Complete", helper: "Verified" },
      { label: "Emergency contacts", value: "2", helper: "Added" },
      { label: "Health preferences", value: "7", helper: "Configured" },
    ],
    priorities: [
      "Add secondary emergency contact",
      "Update current activity level",
      "Confirm preferred consultation language",
    ],
    timeline: [
      { time: "Jun 18", event: "Primary profile updated", detail: "Address refreshed" },
      { time: "Jun 27", event: "Allergy data added", detail: "Peanut allergy tagged" },
      { time: "Jul 02", event: "Emergency contact edited", detail: "Phone number updated" },
    ],
  },
  settings: {
    title: "Settings",
    description: "Control security, privacy, communication, and personalization preferences.",
    focusLabel: "Account security",
    focusValue: "2-step verification enabled",
    metrics: [
      { label: "Security checks", value: "Passed", helper: "Latest run" },
      { label: "Connected devices", value: "3", helper: "Active" },
      { label: "Notification channels", value: "2", helper: "Email + SMS" },
    ],
    priorities: [
      "Rotate password this month",
      "Review device activity",
      "Tune reminder quiet hours",
    ],
    timeline: [
      { time: "Jun 20", event: "Password changed", detail: "Security event recorded" },
      { time: "Jun 25", event: "New device login", detail: "Authorized" },
      { time: "Jul 04", event: "Privacy update", detail: "Data-sharing preferences revised" },
    ],
  },
  calendar: {
    title: "Calendar",
    description: "See appointments, routines, and reminders in one wellness timeline.",
    focusLabel: "Today",
    focusValue: "3 scheduled health activities",
    metrics: [
      { label: "Events this week", value: "14", helper: "All categories" },
      { label: "Appointments", value: "4", helper: "Consultations" },
      { label: "Routine blocks", value: "10", helper: "Habit schedule" },
    ],
    priorities: [
      "Block prep time before nutrition consult",
      "Keep evening walk slot fixed",
      "Add blood sugar check reminder",
    ],
    timeline: [
      { time: "07:00", event: "Yoga routine", detail: "25 minutes" },
      { time: "11:15", event: "Nutrition consultation", detail: "Tomorrow" },
      { time: "21:30", event: "Sleep wind-down", detail: "Daily recurring" },
    ],
  },
};