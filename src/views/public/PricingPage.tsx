import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Essential", price: "₹1,499/mo", features: ["Monthly doctor consult", "AI health assistant", "Basic analytics"] },
  { name: "Care Plus", price: "₹3,999/mo", features: ["2 doctor consults", "Nutrition + yoga planning", "Advanced tracking"] },
  { name: "Family Prime", price: "₹7,499/mo", features: ["Up to 4 members", "Priority appointments", "Care coordinator support"] },
];

const PricingPage = () => {
  return (
    <section className="section-band">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Plans</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Simple, transparent pricing</h1>
          <p className="max-w-3xl text-muted-foreground">Choose a plan that matches your health goals and level of care coordination.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="surface-panel">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-3xl font-semibold text-foreground">{plan.price}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <p key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </p>
                ))}
                <Button className="mt-2 w-full">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;