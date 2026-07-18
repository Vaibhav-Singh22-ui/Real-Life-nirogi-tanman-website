import Link from "next/link";
import { Button } from "@/components/ui/button";

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
};

const StatusPage = ({ code, title, description }: StatusPageProps) => {
  return (
    <section className="section-band">
      <div className="container">
        <div className="surface-panel mx-auto max-w-2xl space-y-4 p-8 text-center">
          <p className="text-sm font-semibold text-primary">{code}</p>
          <h1 className="text-4xl font-semibold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusPage;
