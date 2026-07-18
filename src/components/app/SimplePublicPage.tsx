import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SimplePublicPageProps = {
  title: string;
  subtitle: string;
  description: string;
};

const SimplePublicPage = ({ title, subtitle, description }: SimplePublicPageProps) => {
  return (
    <section className="section-band">
      <div className="container space-y-6">
        <p className="uppercase-label text-primary">{subtitle}</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{description}</p>
        <Button asChild>
          <Link href="/book-consultation">
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SimplePublicPage;
