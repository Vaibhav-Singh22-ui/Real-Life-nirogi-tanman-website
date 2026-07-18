import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Stethoscope } from "lucide-react";

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

const upcomingBookings: BookingItem[] = [
  {
    id: "BKG-2418",
    practitioner: "Dr. Kavya Menon",
    specialty: "Integrative Medicine",
    date: "Jul 14, 2026",
    time: "05:30 PM",
    mode: "Video Call",
    status: "confirmed",
  },
  {
    id: "BKG-2439",
    practitioner: "Anjali Rao",
    specialty: "Clinical Nutrition",
    date: "Aug 03, 2026",
    time: "11:15 AM",
    mode: "In Person",
    status: "pending",
  },
];

const bookingHistory: BookingItem[] = [
  {
    id: "BKG-2180",
    practitioner: "Arjun Dev",
    specialty: "Yoga Therapy",
    date: "May 22, 2026",
    time: "07:00 AM",
    mode: "Video Call",
    status: "completed",
  },
  {
    id: "BKG-2091",
    practitioner: "Dr. Vikram Shah",
    specialty: "Cardio-Metabolic Care",
    date: "Apr 10, 2026",
    time: "02:30 PM",
    mode: "In Person",
    status: "cancelled",
  },
  {
    id: "BKG-2014",
    practitioner: "Dr. Rhea Singh",
    specialty: "Lifestyle Medicine",
    date: "Mar 02, 2026",
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

const formatStatus = (status: BookingStatus) => status.charAt(0).toUpperCase() + status.slice(1);

const PatientBookingsPage = () => {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">My Bookings</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Track upcoming consultations, review past care history, and manage changes when your scheduling plans shift.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
          <p>
            Upcoming slots: <span className="font-medium text-foreground">{upcomingBookings.length}</span>
          </p>
          <p>
            Total completed: <span className="font-medium text-foreground">{bookingHistory.filter(b => b.status === "completed").length}</span>
          </p>
        </div>
      </section>

      <section>
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Upcoming Consultations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="grid gap-3 rounded-md border border-border bg-background p-3 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{booking.practitioner}</p>
                    <span className="text-xs text-muted-foreground">({booking.specialty})</span>
                    <Badge variant={badgeVariantByStatus[booking.status]}>{formatStatus(booking.status)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{booking.date} · {booking.time}</span>
                    <span className="flex items-center gap-1">
                      {booking.mode === "Video Call" ? (
                        <Video className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Stethoscope className="h-3.5 w-3.5 text-secondary" />
                      )}
                      {booking.mode}
                    </span>
                    <span>Ref: {booking.id}</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start gap-2 md:justify-end">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="destructive">Cancel</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Consultation History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookingHistory.map((booking) => (
              <div key={booking.id} className="rounded-md border border-border bg-background p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{booking.practitioner}</p>
                    <span className="text-xs text-muted-foreground">({booking.specialty})</span>
                  </div>
                  <Badge variant={badgeVariantByStatus[booking.status]}>{formatStatus(booking.status)}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{booking.date} · {booking.time}</span>
                  <span className="flex items-center gap-1">
                    {booking.mode === "Video Call" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <Stethoscope className="h-3 w-3" />
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
    </div>
  );
};

export default PatientBookingsPage;