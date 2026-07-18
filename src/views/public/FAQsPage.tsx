import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";
import { faqItems } from "@/data/health-data";

const FAQsPage = () => {
  return (
    <section className="section-band">
      <div className="container max-w-4xl space-y-8">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
          <p className="uppercase-label text-primary">Support</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Frequently Asked Questions</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Find quick answers about appointments, plans, and care services. Open any question below to view detailed guidance.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`} className="rounded-lg border border-border bg-card px-5">
              <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className="rounded-md bg-primary/10 p-1.5 text-primary">
                    <CircleHelp className="h-4 w-4" />
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-10 text-sm leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQsPage;