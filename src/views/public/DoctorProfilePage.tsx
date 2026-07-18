import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Star, Stethoscope } from "lucide-react";
import { doctors } from "@/data/health-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getImgSrc } from "@/lib/utils";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const doctor = useMemo(() => doctors.find((item) => item.id === id) ?? doctors[0], [id]);

  return (
    <section className="section-band">
      <div className="container grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="surface-panel overflow-hidden">
          <img src={getImgSrc(doctor.image)} alt={doctor.name} className="h-80 w-full object-cover" width={1024} height={1280} />
          <CardContent className="space-y-2 p-5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" /> {doctor.specialty}</p>
            <p className="flex items-center gap-2"><Star className="h-4 w-4 fill-accent text-accent" /> {doctor.rating}</p>
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {doctor.availability}</p>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div>
            <p className="uppercase-label text-primary">Doctor Profile</p>
            <h1 className="mt-2 text-4xl font-semibold text-foreground">{doctor.name}</h1>
            <p className="mt-3 text-muted-foreground">{doctor.specialty} specialist focused on preventive and long-term holistic care outcomes.</p>
          </div>
          <Card className="surface-panel">
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Clinical experience: {doctor.experience}. Consultation fee: {doctor.fee}. Works closely with in-house nutrition and yoga teams for integrative care plans.
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/book-consultation">Book Consultation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/doctors">Back to Doctors</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfilePage;
