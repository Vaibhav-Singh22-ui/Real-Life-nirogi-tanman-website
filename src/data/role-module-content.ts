type ModuleContent = {
  metrics: Array<{ title: string; value: string; change: string; trend: "up" | "down" | "neutral" }>;
  tableColumns: string[];
  tableRows: string[][];
};

const defaultContent: ModuleContent = {
  metrics: [
    { title: "Active Items", value: "48", change: "+5 this week", trend: "up" },
    { title: "Completion", value: "91%", change: "On target", trend: "neutral" },
    { title: "Escalations", value: "3", change: "-2 vs last week", trend: "up" },
    { title: "Pending Reviews", value: "11", change: "Stable", trend: "neutral" },
  ],
  tableColumns: ["ID", "Name", "Owner", "Status"],
  tableRows: [
    ["NT-301", "Case Follow-up", "Dr. Menon", "In progress"],
    ["NT-302", "Diet Revision", "Anjali Rao", "Pending"],
    ["NT-303", "Session Summary", "Arjun Dev", "Completed"],
    ["NT-304", "Plan Review", "Care Team", "Scheduled"],
  ],
};

export const moduleContentByPath: Record<string, ModuleContent> = {
  "/patient/health-reports": {
    metrics: [
      { title: "Tracked Biomarkers", value: "26", change: "+4 this month", trend: "up" },
      { title: "Trend Stability", value: "88%", change: "Improved", trend: "up" },
      { title: "Abnormal Alerts", value: "2", change: "-1", trend: "up" },
      { title: "Doctor Reviews", value: "7", change: "This week", trend: "neutral" },
    ],
    tableColumns: ["Report", "Date", "Clinician", "Status"],
    tableRows: [
      ["Comprehensive Blood Panel", "Jul 03", "Dr. Kavya Menon", "Reviewed"],
      ["Inflammation Marker Set", "Jun 26", "Dr. Vikram Shah", "Flagged"],
      ["Liver Function Trend", "Jun 20", "Dr. Rhea Singh", "Reviewed"],
      ["Thyroid Follow-up", "Jun 12", "Dr. Kavya Menon", "Pending review"],
    ],
  },
  "/patient/appointments": {
    metrics: [
      { title: "Upcoming", value: "4", change: "Next 14 days", trend: "neutral" },
      { title: "Completion Rate", value: "96%", change: "Last 30 days", trend: "up" },
      { title: "Rescheduled", value: "1", change: "This week", trend: "neutral" },
      { title: "Wait Time", value: "11 min", change: "-3 min", trend: "up" },
    ],
    tableColumns: ["Appointment", "Practitioner", "Time", "Mode"],
    tableRows: [
      ["Follow-up Consultation", "Dr. Kavya Menon", "Today, 5:30 PM", "Video"],
      ["Nutrition Review", "Anjali Rao", "Jul 08, 11:15 AM", "In Clinic"],
      ["Yoga Therapy Session", "Arjun Dev", "Jul 10, 7:00 AM", "Session"],
      ["Preventive Review", "Dr. Rhea Singh", "Jul 14, 9:30 AM", "Video"],
    ],
  },
  "/doctor/dashboard": {
    metrics: [
      { title: "Patients Today", value: "18", change: "+3 vs yesterday", trend: "up" },
      { title: "Avg Consultation", value: "23 min", change: "On target", trend: "neutral" },
      { title: "Pending Notes", value: "5", change: "-2", trend: "up" },
      { title: "Follow-ups", value: "12", change: "Scheduled", trend: "neutral" },
    ],
    tableColumns: ["Patient", "Concern", "Slot", "Status"],
    tableRows: [
      ["Aisha Mehta", "Metabolic Review", "09:30 AM", "Checked in"],
      ["Rohan B", "Sleep Recovery", "10:00 AM", "Waiting"],
      ["Karan S", "BP Monitoring", "10:30 AM", "In consultation"],
      ["Meera V", "Medication Follow-up", "11:00 AM", "Scheduled"],
    ],
  },

  "/yoga/dashboard": {
    metrics: [
      { title: "Sessions Today", value: "9", change: "+2 vs avg", trend: "up" },
      { title: "Attendance", value: "92%", change: "+4%", trend: "up" },
      { title: "Program Blocks", value: "16", change: "Active", trend: "neutral" },
      { title: "Progress Checks", value: "11", change: "Due this week", trend: "neutral" },
    ],
    tableColumns: ["Participant", "Routine", "Session Time", "Status"],
    tableRows: [
      ["Niharika S", "Spine Mobility", "07:00 AM", "Attended"],
      ["Vikram D", "Breathwork Level 2", "08:00 AM", "Checked in"],
      ["Sonal M", "Lower Back Therapy", "10:30 AM", "Scheduled"],
      ["Ritu G", "Sleep Reset Flow", "06:30 PM", "Scheduled"],
    ],
  },
  "/admin/dashboard": {
    metrics: [
      { title: "Daily Active Users", value: "1,248", change: "+8.4%", trend: "up" },
      { title: "Revenue Today", value: "₹3.8L", change: "+11%", trend: "up" },
      { title: "Open Tickets", value: "14", change: "-3", trend: "up" },
      { title: "SLA Compliance", value: "97%", change: "Stable", trend: "neutral" },
    ],
    tableColumns: ["Area", "Owner", "Health", "Last Updated"],
    tableRows: [
      ["Consultation Ops", "Care Operations", "Good", "10 min ago"],
      ["Billing Pipeline", "Finance", "Needs attention", "22 min ago"],
      ["Support Queue", "Support Team", "Good", "12 min ago"],
      ["CMS Publishing", "Content Team", "Good", "35 min ago"],
    ],
  },
};

export const getModuleContent = (path: string): ModuleContent => moduleContentByPath[path] ?? defaultContent;