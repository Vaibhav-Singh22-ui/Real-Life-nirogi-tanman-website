import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Bell, Shield, Paintbrush, Loader2, Lock, Eye, FileText } from "lucide-react";

type SharedSettingsViewProps = {
  roleLabel: string;
};

const SharedSettingsView = ({ roleLabel }: SharedSettingsViewProps) => {
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [profile, setProfile] = useState({
    name: roleLabel === "Patient" ? "Vaibhav Singh" : `Dr. Kavya Menon`,
    email: roleLabel === "Patient" ? "vaibhav@nirogi.app" : `kavya.menon@nirogi.app`,
    phone: "+91 98765 43210",
    language: "english",
    timezone: "ist"
  });

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

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully!");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-['Manrope',sans-serif]">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">System Configurations</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">{roleLabel} Preferences</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Customize your account settings, alerts, and system display styles.</p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        {/* Navigation list */}
        <div className="flex flex-col gap-1 text-sm font-medium text-muted-foreground">
          <a href="#profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/10 hover:text-primary transition">
            <User className="h-4 w-4" /> Profile Info
          </a>
          <a href="#notifications" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/10 hover:text-primary transition">
            <Bell className="h-4 w-4" /> Notifications
          </a>
          {roleLabel === "Patient" && (
            <a href="#health-security" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/10 hover:text-primary transition">
              <Lock className="h-4 w-4" /> Health Data Security
            </a>
          )}
          <a href="#security" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/10 hover:text-primary transition">
            <Shield className="h-4 w-4" /> Security & Login
          </a>
          <a href="#theme" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/10 hover:text-primary transition">
            <Paintbrush className="h-4 w-4" /> Display Theme
          </a>
        </div>

        {/* Configurations forms */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card id="profile" className="surface-panel scroll-mt-6">
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
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="settingsPhone">Contact Phone</Label>
                  <Input 
                    id="settingsPhone" 
                    value={profile.phone}
                    onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="rounded-xl h-10"
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
                  className="rounded-xl h-10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-1.5">
                  <Label>Preferred Language</Label>
                  <Select value={profile.language} onValueChange={(val) => setProfile(p => ({ ...p, language: val }))}>
                    <SelectTrigger className="rounded-xl h-10">
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
                    <SelectTrigger className="rounded-xl h-10">
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
          <Card id="notifications" className="surface-panel scroll-mt-6">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Notification Rules
              </CardTitle>
              <CardDescription>Control how you receive clinic updates and AI reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive copies of invoices, appointments, and report reviews.</p>
                </div>
                <Switch 
                  checked={notifications.emailAlerts}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, emailAlerts: val }))}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">SMS & Whatsapp Alerts</p>
                  <p className="text-xs text-muted-foreground">Get immediate mobile notifications for calendar rescheduling.</p>
                </div>
                <Switch 
                  checked={notifications.smsAlerts}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, smsAlerts: val }))}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">AI Ritual Reminders</p>
                  <p className="text-xs text-muted-foreground">Receive daily dynamic coaching prompts for diet and breathing sessions.</p>
                </div>
                <Switch 
                  checked={notifications.aiReminders}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, aiReminders: val }))}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">Weekly Wellness Reports</p>
                  <p className="text-xs text-muted-foreground">A clean summary report of your sleep patterns and program achievements.</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={(val) => setNotifications(n => ({ ...n, weeklyReport: val }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Patient Health Data Security Card */}
          {roleLabel === "Patient" && (
            <Card id="health-security" className="surface-panel scroll-mt-6">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Health Data Security & HIPAA Consent
                </CardTitle>
                <CardDescription>Manage security controls for your sensitive clinical and diagnostic details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">AES-256 Patient Record Locking</p>
                    <p className="text-xs text-muted-foreground">Client-side lock on local diagnostics logs and doctor messages.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.aesRecordLock}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, aesRecordLock: val }))}
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">Authorize Doctor/Practitioner Access</p>
                    <p className="text-xs text-muted-foreground">Allows certified practitioners to read your wellness plans and intake statements.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.authorizeDoctor}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, authorizeDoctor: val }))}
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">AI Diagnostics Sync</p>
                    <p className="text-xs text-muted-foreground">Authorizes the AI Health Assistant to parse reports and output diet guides.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.aiDataSync}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, aiDataSync: val }))}
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">HIPAA Data Consent Status</p>
                    <p className="text-xs text-muted-foreground">Agreed status under legal health details guidelines.</p>
                  </div>
                  <Switch 
                    checked={healthSecurity.hipaaConsent}
                    onCheckedChange={(val) => setHealthSecurity(s => ({ ...s, hipaaConsent: val }))}
                  />
                </div>

                {/* Audit access trail logs */}
                <div className="pt-2 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-primary" /> Doctor Data Access Audit logs
                  </p>
                  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">• Dr. Kavya Menon accessed Lipid Blood report</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">• Neel Joshi (Yoga Specialist) accessed Spinal Decompression notes</span>
                      <span>1 day ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">• System AI sync analyzed Cortisol levels report</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security & Access Card */}
          <Card id="security" className="surface-panel scroll-mt-6">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security & Account Security
              </CardTitle>
              <CardDescription>Manage credentials, tokens, and multi-factor safety parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs md:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-muted-foreground">Secure your login details with an SMS verification code request.</p>
                </div>
                <Switch 
                  checked={security.mfa}
                  onCheckedChange={(val) => setSecurity(s => ({ ...s, mfa: val }))}
                />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Credentials Actions</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Password change flow sent to email.")} className="rounded-xl">
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("All other active tokens signed out.")} className="rounded-xl">
                    Force Log Out Other Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme & Styling Card */}
          <Card id="theme" className="surface-panel scroll-mt-6">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-primary" /> Appearance Themes
              </CardTitle>
              <CardDescription>Adjust the visual display colors of your platform portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid gap-3 sm:grid-cols-3">
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
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => toast.info("Settings discarded.")} disabled={loading} className="rounded-xl">
              Discard Changes
            </Button>
            <Button onClick={handleSave} disabled={loading} className="px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95">
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
