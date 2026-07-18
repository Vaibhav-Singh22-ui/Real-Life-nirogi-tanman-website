import { Star, HeartPulse, Sparkles, UserCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getImgSrc } from "@/lib/utils";

type PractitionerCardProps = {
  id: string;
  name: string;
  title: string;
  extraLabel: string;
  extraValue: string;
  rating: number;
  fee: string;
  availability: string;
  image: string;
  type: "doctor" | "yoga";
};

const PractitionerCard = ({
  id,
  name,
  title,
  extraLabel,
  extraValue,
  rating,
  fee,
  availability,
  image,
  type,
}: PractitionerCardProps) => {
  const profilePath = type === "doctor" ? `/doctors/${id}` : "/yoga-experts";

  return (
    <Card className="surface-panel overflow-hidden hover-lift flex flex-col justify-between h-full">
      <div>
        <div className="relative overflow-hidden group">
          <img
            src={getImgSrc(image)}
            alt={name}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width={600}
            height={400}
          />
          <div className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide border border-border">
            {type}
          </div>
        </div>
        <CardHeader className="space-y-1.5 pb-2">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">{name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <HeartPulse className="h-4 w-4 text-primary shrink-0" />
            {title}
          </p>
        </CardHeader>
        <CardContent className="space-y-1.5 text-sm text-muted-foreground pb-4">
          <p className="text-xs">
            <span className="font-medium text-foreground">{extraLabel}:</span> {extraValue}
          </p>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            {rating} Rating
          </div>
          <p className="text-xs">
            <span className="font-medium text-foreground">Session Fee:</span> {fee}
          </p>
          <p className="text-xs flex items-center gap-1">
            <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
            {availability}
          </p>
        </CardContent>
      </div>
      <CardFooter className="grid grid-cols-2 gap-2 pt-0 border-t border-border/40 p-4 bg-muted/5">
        <Button variant="outline" size="sm" asChild>
          <Link href={profilePath}>View Profile</Link>
        </Button>
        <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/book-consultation">Book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PractitionerCard;
