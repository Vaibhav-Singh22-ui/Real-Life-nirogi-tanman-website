import { Leaf, Stethoscope, Waves, Brain, Activity, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const services = [
  {
    slug: "ayurveda",
    icon: Leaf,
    title: "Ayurveda",
    description: "Constitutional analysis, custom organic remedies, and circadian scheduling to align body doshas.",
  },
  {
    slug: "naturopathy",
    icon: Stethoscope,
    title: "Naturopathy",
    description: "Elemental treatments (water, mud, fasting) and acupuncture to trigger deep cellular recovery.",
  },
  {
    slug: "yoga",
    icon: Waves,
    title: "Yoga",
    description: "Specialized postures, mechanical decompression, and joint mobility sequences built for your baseline.",
  },
  {
    slug: "meditation",
    icon: Brain,
    title: "Meditation",
    description: "Zen mindfulness training, breathing patterns, and vagus nerve toning to manage cortisol.",
  },
  {
    slug: "lifestyle-diet",
    icon: Activity,
    title: "Lifestyle & Diet Guidance",
    description: "Gut microbiome rejuvenation schedules and glycemic management charts mapped to your bio-metrics.",
  },
];

const ServicesPage = () => {
  return (
    <section className="section-band font-['Manrope',sans-serif]">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Comprehensive Core Care</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Wellness Services</h1>
          <p className="max-w-2xl text-muted-foreground text-sm font-light">
            Explore our specialized drug-less wellness services, coordinated directly between clinical medical specialists and traditional therapists.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <motion.div key={service.title} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card className="surface-panel hover-lift h-full flex flex-col justify-between cursor-pointer border border-border/80 hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <span className="rounded-xl bg-primary/10 p-2 text-primary flex items-center justify-center shrink-0">
                        <service.icon className="h-5 w-5" />
                      </span>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed font-light flex-grow">
                    {service.description}
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto flex items-center text-primary text-xs font-bold gap-1 hover:translate-x-0.5 transition-transform">
                    <span>Learn More</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;