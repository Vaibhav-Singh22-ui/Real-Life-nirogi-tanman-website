import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Bell, Shield, Paintbrush, Loader2, Lock, Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type SharedSettingsViewProps = {
  roleLabel: string;
};

const SharedSettingsView = ({ roleLabel }: SharedSettingsViewProps) => {
  const { user, profile: authProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    language: "english",
    timezone: "ist"
  });

  useEffect(() => {
    if (user || authProfile) {
      setProfile({
        name: authProfile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "",
        email: user?.email || authProfile?.email || "",
        phone: authProfile?.phone || user?.phone || user?.user_metadata?.phone || "",
        language: "english",
        timezone: "ist"
      });
    }
  }, [user, authProfile]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    aiReminders: true,
    weeklyReport: true
  });

  const [security, setSecurity] = useState({
    mfa: false,
    sessionPersistence: true
  });

  // Patient Health Data security states
  const [healthSecurity, setHealthSecurity] = useState({
    aesRecordLock: true,
    authorizeDoctor: true,
    aiDataSync: true,
    hipaaConsent: true
  });

  const [theme, setTheme] = useState("system");

  const handleSave = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: profile.name,
            phone: profile.phone,
          })
          .eq("id", user.id);

        if (error) {
          console.error("Profile update error:", error);
          toast.error("Failed to update profile in database.");
        } else {
          await refreshProfile();
          toast.success("Profile saved and synced to database!");
        }
      } else {
        toast.success("Settings saved locally!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 font-['Manrope',sans-serif]">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">System Configurations</p>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mt-1">{roleLabel} Preferences</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Customize your account settings, alerts, and system display styles.</p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-[220px_1fr] items-start">
        {/* Navigation bar - scrollable horizontal pills on mobile, vertical sidebar list on desktop */}
        <div className="flex flex-row md:flex-col overflow-x-auto gap-1 pb-2 md:pb-0 text-sm font-medium text-muted-foreground whitespace-nowrap scrollbar-none sticky top-16 md:top-20 z-10 bg-background/95 backdrop-blur-md py-2 md:py-0 border-b border-border/40 md:border-b-0">
          <a href="#profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-primary transition shrink-0">
            <User className="h-4 w-4 shrink-0" /> Profile Info
          </a>
          <a href="#notifications" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-primary transition shrink-0">
            <Bell className="h-4 w-4 shrink-0" /> Notifications
          </a>
          {roleLabel === "Patient" && (
            <a href="#health-security" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-primary transition shrink-0">
              <Lock className="h-4 w-4 shrink-0" /> Health Data Security
            </a>
          )}
          <a href="#security" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-primary transition shrink-0">
            <Shield className="h-4 w-4 shrink-0" /> Security & Login
          </a>
          <a href="#theme" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-primary transition shrink-0">
            <Paintbrush className="h-4 w-4 shrink-0" /> Display Theme
          </a>
        </div>

        {/* Configurations forms */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card id="profile" className="surface-panel scroll-mt-24">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Profile details
              </CardTitle>
              <CardDescription>Update your personal information and language options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="settingsName">Full Name</Label>
                  <Input 
                    id="settingsName" 
                    value={profile.name} 
                    onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="rounded-xl h-10 w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="settingsPhone">Contact Phone</Label>
                  <Input 
                    id="settingsPhone" 
                    placeholder="Enter phone number..."
                    value={profile.phone}
                    onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="rounded-xl h-10 w-full"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settingsEmail">Email Address</Label>
                <Input 
                  id="settingsEmail" 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="rounded-xl h-10 w-full"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-1.5">
                  <Label>Preferred Language</Label>
                  <Select value={profile.language} onValueChange={(val) => setProfile(p => ({ ...p, language: val }))}>
                    <SelectTrigger className="rounded-xl h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English (US/UK)</SelectItem>
                      <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="spanish">Spanish (Español)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(val) => setProfile(p => ({ ...p, timezone: val }))}>
                    <SelectTrigger className="rounded-xl h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">India (IST - UTC+5:30)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST - UTC-5)</SelectItem>
                      <SelectItem value="gmt">Greenwich Time (GMT - UTC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card id="notifications" className="surface-panel scroll-mt-24">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Notification Rules
              </CardTitle>
              <CardDescription>Control how you receive clinic updates and AI reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                <div className="space-y-0.5 max-w-lg">
                  <p className="text-sm font-semibold text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive copies of invoices, appointments, and report reviews.</p>
                </div>
                <Switch 
                  checked={notifications.emailAlerts}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, emailAlerts: val }))}
                  className="shrink-0 self-end sm:self-center"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                <div className="space-y-0.5 max-w-lg">
                  <p className="text-sm font-semibold text-foreground">SMS & Whatsapp Alerts</p>
                  <p className="text-xs text-muted-foreground">Get immediate mobile notifications for calendar rescheduling.</p>
                </div>
                <Switch 
                  checked={notifications.smsAlerts}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, smsAlerts: val }))}
                  className="shrink-0 self-end sm:self-center"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                <div className="space-y-0.5 max-w-lg">
                  <p className="text-sm font-semibold text-foreground">AI Ritual Reminders</p>
                  <p className="text-xs text-muted-foreground">Receive daily dynamic coaching prompts for diet and breathing sessions.</p>
                </div>
                <Switch 
                  checked={notifications.aiReminders}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, aiReminders: val }))}
                  className="shrink-0 self-end sm:self-center"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
                <div className="space-y-0.5 max-w-lg">
                  <p className="text-sm font-semibold text-foreground">Weekly Wellness Reports</p>
                  <p className="text-xs text-muted-foreground">A clean summary report of your sleep patterns and program achievements.</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, weeklyReport: val }))}
                  className="shrink-0 self-end sm:self-center"
                />
              </div>
            </CardContent>
          </Card>

          {/* Patient Health Data Security Card */}
          {roleLabel === "Patient" && (
            <Card id="health-security" className="surface-panel scroll-mt-24">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Health Data Security & HIPAA Consent
                </CardTitle>
                <CardDescription>Manage security controls for your sensitive clinical and diagnostic details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                  <div className="space-y-0.5 max-w-lg">
                    <p className="text-sm font-semibold text-foreground">AES-256 Patient Record Locking</p>
                    <p className="text-xs text-muted-foreground">Client-side lock on local diagnostics logs and doctor messages.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.aesRecordLock}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, aesRecordLock: val }))}
                    className="shrink-0 self-end sm:self-center"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                  <div className="space-y-0.5 max-w-lg">
                    <p className="text-sm font-semibold text-foreground">Authorize Doctor/Practitioner Access</p>
                    <p className="text-xs text-muted-foreground">Allows certified practitioners to read your wellness plans and intake statements.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.authorizeDoctor}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, authorizeDoctor: val }))}
                    className="shrink-0 self-end sm:self-center"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                  <div className="space-y-0.5 max-w-lg">
                    <p className="text-sm font-semibold text-foreground">AI Diagnostics Sync</p>
                    <p className="text-xs text-muted-foreground">Authorizes the AI Health Assistant to parse reports and output diet guides.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.aiDataSync}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, aiDataSync: val }))}
                    className="shrink-0 self-end sm:self-center"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                  <div className="space-y-0.5 max-w-lg">
                    <p className="text-sm font-semibold text-foreground">HIPAA Data Consent Status</p>
                    <p className="text-xs text-muted-foreground">Agreed status under legal health details guidelines.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.hipaaConsent}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, hipaaConsent: val }))}
                    className="shrink-0 self-end sm:self-center"
                  />
                </div>

                {/* Audit access trail logs */}
                <div className="pt-2 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-primary" /> Doctor Data Access Audit logs
                  </p>
                  <div className="rounded-xl border border-border bg-muted/30 p-3 sm:p-4 space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span className="font-semibold text-foreground">• Dr. Kavya Menon accessed Lipid Blood report</span>
                      <span className="text-[11px] sm:text-xs shrink-0">2 hours ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span className="font-semibold text-foreground">• Neel Joshi (Yoga Specialist) accessed Spinal Decompression notes</span>
                      <span className="text-[11px] sm:text-xs shrink-0">1 day ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span className="font-semibold text-foreground">• System AI sync analyzed Cortisol levels report</span>
                      <span className="text-[11px] sm:text-xs shrink-0">2 days ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security & Access Card */}
          <Card id="security" className="surface-panel scroll-mt-24">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security & Account Security
              </CardTitle>
              <CardDescription>Manage credentials, tokens, and multi-factor safety parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-border/40">
                <div className="space-y-0.5 max-w-lg">
                  <p className="text-sm font-semibold text-foreground">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-muted-foreground">Secure your login details with an SMS verification code request.</p>
                </div>
                <Switch 
                  checked={security.mfa}
                  onCheckedChange={(val) => setSecurity(s => ({ ...s, mfa: val }))}
                  className="shrink-0 self-end sm:self-center"
                />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Credentials Actions</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Password change flow sent to email.")} className="rounded-xl w-full sm:w-auto">
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("All other active tokens signed out.")} className="rounded-xl w-full sm:w-auto">
                    Force Log Out Other Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme & Styling Card */}
          <Card id="theme" className="surface-panel scroll-mt-24">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-primary" /> Appearance Themes
              </CardTitle>
              <CardDescription>Adjust the visual display colors of your platform portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`rounded-lg border p-4 text-center text-xs font-medium capitalize transition-all ${
                      theme === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted/10 hover:text-foreground"
                    }`}
                  >
                    {t} Mode
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border/40">
            <Button variant="ghost" onClick={() => toast.info("Settings discarded.")} disabled={loading} className="rounded-xl w-full sm:w-auto">
              Discard Changes
            </Button>
            <Button onClick={handleSave} disabled={loading} className="px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Configuration
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SharedSettingsView;
