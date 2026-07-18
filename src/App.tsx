import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/public/HomePage";
import AboutPage from "@/pages/public/AboutPage";
import ServicesPage from "@/pages/public/ServicesPage";
import DoctorsPage from "@/pages/public/DoctorsPage";
import DoctorProfilePage from "@/pages/public/DoctorProfilePage";

import YogaExpertsPage from "@/pages/public/YogaExpertsPage";
import AIHealthAssistantPage from "@/pages/public/AIHealthAssistantPage";
import AIDoshaAssessmentPage from "@/pages/public/AIDoshaAssessmentPage";
import BookConsultationPage from "@/pages/public/BookConsultationPage";
import PricingPage from "@/pages/public/PricingPage";
import BlogPage from "@/pages/public/BlogPage";
import BlogDetailPage from "@/pages/public/BlogDetailPage";
import FAQsPage from "@/pages/public/FAQsPage";
import ContactPage from "@/pages/public/ContactPage";
import PrivacyPolicyPage from "@/pages/public/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/public/TermsConditionsPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import OtpVerificationPage from "@/pages/auth/OtpVerificationPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";
import RoleSelectionPage from "@/pages/auth/RoleSelectionPage";
import PublicLayout from "@/components/layout/PublicLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import RoleLayout from "@/components/layout/RoleLayout";
import PatientDashboardPage from "@/pages/dashboards/PatientDashboardPage";
import PatientDetailPage from "@/pages/patient/PatientDetailPage";
import PatientBookingsPage from "@/pages/patient/PatientBookingsPage";
import ModulePage from "@/components/app/ModulePage";
import StatusPage from "@/components/app/StatusPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorProfilePage />} />

            <Route path="/yoga-experts" element={<YogaExpertsPage />} />
            <Route path="/ai-health-assistant" element={<AIHealthAssistantPage />} />
            <Route path="/ai-dosha-assessment" element={<AIDoshaAssessmentPage />} />
            <Route path="/book-consultation" element={<BookConsultationPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/coming-soon" element={<StatusPage code="Coming Soon" title="This module is launching soon" description="We are preparing this experience and will make it available shortly." />} />
            <Route path="/maintenance" element={<StatusPage code="Maintenance" title="Scheduled maintenance in progress" description="We’re improving platform performance. Please check back shortly." />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/otp-verification" element={<OtpVerificationPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
          </Route>

          <Route path="/patient" element={<RoleLayout role="patient" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboardPage />} />
            <Route path="ai-assistant" element={<PatientDetailPage pageKey="ai-assistant" />} />
            <Route path="ai-dosha-assessment" element={<PatientDetailPage pageKey="ai-dosha-assessment" />} />
            <Route path="health-reports" element={<PatientDetailPage pageKey="health-reports" />} />
            <Route path="medical-reports" element={<PatientDetailPage pageKey="medical-reports" />} />
            <Route path="prescriptions" element={<PatientDetailPage pageKey="prescriptions" />} />
            <Route path="appointments" element={<PatientDetailPage pageKey="appointments" />} />
            <Route path="bookings" element={<PatientBookingsPage />} />
            <Route path="diet-planner" element={<PatientDetailPage pageKey="diet-planner" />} />
            <Route path="yoga-planner" element={<PatientDetailPage pageKey="yoga-planner" />} />
            <Route path="lifestyle-planner" element={<PatientDetailPage pageKey="lifestyle-planner" />} />
            <Route path="sleep-tracker" element={<PatientDetailPage pageKey="sleep-tracker" />} />
            <Route path="water-intake" element={<PatientDetailPage pageKey="water-intake" />} />
            <Route path="exercise" element={<PatientDetailPage pageKey="exercise" />} />
            <Route path="mood" element={<PatientDetailPage pageKey="mood" />} />
            <Route path="weight" element={<PatientDetailPage pageKey="weight" />} />
            <Route path="blood-pressure" element={<PatientDetailPage pageKey="blood-pressure" />} />
            <Route path="blood-sugar" element={<PatientDetailPage pageKey="blood-sugar" />} />
            <Route path="notifications" element={<PatientDetailPage pageKey="notifications" />} />
            <Route path="payments" element={<PatientDetailPage pageKey="payments" />} />
            <Route path="profile" element={<PatientDetailPage pageKey="profile" />} />
            <Route path="settings" element={<PatientDetailPage pageKey="settings" />} />
            <Route path="calendar" element={<PatientDetailPage pageKey="calendar" />} />
          </Route>

          <Route path="/doctor" element={<RoleLayout role="doctor" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ModulePage title="Doctor Dashboard" description="Clinical workflow overview with patient insights and scheduling controls." roleLabel="Doctor" />} />
            <Route path="todays-schedule" element={<ModulePage title="Today's Schedule" description="View and manage today's appointments and priorities." roleLabel="Doctor" />} />
            <Route path="appointments" element={<ModulePage title="Appointments" description="Manage consultation pipeline and patient interactions." roleLabel="Doctor" />} />
            <Route path="patient-queue" element={<ModulePage title="Patient Queue" description="Monitor check-ins and triage queue in real time." roleLabel="Doctor" />} />
            <Route path="patient-details" element={<ModulePage title="Patient Details" description="Patient profile with history, vitals, and longitudinal trends." roleLabel="Doctor" />} />
            <Route path="medical-history" element={<ModulePage title="Medical History" description="Structured historical records for diagnosis continuity." roleLabel="Doctor" />} />
            <Route path="consultation" element={<ModulePage title="Consultation" description="In-session care workspace for findings and recommendations." roleLabel="Doctor" />} />
            <Route path="video-call" element={<ModulePage title="Video Call Screen" description="Remote consultation module with note sync and follow-up actions." roleLabel="Doctor" />} />
            <Route path="prescription-builder" element={<ModulePage title="Prescription Builder" description="Create and share digital prescriptions with safety checks." roleLabel="Doctor" />} />
            <Route path="medical-notes" element={<ModulePage title="Medical Notes" description="Clinician notes with structured templates and timeline context." roleLabel="Doctor" />} />
            <Route path="reports" element={<ModulePage title="Reports" description="Clinical reports and care outcomes summary." roleLabel="Doctor" />} />
            <Route path="availability" element={<ModulePage title="Availability" description="Control consultation slots and clinic hours." roleLabel="Doctor" />} />
            <Route path="revenue" element={<ModulePage title="Revenue" description="Consultation earning overview and payout tracking." roleLabel="Doctor" />} />
            <Route path="analytics" element={<ModulePage title="Analytics" description="Performance insights across patient outcomes and workload." roleLabel="Doctor" />} />
            <Route path="notifications" element={<ModulePage title="Notifications" description="Care alerts, schedule updates, and patient messages." roleLabel="Doctor" />} />
            <Route path="settings" element={<ModulePage title="Settings" description="Doctor profile, preferences, and account security." roleLabel="Doctor" />} />
          </Route>



          <Route path="/yoga" element={<RoleLayout role="yoga" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ModulePage title="Yoga Instructor Dashboard" description="Session planning, patient progress, and attendance overview." roleLabel="Yoga Instructor" />} />
            <Route path="patients" element={<ModulePage title="Patients" description="Patients enrolled in yoga therapy programs." roleLabel="Yoga Instructor" />} />
            <Route path="yoga-routine-builder" element={<ModulePage title="Yoga Routine Builder" description="Create adaptive routines based on diagnosis and flexibility level." roleLabel="Yoga Instructor" />} />
            <Route path="exercise-library" element={<ModulePage title="Exercise Library" description="Curated movement and asana reference library." roleLabel="Yoga Instructor" />} />
            <Route path="meditation-sessions" element={<ModulePage title="Meditation Sessions" description="Guided session schedules and compliance tracking." roleLabel="Yoga Instructor" />} />
            <Route path="attendance" element={<ModulePage title="Attendance" description="Track class attendance and engagement metrics." roleLabel="Yoga Instructor" />} />
            <Route path="progress" element={<ModulePage title="Progress" description="Therapy progression and routine effectiveness insights." roleLabel="Yoga Instructor" />} />
            <Route path="calendar" element={<ModulePage title="Calendar" description="Session and consultation calendar management." roleLabel="Yoga Instructor" />} />
            <Route path="notifications" element={<ModulePage title="Notifications" description="Routine reminders and follow-up alerts." roleLabel="Yoga Instructor" />} />
            <Route path="settings" element={<ModulePage title="Settings" description="Instructor profile and delivery preferences." roleLabel="Yoga Instructor" />} />
          </Route>

          <Route path="/admin" element={<RoleLayout role="admin" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ModulePage title="Admin Dashboard" description="Platform operations command center with governance and growth metrics." roleLabel="Admin" />} />
            <Route path="analytics" element={<ModulePage title="Analytics" description="Cross-role analytics, conversion funnels, and retention insights." roleLabel="Admin" />} />
            <Route path="revenue" element={<ModulePage title="Revenue" description="Billing, subscriptions, and financial performance overview." roleLabel="Admin" />} />
            <Route path="users" element={<ModulePage title="Users" description="Manage patient and practitioner user accounts." roleLabel="Admin" />} />
            <Route path="doctors" element={<ModulePage title="Doctors" description="Doctor onboarding and profile governance." roleLabel="Admin" />} />
            <Route path="nutritionists" element={<ModulePage title="Nutritionists" description="Nutritionist operations and quality controls." roleLabel="Admin" />} />
            <Route path="yoga-instructors" element={<ModulePage title="Yoga Instructors" description="Yoga instructor management and allocations." roleLabel="Admin" />} />
            <Route path="appointments" element={<ModulePage title="Appointments" description="Platform-wide appointment and fulfillment oversight." roleLabel="Admin" />} />
            <Route path="payments" element={<ModulePage title="Payments" description="Transaction records and reconciliation workflows." roleLabel="Admin" />} />
            <Route path="subscriptions" element={<ModulePage title="Subscriptions" description="Membership and renewal operations." roleLabel="Admin" />} />
            <Route path="cms" element={<ModulePage title="CMS" description="Manage dynamic content blocks and messaging." roleLabel="Admin" />} />
            <Route path="blogs" element={<ModulePage title="Blogs" description="Publish and schedule educational content." roleLabel="Admin" />} />
            <Route path="faqs" element={<ModulePage title="FAQs" description="Knowledge base operations and updates." roleLabel="Admin" />} />
            <Route path="testimonials" element={<ModulePage title="Testimonials" description="Review and publish patient testimonials." roleLabel="Admin" />} />
            <Route path="reports" element={<ModulePage title="Reports" description="Generate operational and care quality reports." roleLabel="Admin" />} />
            <Route path="services" element={<ModulePage title="Services" description="Manage service catalog and pricing definitions." roleLabel="Admin" />} />
            <Route path="support-tickets" element={<ModulePage title="Support Tickets" description="Customer support queue and issue resolution." roleLabel="Admin" />} />
            <Route path="roles" element={<ModulePage title="Roles" description="Control access and role assignments." roleLabel="Admin" />} />
            <Route path="permissions" element={<ModulePage title="Permissions" description="Fine-grained authorization management." roleLabel="Admin" />} />
            <Route path="audit-logs" element={<ModulePage title="Audit Logs" description="Operational and security event timeline." roleLabel="Admin" />} />
            <Route path="settings" element={<ModulePage title="Settings" description="Global platform and governance settings." roleLabel="Admin" />} />
          </Route>

          <Route path="*" element={<StatusPage code="404" title="Page not found" description="The page you are trying to access does not exist." />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
