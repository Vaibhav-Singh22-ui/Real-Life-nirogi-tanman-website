"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Stethoscope, Calendar, Clock, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

type BookingItem = {
  id: string;
  practitioner: string;
  specialty: string;
  date: string;
  time: string;
  mode: "Video Call" | "In Person";
  status: BookingStatus;
};

const defaultUpcomingBookings: BookingItem[] = [
  {
    id: "BKG-2418",
    practitioner: "Dr. Kavya Menon",
    specialty: "Integrative Medicine",
    date: "2026-07-28",
    time: "05:30 PM",
    mode: "Video Call",
    status: "confirmed",
  },
  {
    id: "BKG-2439",
    practitioner: "Anjali Rao",
    specialty: "Clinical Nutrition",
    date: "2026-08-03",
    time: "11:15 AM",
    mode: "In Person",
    status: "pending",
  },
];

const defaultBookingHistory: BookingItem[] = [
  {
    id: "BKG-2180",
    practitioner: "Arjun Dev",
    specialty: "Yoga Therapy",
    date: "2026-05-22",
    time: "07:00 AM",
    mode: "Video Call",
    status: "completed",
  },
  {
    id: "BKG-2091",
    practitioner: "Dr. Vikram Shah",
    specialty: "Cardio-Metabolic Care",
    date: "2026-04-10",
    time: "02:30 PM",
    mode: "In Person",
    status: "cancelled",
  },
  {
    id: "BKG-2014",
    practitioner: "Dr. Rhea Singh",
    specialty: "Lifestyle Medicine",
    date: "2026-03-02",
    time: "09:30 AM",
    mode: "Video Call",
    status: "completed",
  },
];

const badgeVariantByStatus: Record<BookingStatus, "default" | "secondary" | "destructive" | "outline"> = {
  confirmed: "default",
  pending: "secondary",
  completed: "outline",
  cancelled: "destructive",
};

const availableTimeSlots = [
  "09:00 AM",
  "10:30 AM",
  "11:15 AM",
  "02:00 PM",
  "03:30 PM",
  "05:30 PM",
  "07:00 PM",
];

const formatStatus = (status: BookingStatus) => status.charAt(0).toUpperCase() + status.slice(1);

const PatientBookingsPage = () => {
  const { user } = useAuth();
  const [upcoming, setUpcoming] = useState<BookingItem[]>(defaultUpcomingBookings);
  const [history, setHistory] = useState<BookingItem[]>(defaultBookingHistory);
  
  // Reschedule Dialog State
  const [rescheduleBooking, setRescheduleBooking] = useState<BookingItem | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("11:15 AM");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cancel Dialog State
  const [cancelBookingItem, setCancelBookingItem] = useState<BookingItem | null>(null);

  useEffect(() => {
    // Load from localStorage or Supabase
    const savedUpcoming = localStorage.getItem("nirogi_upcoming_bookings");
    if (savedUpcoming) {
      try {
        setUpcoming(JSON.parse(savedUpcoming));
      } catch (e) {
        setUpcoming(defaultUpcomingBookings);
      }
    }

    const fetchSupabaseBookings = async () => {
      if (user?.id) {
        try {
          const { data } = await supabase
            .from("bookings")
            .select("*")
            .eq("patient_id", user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            const mappedUpcoming: BookingItem[] = [];
            const mappedHistory: BookingItem[] = [];

            data.forEach((b) => {
              const item: BookingItem = {
                id: b.id.toString(),
                practitioner: b.practitioner_name || b.doctor_name || "Care Practitioner",
                specialty: b.specialty || "General Consultation",
                date: b.appointment_date || b.date || "2026-08-01",
                time: b.time_slot || b.time || "10:00 AM",
                mode: b.consultation_type === "in_person" ? "In Person" : "Video Call",
                status: (b.status as BookingStatus) || "confirmed",
              };
              if (item.status === "completed" || item.status === "cancelled") {
                mappedHistory.push(item);
              } else {
                mappedUpcoming.push(item);
              }
            });

            if (mappedUpcoming.length > 0) setUpcoming(mappedUpcoming);
            if (mappedHistory.length > 0) setHistory(mappedHistory);
          }
        } catch (err) {
          console.error("Supabase bookings fetch error:", err);
        }
      }
    };

    fetchSupabaseBookings();
  }, [user]);

  const handleOpenReschedule = (booking: BookingItem) => {
    setRescheduleBooking(booking);
    setNewDate(booking.date);
    setNewTime(booking.time);
    setRescheduleReason("");
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleBooking || !newDate) {
      toast.error("Please select a valid date for rescheduling.");
      return;
    }

    setIsSubmitting(true);
    const updatedDate = newDate;
    const updatedTime = newTime;

    // Update in state & localStorage
    const updatedList = upcoming.map((b) =>
      b.id === rescheduleBooking.id
        ? { ...b, date: updatedDate, time: updatedTime, status: "confirmed" as BookingStatus }
        : b
    );

    setUpcoming(updatedList);
    localStorage.setItem("nirogi_upcoming_bookings", JSON.stringify(updatedList));

    // Also update active booking key if matches
    localStorage.setItem(
      "nirogi_active_booking",
      JSON.stringify({
        practitionerName: rescheduleBooking.practitioner,
        practitionerTitle: rescheduleBooking.specialty,
        date: updatedDate,
        timeSlot: updatedTime,
      })
    );

    // Save update to Supabase
    if (user?.id) {
      try {
        await supabase
          .from("bookings")
          .update({
            appointment_date: updatedDate,
            time_slot: updatedTime,
            status: "confirmed",
            notes: `Rescheduled by patient: ${rescheduleReason || "No reason specified"}`,
          })
          .eq("id", rescheduleBooking.id);
      } catch (err) {
        console.error("Supabase reschedule update error:", err);
      }
    }

    setIsSubmitting(false);
    setRescheduleBooking(null);
    toast.success(`Consultation with ${rescheduleBooking.practitioner} rescheduled to ${updatedDate} at ${updatedTime}!`);
  };

  const handleConfirmCancel = async () => {
    if (!cancelBookingItem) return;

    const cancelledItem = { ...cancelBookingItem, status: "cancelled" as BookingStatus };

    // Move from upcoming to history
    const remainingUpcoming = upcoming.filter((b) => b.id !== cancelBookingItem.id);
    const updatedHistory = [cancelledItem, ...history];

    setUpcoming(remainingUpcoming);
    setHistory(updatedHistory);
    localStorage.setItem("nirogi_upcoming_bookings", JSON.stringify(remainingUpcoming));

    // Save to Supabase
    if (user?.id) {
      try {
        await supabase
          .from("bookings")
          .update({ status: "cancelled" })
          .eq("id", cancelBookingItem.id);
      } catch (err) {
        console.error("Supabase cancel booking error:", err);
      }
    }

    setCancelBookingItem(null);
    toast.info(`Consultation with ${cancelBookingItem.practitioner} cancelled.`);
  };

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Patient Hero Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop')` }}
        />
        <div className="relative z-10">
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">My Bookings & Consultations</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Track upcoming consultations, reschedule dates when plans change, and review past care history.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-border/60 bg-background/90 p-3.5 text-xs text-muted-foreground backdrop-blur-sm">
          <p>
            Upcoming slots: <span className="font-bold text-foreground">{upcoming.length}</span>
          </p>
          <p>
            Total completed: <span className="font-bold text-foreground">{history.filter(b => b.status === "completed").length}</span>
          </p>
        </div>
      </section>

      {/* Upcoming Consultations Section */}
      <section>
        <Card className="surface-panel">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Consultations
            </CardTitle>
            <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary border-primary/30">
              {upcoming.length} Active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground border border-dashed rounded-xl">
                No upcoming consultations scheduled.
              </div>
            ) : (
              upcoming.map((booking) => (
                <div
                  key={booking.id}
                  className="grid gap-3 rounded-xl border border-border bg-background p-4 md:grid-cols-[1fr_auto] md:items-center hover:border-primary/40 transition-colors shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{booking.practitioner}</p>
                      <span className="text-xs text-muted-foreground font-medium">({booking.specialty})</span>
                      <Badge variant={badgeVariantByStatus[booking.status]}>{formatStatus(booking.status)}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-medium pt-1">
                      <span className="flex items-center gap-1 text-foreground font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {booking.date} · {booking.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {booking.mode === "Video Call" ? (
                          <Video className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
                        )}
                        {booking.mode}
                      </span>
                      <span>Ref: <strong className="text-foreground">{booking.id}</strong></span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS: RESCHEDULE & CANCEL */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-0 border-border/40">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenReschedule(booking)}
                      className="w-full sm:w-auto text-xs font-bold border-primary/40 text-primary hover:bg-primary/10 flex items-center gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reschedule
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setCancelBookingItem(booking)}
                      className="w-full sm:w-auto text-xs font-bold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      {/* Consultation History Section */}
      <section>
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Care & Consultation History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-border/80 bg-background/60 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">{booking.practitioner}</p>
                    <span className="text-xs text-muted-foreground font-medium">({booking.specialty})</span>
                  </div>
                  <Badge variant={badgeVariantByStatus[booking.status]}>{formatStatus(booking.status)}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{booking.date} · {booking.time}</span>
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    {booking.mode === "Video Call" ? (
                      <Video className="h-3 w-3 text-primary" />
                    ) : (
                      <Stethoscope className="h-3 w-3 text-secondary" />
                    )}
                    {booking.mode}
                  </span>
                  <span>Ref: {booking.id}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* INTERACTIVE RESCHEDULE MODAL */}
      <Dialog open={!!rescheduleBooking} onOpenChange={() => setRescheduleBooking(null)}>
        {rescheduleBooking && (
          <DialogContent className="sm:max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <RefreshCw className="h-5 w-5 text-primary" />
                Reschedule Consultation
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Select a new preferred date and time slot for your appointment with <strong>{rescheduleBooking.practitioner}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  New Preferred Date
                </Label>
                <Input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Select Available Time Slot
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewTime(slot)}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold border transition-all ${
                        newTime === slot
                          ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                          : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Reason for Rescheduling (Optional)</Label>
                <Input
                  placeholder="e.g. Schedule clash, work conflict..."
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRescheduleBooking(null)}
                className="w-full sm:w-auto text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmReschedule}
                disabled={isSubmitting}
                className="w-full sm:w-auto text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Saving..." : "Confirm & Save Reschedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* CANCEL CONFIRMATION DIALOG */}
      <Dialog open={!!cancelBookingItem} onOpenChange={() => setCancelBookingItem(null)}>
        {cancelBookingItem && (
          <DialogContent className="sm:max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Cancel Consultation?
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                Are you sure you want to cancel your consultation with <strong>{cancelBookingItem.practitioner}</strong> scheduled for <strong>{cancelBookingItem.date}</strong> at <strong>{cancelBookingItem.time}</strong>?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border/60 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCancelBookingItem(null)}
                className="w-full sm:w-auto text-xs font-bold"
              >
                Keep Booking
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleConfirmCancel}
                className="w-full sm:w-auto text-xs font-bold"
              >
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default PatientBookingsPage;