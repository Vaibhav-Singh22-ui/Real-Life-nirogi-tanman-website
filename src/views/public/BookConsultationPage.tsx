import { useMemo, useState } from "react";
import Link from "next/link";
import { format, isBefore, startOfDay } from "date-fns";
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  Video,
  User,
  Mail,
  Plus,
  Star,
  Award,
  HeartPulse,
  LockKeyhole,
  Check,
  CheckCheck,
  Loader2,
  Activity,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors, yogaExperts } from "@/data/health-data";
import { cn, getImgSrc } from "@/lib/utils";
import { toast } from "sonner";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

const BookConsultationPage = () => {
  const [step, setStep] = useState(1);
  const [selectedPractitionerId, setSelectedPractitionerId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [consultationMode, setConsultationMode] = useState<string>("Video Call");
  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [hipaaConsent, setHipaaConsent] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = startOfDay(new Date());

  const practitioners = useMemo(() => {
    return [
      ...doctors.map((d) => ({ id: d.id, name: d.name, title: d.specialty, rating: d.rating, image: d.image, fee: d.fee, role: "Doctor" })),
      ...yogaExperts.map((y) => ({ id: y.id, name: y.name, title: `Yoga Therapist (${y.specialty})`, rating: y.rating, image: y.image, fee: "₹1,000", role: "Yoga Expert" })),
    ];
  }, []);

  const selectedPractitioner = useMemo(() => {
    return practitioners.find((p) => p.id === selectedPractitionerId) || null;
  }, [selectedPractitionerId, practitioners]);

  const formattedDate = selectedDate ? format(selectedDate, "PPP") : "Select date";

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedPractitionerId || !selectedDate || !selectedTimeSlot) {
        toast.error("Please complete practitioner, date, and time slot selections.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!patientName.trim() || !patientEmail.trim()) {
        toast.error("Name and Email are required.");
        return;
      }
      if (!hipaaConsent) {
        toast.error("You must agree to the secure HIPAA consent terms to proceed.");
        return;
      }
      setStep(3);
    }
  };

  const handleBookingSubmit = () => {
    if (!cardNumber.trim() || cardExpiry.length < 5 || cardCvv.length < 3) {
      toast.error("Please fill in valid secure payment details.");
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      toast.success("Consultation booked successfully!");

      const bookingInfo = {
        practitionerName: selectedPractitioner?.name,
        practitionerTitle: selectedPractitioner?.title,
        date: formattedDate,
        timeSlot: selectedTimeSlot,
        mode: consultationMode,
        patientName,
      };

      // Save to localStorage for active reminders on Home Page and Dashboard
      localStorage.setItem("nirogi_active_booking", JSON.stringify(bookingInfo));
    }, 2000);
  };

  const resetBookingFlow = () => {
    setSelectedPractitionerId("");
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setConsultationMode("Video Call");
    setPatientName("");
    setPatientEmail("");
    setBookingNotes("");
    setSelectedGoals([]);
    setHipaaConsent(false);
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setStep(1);
    localStorage.removeItem("nirogi_active_booking");
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <section className="section-band bg-background min-h-[80vh] font-['Manrope',sans-serif]">
      <div className="container space-y-8 max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
          <p className="uppercase-label text-primary font-bold tracking-wider">Appointment Center</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Schedule a Consultation
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm">
            Book private sessions with vetted specialists and receive personalized diet & movement routines.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <Card className="surface-panel rounded-2xl shadow-md border-border overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-border flex justify-between items-center">
              <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
                Booking Stage
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                Step {step} of 4
              </span>
            </div>

            <CardContent className="p-6 md:p-8 space-y-6">
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid gap-2">
                    <Label htmlFor="practitioner" className="font-bold text-xs">1. Select Practitioner</Label>
                    <Select value={selectedPractitionerId} onValueChange={setSelectedPractitionerId}>
                      <SelectTrigger id="practitioner" className="h-11 rounded-xl">
                        <SelectValue placeholder="Choose a Doctor or Yoga Expert" />
                      </SelectTrigger>
                      <SelectContent>
                        {practitioners.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.role}: {p.name} — {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPractitioner && (
                    <div className="p-4 bg-muted/40 rounded-xl border border-border flex items-center gap-3.5 animate-fadeIn">
                      <img src={getImgSrc(selectedPractitioner.image)} alt={selectedPractitioner.name} className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground leading-tight">{selectedPractitioner.name}</h4>
                        <p className="text-[11px] text-muted-foreground">{selectedPractitioner.title}</p>
                        <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {selectedPractitioner.rating} Rating · Fee: {selectedPractitioner.fee}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label className="font-bold text-xs">2. Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("justify-start text-left font-normal h-11 rounded-xl", !selectedDate && "text-muted-foreground")}>
                            <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                            {formattedDate}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => isBefore(startOfDay(date), today)}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="timeSlot" className="font-bold text-xs">3. Time Slot</Label>
                      <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                        <SelectTrigger id="timeSlot" className="h-11 rounded-xl">
                          <SelectValue placeholder="Choose a slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="font-bold text-xs">4. Delivery Mode</Label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setConsultationMode("Video Call")}
                        className={`flex-1 h-11 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${consultationMode === "Video Call" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-muted-foreground"}`}
                      >
                        <Video className="h-4 w-4" />
                        Secure Video Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsultationMode("In Person")}
                        className={`flex-1 h-11 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${consultationMode === "In Person" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-muted-foreground"}`}
                      >
                        <Stethoscope className="h-4 w-4" />
                        In-Clinic Visit
                      </button>
                    </div>
                  </div>

                  <Button className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground" onClick={handleNextStep}>
                    Proceed to Intake Form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="patientName" className="font-bold text-xs">Patient Full Name</Label>
                      <Input
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter full name"
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="patientEmail" className="font-bold text-xs">Email Address</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="rounded-xl h-11"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="font-bold text-xs">Health Goals (Check all that apply)</Label>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {["Stress Control", "Blood Sugar", "Pain Relief", "Postural Care", "Digestive Agni", "Circadian Sleep"].map(goal => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleGoal(goal)}
                          className={`h-10 px-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedGoals.includes(goal) ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-muted/30'}`}
                        >
                          {selectedGoals.includes(goal) && <Check className="h-3.5 w-3.5" />}
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bookingNotes" className="font-bold text-xs">Brief Symptoms / Clinical Notes</Label>
                    <textarea
                      id="bookingNotes"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="Briefly describe your symptoms or wellness objectives..."
                      className="w-full p-3 border border-border rounded-xl bg-background text-sm focus:ring-2 focus:ring-primary h-24 resize-none focus-visible:outline-none"
                    />
                  </div>

                  <div className="space-y-3 p-4 bg-muted/40 rounded-xl border border-border">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">HIPAA Privacy & Consent Agreement</span>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hipaaConsent}
                        onChange={(e) => setHipaaConsent(e.target.checked)}
                        className="h-4.5 w-4.5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-[11px] text-muted-foreground leading-normal font-medium">
                        I consent to share my health metrics and symptom statements with {selectedPractitioner?.name} for private diagnosis under regulatory HIPAA guidelines.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-bold" onClick={handleNextStep} disabled={!hipaaConsent}>
                      Proceed to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">Secure Booking Invoice Summary</span>
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <span>{selectedPractitioner?.name} ({selectedPractitioner?.title})</span>
                      <span>{selectedPractitioner?.fee}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Date & Time: {formattedDate} at {selectedTimeSlot}</span>
                      <span>GST Included</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNum" className="font-bold text-xs flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-primary" /> Secure Credit Card
                      </Label>
                      <Input
                        id="cardNum"
                        placeholder="Card Number (4111 2222 3333 4444)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="cardExp" className="font-bold text-xs">Expiration Date</Label>
                        <Input
                          id="cardExp"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cardCVV" className="font-bold text-xs">Secure CVV</Label>
                        <Input
                          id="cardCVV"
                          placeholder="CVV"
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="rounded-xl h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/60">
                    <span className="flex items-center gap-1.5">
                      <LockKeyhole className="h-4 w-4 text-emerald-600" />
                      256-Bit SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-600" />
                      PCI-DSS Compliant Gateway
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-extrabold" onClick={handleBookingSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Payment & Book"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center py-6 animate-fadeIn font-sans">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCheck className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Consultation Booked Successfully!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Your appointment with {selectedPractitioner?.name} is confirmed. A receipt and secure video room access link have been synced to your dashboard and inbox.
                    </p>
                  </div>

                  <div className="max-w-sm mx-auto bg-muted/40 p-5 rounded-xl border border-border text-xs text-left space-y-2.5">
                    <p><span className="text-muted-foreground font-semibold">Practitioner:</span> {selectedPractitioner?.name}</p>
                    <p><span className="text-muted-foreground font-semibold">Date & Time:</span> {formattedDate} at {selectedTimeSlot}</p>
                    <p><span className="text-muted-foreground font-semibold">Delivery Mode:</span> {consultationMode}</p>
                    <p><span className="text-muted-foreground font-semibold">Patient:</span> {patientName}</p>
                    <p className="text-[10px] text-primary font-bold">Secure HD room link has been synced to your dashboard.</p>
                  </div>

                  <div className="flex gap-3 max-w-sm mx-auto pt-2">
                    <Button variant="outline" className="flex-1 h-11 rounded-xl text-xs font-bold" onClick={resetBookingFlow}>
                      Schedule Another
                    </Button>
                    <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-xs font-bold" asChild>
                      <Link href="/patient/dashboard">Go to Dashboard</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="surface-panel rounded-2xl shadow-md border-border p-6 space-y-6">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-lg">Methodology & Care Flow</CardTitle>
              <CardDescription>What to expect after confirming your booking</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-5 text-xs text-muted-foreground">
              <div className="flex gap-3">
                <Award className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">Select Specialist</p>
                  <p className="mt-1">Pick a verified Doctor or Yoga instructor depending on your primary care target.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarDays className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">Pick Date & Time</p>
                  <p className="mt-1">Select your preferred date. Available time slots are updated in real-time based on clinician schedules.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">Choose Delivery Mode</p>
                  <p className="mt-1">Choose secure video consultations (accessible via your dashboard) or in-clinic physical appointments.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <HeartPulse className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">Submit Health Notes</p>
                  <p className="mt-1">Provide symptoms or dietary history. These are shared with the clinician prior to your slot for structured care.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookConsultationPage;