import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AIDoshaAssessmentPage = () => {
  return (
    <section className="section-band">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Body Constitution</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">AI Dosha Assessment</h1>
          <p className="max-w-3xl text-muted-foreground">
            Complete a guided health and lifestyle assessment to generate a personalized constitution profile and care
            recommendations.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle>Step 1: Baseline Inputs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Sleep patterns, appetite profile, digestion, and stress history.</CardContent>
          </Card>
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle>Step 2: Lifestyle Signals</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Work rhythm, physical activity, hydration, and recovery quality.</CardContent>
          </Card>
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle>Step 3: Guided Plan</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Daily routine, food recommendations, and movement intensity suggestions.</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIDoshaAssessmentPage;