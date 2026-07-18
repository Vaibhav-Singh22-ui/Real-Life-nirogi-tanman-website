import { Star, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getImgSrc } from "@/lib/utils";

type DoctorCardProps = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  fee: string;
  availability: string;
  image: string;
};

const DoctorCard = ({ id, name, specialty, experience, rating, fee, availability, image }: DoctorCardProps) => {
  return (
    <Card className="surface-panel overflow-hidden">
      <img src={getImgSrc(image)} alt={name} className="h-56 w-full object-cover" loading="lazy" width={1024} height={1280} />
      <CardHeader className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4" />
          {specialty}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Experience: {experience}</p>
        <p className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          {rating}
        </p>
        <p>Consultation: {fee}</p>
        <p>{availability}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild>
          <Link href={`/doctors/${id}`}>View Profile</Link>
        </Button>
        <Button asChild>
          <Link href="/book-consultation">Book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
