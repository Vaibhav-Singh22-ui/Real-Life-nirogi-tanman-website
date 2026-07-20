import { useState } from "react";
import { Phone, Mail, MapPin, Building2, ShieldAlert, MessageSquare, Check, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState<"general" | "corporate" | "support">("general");
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; desc: string } | null>(null);

  // Form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Corporate specific inputs
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("10-50 employees");
  const [corporateObjectives, setCorporateObjectives] = useState<string[]>([]);

  // Support specific inputs
  const [supportCategory, setSupportCategory] = useState("billing");
  const [supportPriority, setSupportPriority] = useState("medium");
  const [ticketSubject, setTicketSubject] = useState("");

  const handleObjectivesToggle = (obj: string) => {
    setCorporateObjectives(prev =>
      prev.includes(obj) ? prev.filter(item => item !== obj) : [...prev, obj]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    setSubmitting(true);
    setSuccessInfo(null);

    setTimeout(() => {
      setSubmitting(false);

      if (activeTab === "general") {
        setSuccessInfo({
          title: "Message Sent!",
          desc: "Thank you for contacting care coordination. We will get back to your inbox within 2 hours."
        });
        toast.success("Enquiry received successfully!");
      } else if (activeTab === "corporate") {
        setSuccessInfo({
          title: "Corporate Query Registered",
          desc: `Thank you. A corporate wellness consultant will draft a custom wellness curriculum proposal for ${companyName || "your company"} and email you within 24 hours.`
        });
        toast.success("Corporate wellness query logged!");
      } else {
        const ticketNum = Math.floor(1000 + Math.random() * 9000);
        setSuccessInfo({
          title: `Support Ticket Created: #NT-TKT-${ticketNum}`,
          desc: "Your support request has been logged. Under clinical guidelines, the coordinator desk will respond in the live chat within 12 minutes."
        });
        toast.success(`Ticket NT-TKT-${ticketNum} registered successfully!`);

        // Save support active ticket state in localStorage to activate chat notifications
        localStorage.setItem("nirogi_active_ticket", JSON.stringify({
          id: `NT-TKT-${ticketNum}`,
          subject: ticketSubject || "General Support Enquiry",
          category: supportCategory,
          priority: supportPriority
        }));
      }

      // Reset text inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCompanyName("");
      setTicketSubject("");
    }, 1500);
  };

  return (
    <section className="section-band bg-[#F8FAF7] min-h-[85vh] font-['Manrope',sans-serif]">
      <div className="container space-y-8 max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
          <p className="uppercase-label text-primary font-bold tracking-wider">Inquiry Desk</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Contact Care Coordination
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm">
            Reach out for general enquiries, register corporate wellness packages, or log patient support tickets.
          </p>
        </div>

        {/* Dynamic Category Switcher */}
        <div className="flex justify-center p-1.5 bg-muted rounded-2xl max-w-lg mx-auto border border-border">
          <button
            onClick={() => { setActiveTab("general"); setSuccessInfo(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "general" ? 'bg-background text-primary shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <MessageSquare className="h-4 w-4" />
            General Inquiry
          </button>
          <button
            onClick={() => { setActiveTab("corporate"); setSuccessInfo(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "corporate" ? 'bg-background text-primary shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Building2 className="h-4 w-4" />
            Corporate Wellness
          </button>
          <button
            onClick={() => { setActiveTab("support"); setSuccessInfo(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "support" ? 'bg-background text-primary shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ShieldAlert className="h-4 w-4" />
            Support Ticket
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <Card className="surface-panel rounded-2xl shadow-md border-border overflow-hidden bg-card">
            <CardHeader className="bg-primary/5 px-6 py-4 border-b border-border">
              <CardTitle className="text-lg">
                {activeTab === "general" && "Send a Message"}
                {activeTab === "corporate" && "Corporate Enquiry Form"}
                {activeTab === "support" && "Submit Patient Support Ticket"}
              </CardTitle>
              <CardDescription>
                {activeTab === "general" && "Submit a general question or feedback to our coordinators."}
                {activeTab === "corporate" && "Inquire about custom workshops, screening plans, and corporate portals."}
                {activeTab === "support" && "Open a tracked support ticket under secure cloud data rules."}
              </CardDescription>
            </CardHeader>

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
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {activeTab === "corporate" && (
                    <div className="space-y-4 pt-2 border-t border-border/40 animate-fadeIn">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="companyName" className="font-bold text-xs">Company Name</Label>
                          <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme Corp" className="rounded-xl h-11" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="teamSize" className="font-bold text-xs">Team Size</Label>
                          <Select value={teamSize} onValueChange={setTeamSize}>
                            <SelectTrigger id="teamSize" className="h-11 rounded-xl">
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10-50 employees">10 - 50 employees</SelectItem>
                              <SelectItem value="50-200 employees">50 - 200 employees</SelectItem>
                              <SelectItem value="200-500 employees">200 - 500 employees</SelectItem>
                              <SelectItem value="500+ employees">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label className="font-bold text-xs">Corporate Objectives (Check all that apply)</Label>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {[
                            "Desk Yoga Workshops",
                            "On-site Doctor Screenings",
                            "Stress Resilience Breathwork",
                            "Custom Employee Dashboards"
                          ].map((obj) => (
                            <button
                              key={obj}
                              type="button"
                              onClick={() => handleObjectivesToggle(obj)}
                              className={`h-10 px-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${corporateObjectives.includes(obj) ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-muted/30'}`}
                            >
                              {corporateObjectives.includes(obj) && <Check className="h-3.5 w-3.5" />}
                              {obj}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "support" && (
                    <div className="space-y-4 pt-2 border-t border-border/40 animate-fadeIn">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="supCat" className="font-bold text-xs">Ticket Category</Label>
                          <Select value={supportCategory} onValueChange={setSupportCategory}>
                            <SelectTrigger id="supCat" className="h-11 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="billing">Billing & Payments</SelectItem>
                              <SelectItem value="technical">Technical Bug</SelectItem>
                              <SelectItem value="clinical">Practitioner Concern</SelectItem>
                              <SelectItem value="returns">Product Returns</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="supPrio" className="font-bold text-xs">Priority</Label>
                          <Select value={supportPriority} onValueChange={setSupportPriority}>
                            <SelectTrigger id="supPrio" className="h-11 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="high">High Priority (Urgent)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-1.5">
                        <Label htmlFor="ticketSub" className="font-bold text-xs">Issue Subject</Label>
                        <Input id="ticketSub" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Brief summary of the issue" className="rounded-xl h-11" />
                      </div>
                    </div>
                  )}

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

          <Card className="surface-panel rounded-2xl shadow-md border-border p-6 space-y-6">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-lg">Care Coordination Desk</CardTitle>
              <CardDescription>Direct helpline indicators</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-sm text-muted-foreground font-medium">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-primary" />
                +91 90000 12345
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-primary" />
                support@nirogitanman.com
              </p>
              <p className="flex items-center gap-2.5 text-left leading-normal">
                <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                Sector 15, HSR Layout, Bengaluru, Karnataka, India - 560102
              </p>

              <div className="pt-4 border-t border-border/60 text-xs leading-relaxed space-y-2">
                <span className="font-bold text-foreground block">Response SLA guidelines:</span>
                <p>• General Queries: 2 business hours</p>
                <p>• Corporate Partnerships: 24 business hours</p>
                <p>• Patient Support Tickets: 12 minutes (Live Chat)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;